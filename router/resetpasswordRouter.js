const express = require('express');
const resetpasswordController = require('../controller/resetpasswordController');
const Routerpasswordreset = express.Router();

Routerpasswordreset.post('/reset-password', resetpasswordController.resetpassword);
module.exports = Routerpasswordreset;