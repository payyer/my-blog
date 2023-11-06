const express = require('express');
const router = express.Router();
const postController = require('../controller/PostController');
const authentication = require('../util/verifiredUser');

router.get('/', authentication.verifiredAdmin, postController.getPosts);

router.get('/post-verified', postController.getPostsVerified)

router.get('/post-unverified', authentication.verifiredAdmin, postController.getPostsUnVerified)

router.get('/detail/:postId', postController.getPost)

router.post('/create', authentication.verifiredUser, postController.createPost);

router.put('/edit/:postId', authentication.verifiredUser, postController.editPost);

router.delete('/delete/:postId', authentication.verifiredUser, postController.deletePost);

module.exports = router;