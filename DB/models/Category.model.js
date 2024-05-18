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
timestamps:true,
toJSON:{virtuals:true },//by default : false
toObject:{virtuals:true}
})
//virtual populate // زي كاني اضفت حقل جديد للجدول لكن بشكل افتراضي اسمه سبكاتيجوري لكن ما بتخزن بالداتا بيس
categorySchema.virtual('subcategory',{
    localField:'_id', // primary key column from this model(parent)
    foreignField:'categoryId', // foreign key column from second model(child)
    ref:'SubCategory' // name of child model 
})
const categoryModel = model('Category',categorySchema);
export default categoryModel;
