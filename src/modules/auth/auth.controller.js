import userModel from "../../../DB/models/User.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {customAlphabet, nanoid} from 'nanoid'
import { sendEmail } from "../../services/sendEmail.js";
import { AppError } from "../../services/AppError.js";
import xlsx from 'xlsx'
export const testAuth =(req,res,next)=>{
    return res.json("Auth")
}

export const register= async(req,res)=>{
   
    const {username,email,password}=req.body;
    const hashedPassword = bcrypt.hashSync(password , parseInt(process.env.SALT_ROUND) ); //hashSync بدل await hash //اي اشي حيجيني من الدوت انف حيكون سترينج فلازم نحول لانتجر
    const newUser = await userModel.create({username,email,password:hashedPassword})
    if(!newUser){
        return next(new AppError('Error while creating new user',500))
    }
    const token =  jwt.sign({email},process.env.confirmEmailSIG)
    await sendEmail(email,"Rufaidah-E-commerce" ,username,token)
    return res.status(201).json({message:"success",newUser})

}
export const confirmEmail = async(req, res, next)=>{
    const {token} = req.params;
    
     const decoded = jwt.verify(token, process.env.confirmEmailSIG);
    
  if(!decoded){
      return next ( new AppError('invalid token',401))
  }
  const user = await userModel.updateOne({email: decoded.email}, {confirmEmail: true});
  
  if(user.modifiedCount > 0){
      return res.redirect(process.env.FEURL)
  }
  return next (new AppError('Error while confirming your Email, please try again',500))
  }

  export const addUsersExcel = async(req,res)=>{
      const workbook =  xlsx.readFile(req.file.path)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const users = xlsx.utils.sheet_to_json(worksheet)
     
   /*  users.forEach(user=>{
        const hashedPassword = bcrypt.hashSync(user.password , parseInt(process.env.SALT_ROUND) )
        user.password = hashedPassword
        const user = await userModel.create(user)
        const token =  jwt.sign(user.email,process.env.confirmEmailSIG)
        sendEmail(user.email,"Rufaidah-E-commerce",user.username,token)
      })*/

      async function processUsers(users) {
        for (const user of users) {
            const hashedPassword = bcrypt.hashSync(user.password , parseInt(process.env.SALT_ROUND) )
            user.password = hashedPassword
            const userA = await userModel.create(user)
            const email = user.email
            const token =  jwt.sign({email},process.env.confirmEmailSIG)
            sendEmail(user.email,"Rufaidah-E-commerce",user.username,token)
        }
      }
      processUsers(users)
      return res.json(users)

  }

export const login = async (req,res)=>{
    const {email,password} = req.body;
    const user =await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"email not found"})
    }
       const check = bcrypt.compareSync(password, user.password)
       if(!check){
        return res.status(404).json({message:"password is not correct"})
       }
       if (user.status == "Blocked"){
        return res.status(403).json({message:"Your account is blocked!"})
       }
       const token = jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG)
       return res.status(200).json({message:"success",token})
}

export const sendCode= async(req,res)=>{
    const {email}=req.body;
    const code = customAlphabet('1234567890abcdef', 4)()
    const user = await userModel.findOneAndUpdate({email},{sendCode:code},{new:true})
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    await sendEmail(email,'reset Password',`<h2>Code is:${code}</h2>`)
    return res.status(200).json({message:"success"})
}

export const forgotPassword = async(req,res)=>{
    const {email,password,code}=req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    if(!user.sendCode == code){
        return res.status(400).json({message:"not matching code"})
    }
    user.password = await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
    user.sendCode = null
   await user.save()
    return res.status(200).json({message:"success",user})
}