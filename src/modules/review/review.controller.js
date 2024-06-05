import orderModel from "../../../DB/models/Order.model.js";
import reviewModel from "../../../DB/models/review.model.js";

export const create= async(req,res)=>{
    const {productId}=req.params;
    const{comment,rating}=req.body;
  
    const order = await orderModel.findOne({
        userId:req.user._id,
        status:'delivered',
        "products.productId":productId
    })
    if(!order){
        return res.status(400).json({message:"can't review this product"})
    }
    const checkReviw= await reviewModel.findOne({
        userId:req.user._id,
        productId:productId
    })
    if(checkReviw){
        return res.status(409).json({message:"already reviewed this product"})
    }
    const review = await reviewModel.create({
        userId:req.user._id,
        productId:productId,
        comment:comment,
        rating:rating
    })
    return res.status(201).json({message:"success",review})
}

