const models = require('../models/index');
const jwt = require('jsonwebtoken')
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

// [GET] /api/v1/post/post-verified
const getPostsVerified = async (req, res) => {
    const { user_access } = req.cookies;
    try {

        const posts = await models.Post.findAll({
            where: {
                censorship: true
            },
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
        if (user_access) {
            const decodeedToken = jwt.verify(user_access, process.env.JWT_SECRET);
            return res.status(200).json({
                status: 0,
                message: "Lấy tất cả bài viết đã kiểm duyện thành công",
                data: posts,
                user: decodeedToken
            });
        } else {
            return res.status(200).json({
                status: 0,
                message: "Lấy tất cả bài viết đã kiểm duyện thành công",
                data: posts,
                user: ''
            });
        }

    }
    catch (err) {
        res.json({ status: -1, message: 'Lỗi hệ thống', err });
    }
}

// [GET] /api/v1/post/post-unverified
const getPostsUnVerified = async (req, res) => {
    try {
        const posts = await models.Post.findAll({
            where: {
                censorship: false
            },
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
            message: "Lấy tất cả bài viết chưa kiểm",
            data: posts
        });
    }
    catch (err) {
        res.json({ status: -1, message: 'Lỗi hệ thống', err });
    }
}

// [GET] /api/v1/post/detail/:postId
const getPost = async (req, res) => {
    const { postId } = req.params;
    console.log(postId);
    try {
        const post = await models.Post.findOne({
            where: { id: postId },
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
        if (post) {
            await post.update({ views: post.views + 1 })
            return res.status(200).json({
                status: 0,
                message: "Detail post",
                data: post
            });
        } else {
            return res.status(404).json({
                status: 1,
                message: 'Không tìm thấy bài viết'
            })
        }

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống'
        })
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

// [PUT] /api/v1/post/update/:postId
const editPost = async (req, res) => {
    const { postId } = req.params;
    const user = req.user;
    const { title, article } = req.body;
    try {
        if (!title || !article) {
            return res.status(400).json({
                status: 1,
                message: 'Bạn chưa nhập nội dung'
            })
        }
        const post = await models.Post.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(403).json({
                status: 1,
                message: 'Không tìm thấy bài viết'
            })
        }
        if (user.id === post.userId) {
            await post.update({ title, article })
            return res.status(200).json({
                status: 0,
                message: 'Edit bài viết thành công'
            })
        } else {
            return res.status(403).json({
                status: 1,
                message: 'Bạn không có quyền sửa bài viến này!'
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống'
        })
    }
}

// [DELETE] /api/v1/post/create/:postId
const deletePost = async (req, res) => {
    const { postId } = req.params;
    const user = req.user;
    try {
        const comments = await models.Comment.findAll({ where: { postId } });
        console.log('Comment >> ', comments);
        if (comments && comments.length > 0) {
            for (const comment of comments) {
                await comment.destroy();
            }
        }
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
    getPosts, getPostsVerified, getPostsUnVerified, getPost, createPost, editPost, deletePost
}