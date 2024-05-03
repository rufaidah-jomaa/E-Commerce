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
   const category = await categoryModel.create({name:name,image:{secure_url,public_id},slug:slugify(name)})
return res.json({message:"success",category})
}

export const getAll= async (req,res)=>{
    const categories = await categoryModel.find({})
    return res.status(200).json({message:"success",categories})
}

export const getActive = async (req,res)=>{
    const categories = await categoryModel.find({status:'Active'}).select('name')
    return res.status(200).json({message:"success",categories})
}

export const getDetails = async(req,res)=>{
    const category = await categoryModel.findById(req.params.id)
    return res.status(200).json({message:"success",category})
}

export const update = async(req,res)=>{
    const category = await categoryModel.findById(req.params.id)
    if(!category){
        return res.status(404).json({message:"category not exists"})
    }
    category.name = req.body.name.toLowerCase()
    if( !await categoryModel.find({name: req.body.name, _id:{$ne:req.params.id}})){
          return res.status(409).json({message:"name already exists"})
    }
    category.slug = slugify(req.body.name.toLowerCase())
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,
            {folder:`${process.env.App_Name}/categories`})
            cloudinary.uploader.destroy(category.image.public_id)
            category.image = {secure_url,public_id}
    }
   category.status = req.body.status 
   category.save()
   return res.json({message:"success",category})
}

export const destroy = async(req,res)=>{
    const category = await categoryModel.findByIdAndDelete(req.params.id)
    if(!category)
    {
        return res.status(404).json({message:"category not found"})
    }
    await cloudinary.uploader.destroy(category.image.public_id)
    return res.json({message:"success",category})
}