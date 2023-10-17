// routes/newspaperRoutes.js
const express = require('express');
const RouterMagazine = express.Router();
const magazineController = require('../controller/magazineController');
const loginMiddleware = require('../middleware/loginmidddleware');
const upload = require('../middleware/magazineMiddleware')
// Define the route for handling file uploads
RouterMagazine.post('/uploadmagazine',loginMiddleware.userProfile,upload, magazineController.handleMagazineUpload);
RouterMagazine.get('/getmagazinefile',loginMiddleware.userProfile,magazineController.getMagazinePDF);
//RouterNewspaper.get('/getfile', newspaperController.getPDF);
RouterMagazine.put('/updatemagazinefile/:id',loginMiddleware.userProfile,upload, magazineController.updateMagazinePDF);
RouterMagazine.delete('/deletemagazinefile/:id',loginMiddleware.userProfile, magazineController.deleteMagazinePDF);
RouterMagazine.get('/getmagazinefilebydate', loginMiddleware.userProfile, magazineController.getMagazinePDFbydate)
module.exports = RouterMagazine;
   

