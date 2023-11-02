const express = require('express');
const router = express.Router();
const postController = require('../controller/PostController');
const authentication = require('../util/verifiredUser');

router.get('/', postController.getPosts);

router.post('/create', authentication.verifiredUser, postController.createPost);

router.delete('/delete/:postId', authentication.verifiredUser, postController.deletePost);

module.exports = router;