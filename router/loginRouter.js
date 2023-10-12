
const express = require('express');
const RouterLogin = express.Router();
const loginController = require('../controller/loginController');
const loginMiddleware = require('../middleware/loginmidddleware');
const userController = require('../controller/userController');


RouterLogin.post('/login',  loginController.loginfunc);

// 
module.exports = RouterLogin;