//* import express
const express = require('express');

//* creation of the router
const router = express.Router();

//* import the middleware the password checker and the auth for routes related to the users access
const pwdCtrl = require('../middleware/password');
const auth = require('../middleware/auth-config');

//* import the business logic for user management
const userCtrl = require('../controllers/user');
const logCtrl = require('../controllers/log');

// * define the routes for auth
router.post('/signup',pwdCtrl, logCtrl.signup);
router.post('/login', logCtrl.login);
router.get("/logout", logCtrl.logout);

// * define the routes for accessing users
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.delete("/delete/:id", auth, userCtrl.deleteUser);

// * export the router
module.exports = router;