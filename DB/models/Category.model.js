import mongoose, { Schema, Types, model } from 'mongoose';

const categorySchema = new Schema({

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

const categoryModel = model('Category',categorySchema);
export default categoryModel;
