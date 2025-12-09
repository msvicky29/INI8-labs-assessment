const express=require('express');
const router=express.Router();
const {uploadDocument,deleteDocument}=require('../controller/controller.js');


router.post('/upload-document',uploadDocument);

router.delete('/delete-docuement/:id',deleteDocument);

module.exports=router;