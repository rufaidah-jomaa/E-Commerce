import slugify from "slugify"
import categoryModel from "../../../DB/models/Category.model.js"
import cloudinary from "../../services/cloudinary.js"

export const testCategory = async(req,res,next)=>{
    return res.json("Category")
}
export const createCategory = async (req,res,next)=>{
    req.body.name = req.body.name.toLowerCase()
   if  ( await categoryModel.findOne({name: req.body.name})){
        return res.status(409).json({mesaage:"Category already exists"})
   }
   const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path , {folder:`${process.env.App_Name}/categories`})
   req.body.slug=slugify(req.body.name)
   req.body.image = {secure_url,public_id} 
   const category = await categoryModel.create(req.body)
   return res .json({message:"success",category})
}