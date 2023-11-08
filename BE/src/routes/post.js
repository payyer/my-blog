const express = require('express');
const router = express.Router();
const postController = require('../controller/PostController');
const check = require('../util/verifiredUser');

router.get('/', check.verifiredAdmin, postController.getPosts);

router.get('/post-verified', postController.getPostsVerified)

router.get('/post-unverified', check.verifiredAdmin, postController.getPostsUnVerified)

router.get('/detail/:postId', postController.getPost)

router.post('/create', check.verifiredUser, postController.createPost);

router.put('/edit/:postId', check.verifiredUser, postController.editPost);

router.delete('/delete/:postId', check.verifiredAdmin, postController.deletePost);

module.exports = router;