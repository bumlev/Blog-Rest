// import express
const express = require('express');

// import controller for users
const usersCtrl = require('../controllers/usersCtrl');

//import validation of email
const email_validate = require('../validation/email_validation');

//import auth
const auth = require('../middleware/auth');

// import multer 
const multer =  require('../middleware/multer-config');

// create router for users
const router = express.Router();

router.post('/users/register'  , multer , email_validate.email_test, usersCtrl.register);
router.post('/users/login' , email_validate.email_test,  multer , usersCtrl.login);
router.get('/users/' , usersCtrl.getAllUsers);
router.get('/users/:user/user' , usersCtrl.getOneUser);
router.put('/users/:userUpdate/update' , auth , email_validate.email_test , multer , usersCtrl.updateUser);
router.delete('/users/:userDelet/delete' , usersCtrl.deleteUser);
router.post('/users/logout', usersCtrl.logout);
module.exports = router;