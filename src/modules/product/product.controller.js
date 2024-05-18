import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import subCategoryModel from "../../../DB/models/SubCategory.model.js";
import cloudinary from "../../services/cloudinary.js";
import productModel from "../../../DB/models/Product.model.js";

export const testProduct =(req,res,next)=>{
    return res.json("Product")
}

export const createProduct= async(req,res)=>{
    try{
    const {name,price,discount,categoryId,subCategoryId}=req.body;

    const checkCategory = await categoryModel.findById(categoryId)
    if(!checkCategory){
         return res.status(404).json({message:"category not found!"})
    }

    const checkSubCategory = await subCategoryModel.findOne({_id:subCategoryId,categoryId:categoryId})
    if(!checkSubCategory){
        return res.status(404).json({message:"subCategory not found!"})
    }

    req.body.slug=slugify(name)

    req.body.finalPrice = price - ((price * (discount)) / 100 )

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder:`${process.env.App_Name}/products/${name}`})
    req.body.mainImage= {secure_url,public_id}

    req.body.subImages = []
    for (const file of req.files.subImages) { //file : iteration
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,
            {folder:`${process.env.App_Name}/products/${name}/subImages`})  
            req.body.subImages.push({secure_url,public_id})
    }

    req.body.createdBy=req.user._id
    req.body.updatedBy=req.user._id 
   const product = await productModel.create(req.body)
   return res.status(200).json({message:"product added successfully!",product})
}catch(error){
    console.log(error.message)
    return res.json({error:error.message})
}
}