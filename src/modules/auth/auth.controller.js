import userModel from "../../../DB/models/User.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {customAlphabet, nanoid} from 'nanoid'
import { sendEmail } from "../../services/sendEmail.js";

export const testAuth =(req,res,next)=>{
    return res.json("Auth")
}

export const register= async(req,res)=>{
    try{
    const {username,email,password}=req.body;
    const user = await userModel.findOne({email})
    if(user){
        return res.status(409).json({message:"email already exists"})
    }
    const hashedPassword = bcrypt.hashSync(password , parseInt(process.env.SALT_ROUND) ); //hashSync بدل await hash //اي اشي حيجيني من الدوت انف حيكون سترينج فلازم نحول لانتجر
    const newUser = await userModel.create({username,email,password:hashedPassword})
    return res.status(201).json({message:"success",newUser})
}catch(error){
    return res.json(error.message)
}
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