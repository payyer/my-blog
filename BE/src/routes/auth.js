const express = require('express');
const router = express.Router();
const models = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json({
            message: 'Chưa nhập tài khoản hoặc mật khẩu',
            status: 1
        })
    }
    try {
        const checkUser = await models.User.findOne({ where: { email } })
        if (checkUser) {
            if (checkUser.verified !== true) {
                return res.status(200).json({
                    status: 1,
                    message: 'Email chưa được xác thực'
                })
            }
            const checkPassword = await bcrypt.compareSync(password, checkUser.password);
            if (checkPassword) {
                const data = {
                    name: checkUser.name,
                    email: checkUser.email,
                    age: checkUser.age,
                    phone: checkUser.phone,
                    gender: checkUser.gender,
                    role: checkUser.role,
                }
                const accessToke = jwt.sign(data, process.env.JWT_SECRET);
                res.cookie('user_access', accessToke, { httpOnly: true })
                return res.status(200).json({
                    message: 'Đăng nhập thành công',
                    status: 0,
                    data
                })
            } else {
                return res.status(200).json({
                    status: 1,
                    message: 'Mật khẩu không chính xác'
                })
            }
        } else {
            return res.status(200).json({
                status: 1,
                message: 'Người dùng không tồn tại'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống',
            err
        })
    }
})

router.post('/register', async (req, res) => {
    const { email, password, name, age, phone, gender } = req.body;
    try {
        const checkEmailIsExits = await models.User.findOne({ where: { email } });
        if (checkEmailIsExits) {
            return res.status(200).json({
                status: 1,
                message: "Người dùng đã tồn tại"
            })
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: "anhhocfullstack@gmail.com",
                pass: "nujq zpgb dxsm vnki",
            },
        });

        const opt = Math.floor(1000 + Math.random() * 9000);
        const info = await transporter.sendMail({
            from: 'anhhocfullstack@gmail.com', // sender address
            to: email,
            subject: "Verifired Email",
            text: "Ấn vào link bên dưới để xác nhận Email",
            html: `<a href=http://localhost:8080/api/v1//verify-email/${opt}>
                    http://localhost:8080/api/v1//verify-email/${opt}
                </a>`,
        });
        console.log("Message sent: %s", info.messageId);

        const slat = bcrypt.genSaltSync();
        const hashingPassword = bcrypt.hashSync(password, slat);
        const user = await models.User.create({ email, password: hashingPassword, name, age, phone, gender, opt });
        if (user) {
            return res.status(200).json({
                status: 0,
                message: "Chờ xác nhận Email",
            });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Lỗi hệ thống", status: -1, err })
    }
})

router.get('/verify-email/:opt', async (req, res) => {
    const { opt } = req.params;
    try {
        const user = await models.User.findOne({ where: { opt } });
        if (user) {
            const updateVerified = await user.update({ verified: true });
            if (updateVerified) {
                return res.status(200).json({
                    status: 0,
                    message: "Xác nhận email thành công"
                })
            } else {
                return res.status(200).json({
                    status: 1,
                    message: "Có lỗi khi xác nhận email"
                })
            }
        } else {
            return res.status(404).json({
                status: 1,
                message: "Không tìm thấy mã xác nhận"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: -1,
            message: "Lỗi từ phía máy chủ",
            err
        })
    }
})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const checkedEmail = await models.User.findOne({ where: { email } });
    try {
        if (checkedEmail) {
            // send link to reset password
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: "anhhocfullstack@gmail.com",
                    pass: "nujq zpgb dxsm vnki",
                },
            });

            const opt = Math.floor(1000 + Math.random() * 9000);
            await checkedEmail.update({ opt });

            const info = await transporter.sendMail({
                from: 'anhhocfullstack@gmail.com', // sender address
                to: email,
                subject: "Verifired Email",
                text: "Ấn vào link bên dưới để xác nhận Email",
                html: `<a href=http://localhost:8080/api/v1/reset-password/${opt}>
                        http://localhost:8080/api/v1/reset-password/${opt}
                    </a>`,
            });
            console.log("Message sent: %s", info.messageId);
            return res.status(200).json({
                status: 0,
                message: "Chờ xác nhận email",
            })
        } else {
            return res.status(200).json({
                status: 1,
                message: "Không tìm thấy người dùng"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: 1,
            message: "Lỗi hệ thống",
        })
    }

})

router.post('/reset-password/:opt', async (req, res) => {
    const { opt } = req.params;
    const { newPassword } = req.body;
    try {
        const user = await models.User.findOne({ where: { opt } });
        if (user) {
            if (!newPassword) {
                return res.status(200).json({
                    status: 1,
                    message: 'Chưa nhập mật khẩu mới'
                })
            }
            const salt = bcrypt.genSaltSync()
            const hashingPassword = bcrypt.hashSync(newPassword, salt)
            await user.update({ password: hashingPassword });
            return res.status(200).json({
                status: 0,
                message: 'Cập nhập mật khẩu thành công',
            })
        } else {
            return res.status(404).json({
                status: 1,
                message: 'Không tìm thấy mã OPT'
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: -1,
            message: 'Lỗi hệ thống'
        })
    }
    res.json({ user });
})

module.exports = router;