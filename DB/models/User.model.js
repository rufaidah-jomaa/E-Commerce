import mongoose, { Schema, model } from 'mongoose'
const userSchema = new Schema ({
    username:{
     type:String,
     required:true
    },
    email:{
    type:String,
    required:true,
    unique:true
    },
    password:{
        type:String,
        required:true      
    },
    image :{
        type: Object
    },
    phone :{
        type:String
    },
    Address:{
        type:String
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','Blocked']
    },
   role:{
    type:String,
    default:'User',
    enum:['User','Admin']
   },
   sendCode:{
    type:String,
    default:null
   }
},
   {
    timestamps:true
   }
)
const userModel = model('User',userSchema);
export default userModel;