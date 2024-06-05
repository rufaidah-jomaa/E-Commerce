
import mongoose, { Schema, Types, model } from 'mongoose'

const productSchema = new Schema ({
    name:{
        type:String,
        unique:true,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    finalPrice:{ //after discount
        type: Number,
    },
    mainImage:{
        type: Object,
        required:true
    },
    subImages:[{ //array of objects
        type:Object,
        required:true
    }],
    status:{
        type:String,
        default:'Active',
        enum:['Active','inActive']
    },
    sizes:[{
        type:String,
        enum:['s','m','lg','xl']
    }],

    colors:[String],

    categoryId:{
        type: Types.ObjectId,
        ref:'Category',
        required:true
    },
    subCategoryId:{
        type:Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
    createdBy:{
      type:Types.ObjectId,
      ref:"User",
      required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User",
        required:true
      },
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
productSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'productId'
})
const productModel= model('Product',productSchema)
export default productModel;