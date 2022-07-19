//* import express
const express = require('express');

//* creation of the router
const router = express.Router();

//* import authentification and image mgt middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//* import the business logic for publication management and like feature
const publicationCtrl = require('../controllers/publication');
const likeCtrl = require('../controllers/like');

// * define the routes for each API endpoint; including the auth and img mgt middleware
router.post('/', auth, multer, publicationCtrl.createPublication);
router.get('/', auth, publicationCtrl.getAllPublication);
router.get('/:id', auth, publicationCtrl.getOnePublication);
router.put('/:id', auth, multer, publicationCtrl.modifyOnePublication);
router.delete('/:id', auth, publicationCtrl.deleteOnePublication);
router.post('/:id/like', auth, likeCtrl.likePublication);

// * export the router
module.exports = router;