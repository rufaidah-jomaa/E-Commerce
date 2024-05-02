import slugify from "slugify"
import categoryModel from "../../../DB/models/Category.model.js"
import cloudinary from "../../services/cloudinary.js"

export const testCategory = async(req,res,next)=>{
    return res.json("Category")
}
export const createCategory = async(req,res,next)=>{
   const {name}=req.body;
   const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.App_Name}/categories`} )
   if ( await categoryModel.findOne({name})){
          return res.status(409).json({message:"Category already exists"})
   }
   const category= await categoryModel.create({name:name,image:{secure_url,public_id},slug:slugify(name)})
return res.json({message:"success",category})
}

export const getAllcat= async (req,res)=>{
    const categories = await categoryModel.find({})
    return res.status(200).json({message:"success",categories})
}
