const express = require('express');
const router = express.Router();
const adminController = require('../controller/AdminController');
const check = require('../util/verifiredUser')

router.put('/censorship/:postId', check.verifiredAdmin, adminController.censorshipPost);

module.exports = router;