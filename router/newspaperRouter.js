// routes/newspaperRoutes.js
const express = require('express');
const RouterNewspaper = express.Router();
const newspaperController = require('../controller/newspaperController');
const loginMiddleware = require('../middleware/loginmidddleware');
const uploadMiddleware = require('../middleware/newspapermiddleware')
// Define the route for handling file uploads
RouterNewspaper.post('/upload',loginMiddleware.userProfile,uploadMiddleware, newspaperController.handleFileUpload);
RouterNewspaper.get('/getfile',loginMiddleware.userProfile,newspaperController.getPDF);
//RouterNewspaper.get('/getfile', newspaperController.getPDF);
RouterNewspaper.put('/updatefile/:id',loginMiddleware.userProfile,uploadMiddleware, newspaperController.updatePDF);
RouterNewspaper.delete('/deletefile/:id',loginMiddleware.userProfile, newspaperController.deletePDF);

module.exports = RouterNewspaper;
   

