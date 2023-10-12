const express = require('express');
const RouterForgot = express.Router();
const forgotpasswordController = require('../controller/forgotpasswordController');


RouterForgot.post('/forgot-password', forgotpasswordController.forgotpassword);
module.exports = RouterForgot;