require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const authRouter = require('./src/routes/auth');
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', authRouter);

app.listen(port, () => {
    console.log('Listen on port', port);
})
