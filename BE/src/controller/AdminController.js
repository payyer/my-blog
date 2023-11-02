const models = require('../models/index');


// [PUT] api/v1/admin/censorship/:postId
const censorshipPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await models.Post.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({
                status: 1,
                message: 'Không tìm thấy bài viết'
            })
        }
        if (post.censorship === true) {
            return res.status(200).json({
                status: 1,
                message: 'Bài viết đã được kiểm duyệt qua'
            })
        }
        await post.update({ censorship: true });
        return res.status(200).json({
            status: 0,
            message: 'Kiểm duyệt thành công!'
        })
    }
    catch (err) {
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống'
        })
    }

}

module.exports = {
    censorshipPost
}