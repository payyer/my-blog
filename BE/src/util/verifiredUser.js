const jwt = require('jsonwebtoken');

function verifiredUser(req, res, next) {
    const { user_access } = req.cookies;
    console.log('This is token from server', user_access)
    try {
        if (user_access) {
            const decodeedToken = jwt.verify(user_access, process.env.JWT_SECRET);
            req.user = decodeedToken;
            return next();
        } else {
            return res.status(200).json({
                status: 1,
                message: 'Bạn chưa đăng nhập'
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống',
            err
        });
    }
}

function verifiredAdmin(req, res, next) {
    const { user_access } = req.cookies;
    try {
        if (user_access) {
            const decodeedToken = jwt.verify(user_access, process.env.JWT_SECRET);
            if (decodeedToken.role === 'admin') {
                req.user = decodeedToken;
                return next();
            } else {
                return res.status(403).json({
                    status: 1,
                    message: 'Không có quyền thực hiện hành động này'
                })
            }
        } else {
            return res.status(200).json({
                status: 1,
                message: 'Bạn chưa đăng nhập'
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống',
            err
        });
    }
}

module.exports = { verifiredUser, verifiredAdmin }