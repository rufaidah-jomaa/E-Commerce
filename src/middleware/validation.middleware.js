import Joi from "joi";
export const generalValidation={
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,20}$/).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg','image/svg+xml').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(1000000).required(),//1MB
}),
    id:Joi.string().hex().length(24).required()
}

export const validation = (schema)=>{
    return (req,res,next)=>{
        const errorMessage=[]
        const {error}= schema.validate(req.body,{abortEarly:false})
        if(error){
           
            error.details.forEach(element => {
                const key = element.context.key
               errorMessage.push({[key]:element.message})
            });
            return res.status(400).json({message:"validation error",errorMessage})
        }
        next()
    }
}