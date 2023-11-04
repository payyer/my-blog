require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const authRouter = require('./src/routes/auth');
const postRouter = require('./src/routes/post');
const adminRouter = require('./src/routes/admin');
const commentRouter = require('./src/routes/comment');
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/comment', commentRouter);

app.listen(port, () => {
    console.log('Listen on port', port);
})
