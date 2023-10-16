const express = require('express');
const RouterForgot = express.Router();
const forgotpasswordController = require('../controller/forgotpasswordController');
const loginMiddleware = require('../middleware/loginmidddleware');

RouterForgot.post('/forgot-password',loginMiddleware.userProfile, forgotpasswordController.forgotpassword);
module.exports = RouterForgot;