const express = require('express');
// 1. 导入用于生成 JWT 字符串的包
const jwt = require('jsonwebtoken');
// 2. 导入用于将客户端发送过来的 JWT 字符串，解析还原成 JSON 对象的包
const expressJWT = require('express-jwt');

const app = express();

app.use(express.urlencoded({
  extended: false
}))

/**
 * 3. 定义 secret 密钥
 * 为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的 secret 密钥
 * 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
 * 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密
 */
const secretKsy = 'itheima No1 ^_^';

/**
 * expressJWT({secret: secretKey}) 就是用来解析 Token 的中间件
 * .unless({ path: [/^\/api\//]}) 用来指定那些接口不需要访问权限
 */
 app.use(expressJWT({
  secret: secretKsy,
  algorithms: ['HS256'],
 }).unless({ path: [/^\/api\//]}));


app.post('/api/login', (req, res) => {
  // ...省略校验失败
  const userInfo = req.body;

  res.send({
    status: 200,
    message: '登录成功！',
    token: jwt.sign({
      username: userInfo.username
    },
    secretKsy,
    {
      expiresIn: '60s'
    }
    )
  })
});

// 这是一个有权限的 API 接口
app.get('/admin/getInfo', (req, res) => {
  res.send({
    status: 200,
    message: '获取用户信息成功',
    data: req.user
  })
});



// 错误的中间件
app.use((err, req, res, next) => {
  // token 解析失败导致的错误
  if(err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  // 其他原因导致的错误
  res.send({
    status: 500,
    message: '未知错误',
  })
})

app.listen('80', () => {
  console.log('express server running at success');
});
