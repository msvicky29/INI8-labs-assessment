const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
       cb(null,file.originalname+Date.now()+path.extname(file.originalname));
    }
})  
const filterTypes=(req,file,cb)=>{
  const allowedTypes=['application/pdf'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Only PDF files are allowed'),false);
    }  
 }
exports.upload=multer({
    storage:storage,
    fileFilter:filterTypes
});

