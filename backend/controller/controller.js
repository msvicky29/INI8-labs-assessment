const express = require('express');
const app = express();
const fs = require('fs');

const Documents = require('../models/Documents.js');

const uploadDocument = async (req, res) => {
    try {
        console.log("upload end point==========");
        console.log('File received:', req.file);
        console.log('body:', req.body);
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const newDocument = new Documents({
            userId: "default_user", // Single user - no login needed
            filename: req.file.originalname,
            filepath: req.file.path,
            filesize: req.file.size,
            createdAt: Date.now()
        })
        await newDocument.save();
        return res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ message: "Error in uploading the document" });
    }
}
const getAllDocuments = async (req, res) => {
    try {

        const documents = await Documents.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: "Documents fetched successfully", data: documents });
    }
    catch (error) {
        return res.status(500).json({ message: "Error in fetching documents" });
    }
}


const downloadDocument = async (req, res) => {
    try {
        const documentId = req.params.id;

        if (!documentId) {
            return res.status(400).json({ message: "Document id is required" });
        }

        const document = await Documents.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        const filePath = document.filepath;
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found on server" });
        }
        res.download(filePath, document.filename, (err) => {
            if (err) {
                return res.status(500).json({ message: "Error downloading file" });
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

const deleteDocument = async (req, res) => {
    try {
        console.log("Delete endpoint=========");

        const documentId = req.params.id;
        console.log("id=" + documentId);

        if (!documentId) {
            return res.status(400).json({ message: "Document id is required" });
        }

        const document = await Documents.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        const filePathToDelete = document.filepath;

        console.log("path=" + filePathToDelete);
        try {
            if (fs.existsSync(filePathToDelete)) {
                fs.unlinkSync(filePathToDelete);
            }
            else {
                console.warn(`Local file not found at: ${filePathToDelete}`);
            }
            await Documents.findByIdAndDelete(documentId);

            return res.status(200).json({ message: "Document deleted successfully" });

        } catch (error) {
            return res.status(500).json({ message: "Error kk in deleting docuement file" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error" });

    }

}



module.exports = { uploadDocument, deleteDocument, getAllDocuments, downloadDocument };