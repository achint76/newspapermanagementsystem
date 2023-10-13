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

// Create a multer instance for single file uploads
const upload = multer({ storage: storage }).single('pdf'); // 'pdf' should match the input field name

module.exports = upload;
