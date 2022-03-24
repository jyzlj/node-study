const express = require('express');
const userRouter = require('./02.user.js');

const app = express();

// 组成路由
app.use(userRouter);


app.listen(80, ()=> {
  console.log('express server running at http://127.0.0.1');
});