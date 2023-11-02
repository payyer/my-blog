const models = require('../models/index');
const post = require('../models/post');

// [GET] /api/v1/post
const getPosts = async (req, res) => {
    try {
        const posts = await models.Post.findAll({
            include: [
                {
                    model: models.Topic,
                    attributes: ['name'],
                },
                {
                    model: models.User,
                    attributes: ['name'],
                }
            ]
        });
        return res.status(200).json({
            status: 0,
            message: "Lấy tất cả bài viết thành công",
            data: posts
        });
    }
    catch (err) {
        res.json({ status: -1, message: 'Lỗi hệ thống', err });
    }
}

// [POST] /api/v1/post/create
const createPost = async (req, res) => {
    const { title, topicId, article } = req.body;
    // from middleware
    const user = req.user;

    try {
        if (!title || !topicId || !article) {
            return res.status(200).json({
                status: 1,
                message: 'Bạn chưa nhập thông tin'
            })
        }
        const posts = await models.Post.findOne({ where: { title } });
        if (posts) {
            return res.status(200).json({
                status: 1,
                message: 'Tiêu đề đã bị trùng'
            })
        }
        const newPost = await models.Post.create({ title, topicId, article, userId: user.id })
        return res.status(200).json({
            status: 0,
            message: 'Tạo mới bài post thành công',
            newPost
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: -1, message: 'Lỗi hệ thống', err })
    }
}

const deletePost = async (req, res) => {
    const { postId } = req.params;
    const user = req.user;
    try {
        const post = await models.Post.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({
                status: 1,
                message: 'Không tìm thấy bài post',
            })
        }
        if (user.role === 'admin' || post.userId === user.id) {
            await post.destroy();
            return res.status(200).json({
                status: 0,
                message: 'Xóa bài post thành công'
            })
        }
        return res.status(403).json({
            status: 1,
            message: 'Bạn không có quyền xóa bài post',
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống',
        })
    }
}

module.exports = {
    getPosts, createPost, deletePost
}