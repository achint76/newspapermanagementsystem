// routes/newspaperRoutes.js
const express = require('express');
const RouterNewspaper = express.Router();
const newspaperController = require('../controller/newspaperController');
const upload = require('../middleware/newspapermiddleware')
// Define the route for handling file uploads
RouterNewspaper.post('/upload',upload, newspaperController.handleFileUpload);
RouterNewspaper.get('/getfile',newspaperController.getPDF);
//RouterNewspaper.get('/getfile', newspaperController.getPDF);

module.exports = RouterNewspaper;
   

