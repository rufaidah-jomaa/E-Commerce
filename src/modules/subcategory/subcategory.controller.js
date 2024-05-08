import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import subCategoryModel from "../../../DB/models/SubCategory.model.js";
import cloudinary from "../../services/cloudinary.js";

export const testsubCategory = (req,res)=>{
    return res.json("subCategory")
}

export const createSubCategory = async(req,res,next)=>{
    try{
       const {categoryId} = req.body;
        const category = await categoryModel.findById(categoryId)
       if(!category){
        return res.status(404).json({message:"category not found"})
       }
       
       const name = req.body.name.toLowerCase();
       const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path , {folder:`${process.env.App_Name}/subCategories`} )
       if ( await subCategoryModel.findOne({name})){
              return res.status(409).json({message:"subCategory already exists"})
       }
       const subcategory = await subCategoryModel.create({name:name,image:{secure_url,public_id},
        slug:slugify(name),categoryId,createdBy:req.user._id,updatedBy:req.user._id })
    
    return res.json({message:"success",subcategory})
    }catch(error){
     return res.json(error.message)
    }
    }

export const getAll= async (req,res)=>{
        const {id} = req.params;
        const subcategories = await subCategoryModel.find({categoryId:id})
        return res.status(200).json({message:"success",subcategories})
}
