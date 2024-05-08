import mongoose ,{Schema, Types, model} from "mongoose";

const subCategorySchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:Object,
        required :true
    },
    slug:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active', 'inactive']
    },
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    }
},
{
timestamps:true

})

const subCategoryModel = model('SubCategory',subCategorySchema)
export default subCategoryModel;