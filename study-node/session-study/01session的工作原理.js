const express = require('express');
// 1. 导入 session 中间件
const session = require('express-session');

const app = express();

// 解决跨域
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({
  extended: false
}))

// 2. 配置 session 中间件
app.use(session({
  secret: 'keyboard cat', // secret 属性的值可以为任意字符串
  saveUninitialized: true, // 固定写法
  resave: false,
}));

app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  console.log(req.body, 'req.body');
  if(req.body.username !== 'admin' || req.body.password !== '000000'){
    return res.send({
      status: 1,
      msg: '登录失败',
    });
  };
  req.session.user = req.body; // 将用户的信息，存储到 session 中
  req.session.isLogin = true; // 将用户的登录状态，存储到 session 中

  res.send({
    status: 0,
    msg: '登录成功',
  });
});

// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // 判断用户是否登录
  if(!req.session.isLogin) {
    return res.send({
      status: 1,
      msg: 'fail'
    });
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username
  })
});

/**
 * 退出登录接口
 * 清空 session 
 * 调用 req.session.destroy()
 */

app.post('/api/logout', (req, res) => {
  // 清空当前客户端对应的 session 信息
  req.session.destroy();
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})

app.listen('80', () => {
  console.log('express server running at success');
});
