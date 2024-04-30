import mongoose, { Schema, Types, model } from 'mongoose';

const categprySchema = new Schema({
    categoryName:{
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
        enum:['active', 'inactive']
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

const categoryModel = model('Category',categprySchema);
export default categoryModel;