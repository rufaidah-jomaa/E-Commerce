import  multer  from 'multer';
export const fileType={
image: ['image/jpeg','image/png','image/jpg','image/svg+xml','image/webp'],
pdf :['applcation/pdf']
}
function fileUpload(customType = [] ){
const storage = multer.diskStorage({})
function fileFilter (req,file,cb){
  if(customType.includes(file.mimetype)){
   cb(null,true)
  }else{
     cb("invalid format",false)
  }
}
 const upload = multer({ fileFilter,storage })
 return upload

}

 export default fileUpload;
