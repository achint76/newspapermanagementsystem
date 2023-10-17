const express = require('express');
const userController = require('../controller/userController');
const loginMiddleware = require('../middleware/loginmidddleware')
const RouterUser = express.Router();
RouterUser.get('/get-user', loginMiddleware.userProfile,userController.getUser);

RouterUser.post('/add-user',loginMiddleware.userProfile, userController.createUser);

RouterUser.put('/update-user/:id', loginMiddleware.userProfile, userController.updateUser);

RouterUser.delete('/delete-user/:id', loginMiddleware.userProfile,userController.deleteUser);

RouterUser.post('/logout', loginMiddleware.userProfile, userController.updateSessionLogout)

module.exports = RouterUser;