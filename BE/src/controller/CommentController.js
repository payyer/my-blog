const models = require('../models/index');

// [GET] api/v1/comment/
const getComments = async (req, res) => {
    try {
        const comments = await models.Comment.findAll();
        return res.status(200).json({
            status: 0,
            message: "Lấy toàn bộ comment thành công",
            data: comments
        })
    }
    catch (err) {
        return res.status(200).json({
            status: -1,
            message: "Lấy comment thất bại",
            data: ''
        })
    }
}

// [POST] api/v1/comment/create/:postId
const createComment = async (req, res) => {
    const user = req.user;
    const { postId } = req.params;
    const { article } = req.body;
    try {
        if (!postId) {
            return res.status(403).json({
                status: 1,
                message: "Bạn chưa chọn bài post",
                data: ''
            })
        }
        const post = await models.Post.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({
                status: 1,
                message: 'Không tìm thấy bài post',
                data: ''
            })
        }
        if (!article) {
            return res.status(403).json({
                status: 1,
                message: 'Bạn chưa nhập comment',
                data: ''
            })
        }
        const newComment = await models.Comment.create({
            article,
            postId: +postId,
            userId: user.id
        })
        return res.status(200).json({
            status: 0,
            message: 'Tạo mới bình luận thành công',
            data: newComment
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống',
            data: ''
        })
    }
}

// [DELETE] api/v1/comment/edit/:commentId
const editComment = async (req, res) => {
    const { commentId } = req.params;
    const { article } = req.body;
    try {
        const comment = await models.Comment.findOne({ where: { id: commentId } });
        if (!comment) {
            return res.status(403).json({
                status: 1,
                message: 'Không tìm thấy comment để chỉnh sửa',
                data: ''
            })
        } else {
            if (!article) {
                return res.status(403).json({
                    status: 1,
                    message: 'Bạn chưa nhập bình luận',
                    data: ''
                })
            }
            const updateComment = await comment.update({ article })
            return res.status(200).json({
                status: 0,
                message: 'Chỉnh sửa comment thành công',
                data: updateComment
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống',
            data: ''
        })
    }
}
// [DELETE] api/v1/comment/delete/:commentId
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const comment = await models.Comment.destroy({ where: { id: commentId } });
        if (!comment) {
            return res.status(403).json({
                status: 1,
                message: 'Không tìm thấy comment để xóa',
                data: ''
            })
        }
        return res.status(200).json({
            status: 0,
            message: 'Xóa comment thành công',
            data: comment
        })

    }
    catch (err) {
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống',
            data: ''
        })
    }
}

module.exports = {
    createComment, getComments, deleteComment, editComment
}