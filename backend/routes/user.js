//* import express
const express = require('express');

//* creation of the router
const router = express.Router();

//* import the middleware the password checker
const pwdCtrl = require('../middleware/password');

//* import the business logic for user management
const userCtrl = require('../controllers/user');

// * define the routes for each API endpoint
router.post('/signup',pwdCtrl, userCtrl.signup);
router.post('/login', userCtrl.login);

// * export the router
module.exports = router;