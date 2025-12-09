const mongoose=require('mongoose');

const docuemntSchema=new mongoose.Schema({

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
    created_at:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Document',docuemntSchema);