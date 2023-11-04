const express = require('express');
const commentController = require('../controller/CommentController');
const verified = require('../util/verifiredUser')
const router = express.Router();

router.get('/', verified.verifiredUser, commentController.getComments
)
router.post('/create/:postId', verified.verifiredUser, commentController.createComment)

router.put('/edit/:commentId', verified.verifiredUser, commentController.editComment)

router.delete('/delete/:commentId', verified.verifiredUser, commentController.deleteComment)

module.exports = router;