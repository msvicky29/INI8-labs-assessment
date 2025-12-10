const express=require('express');
const router=express.Router();
const {upload} =require('../utils/Upload.js');
const {uploadDocument,deleteDocument,getAllDocuments,downloadDocument}=require('../controller/controller.js');

router.get('/get-all-documents',getAllDocuments);
router.post('/upload-document',upload.single("pdf"),uploadDocument);
router.get('/download-document/:id',downloadDocument);
router.delete('/delete-document/:id',deleteDocument);

module.exports=router;