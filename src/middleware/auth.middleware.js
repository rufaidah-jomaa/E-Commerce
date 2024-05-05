import jwt from "jsonwebtoken";
import userModel from "../../DB/models/User.model.js";

export const auth = ()=>{

    return async(req,res,next)=>{
        const {authorization}=req.headers;
        if(! authorization?.startsWith(process.env.BEARERTOKEN)){
            return res.status(400).json("token is required")
        }

       const token = authorization.split(process.env.BEARERTOKEN)[1]
       const decoded = jwt.verify(token,process.env.LOGINSIG)
       if (!decoded){
        return res.status(400).json("invalid token")
       }
       const user = await userModel.findById(decoded.id).select('username')
       if(!user){
        return res.status(404).json({message:"user not found"})
       }
       req.user = user
      next()
    }
}
// لو اخذ التوكن بعدها انحذف حسابه لو يجي يعمل كريت كاتيجوري مثلا حيبعث ريكوست يتاكد انه مسجل دخول :
 //التوكن صحيحة لكن حيعطي ايرور عند اليوزرمودل فايند باي اي دي مش حيلاقي معلومات اليوزر بالداتا بس