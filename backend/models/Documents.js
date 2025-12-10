const mongoose=require('mongoose');

const docuemntSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    filesize:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Document',docuemntSchema);