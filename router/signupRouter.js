const express = require('express');
const RouterSignup = express.Router();
const signupController = require('../controller/signupController');
const signupMiddleware = require('../middleware/signupMiddleware');

RouterSignup.post('/signup', [signupMiddleware.validateEmail], 
 signupController.signupfunc);
// 
module.exports = RouterSignup;