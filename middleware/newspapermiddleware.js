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
    try{
    if(file.mimetype === 'application/pdf'){
        cb(null, true)
    }else{
        throw new Error('Invalid file type. Only PDF files are allowed.');
    }
}catch(error){
cb(error);
}
};

// Create a multer instance for single file uploads
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('pdf'); // 'pdf' should match the input field name

const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred (e.g., file size exceeded)
            res.status(400).json({ message: 'File upload error: ' + err.message });
        } else if (err) {
            // An error other than Multer error occurred (e.g., file type error)
            res.status(400).json({ message: err.message });
        } else {
            next(); // Proceed to the next middleware or route
        }
    });
};
module.exports = uploadMiddleware;
