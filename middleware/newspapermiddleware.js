// middleware/upload.js
const express = require('express');
const multer = require('multer');

// Set the destination for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf');
    },
});

const fileFilter =function(req,file,cb){
    if(file.mimetype === 'application/pdf'){
        cb(null, true)
    }else{
        cb(new Error('Invalid file type. Only PDF files are allowed.'));
    }
};

// Create a multer instance for single file uploads
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('pdf'); // 'pdf' should match the input field name

module.exports = upload;
