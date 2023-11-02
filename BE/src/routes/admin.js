const express = require('express');
const router = express.Router();
const adminController = require('../controller/AdminController');

router.put('/censorship/:postId', adminController.censorshipPost);

module.exports = router;