const express = require('express');

// 导入用户路由模块
const usersRouter = require('./router/users.js');
// 导入用户信息模块
const usersInfoRouter = require('./router/usersInfo.js');
// 导入文章类别模块
const articleCateRouter = require('./router/articleCate.js');

// 导入配置文件
const config = require('./config.js');
const expressJWT = require('express-jwt')

// 表单校验
const joi =require('joi');

const app = express();

// 注册全局中间件
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  };
  next();
})

// 1. 配置跨域
const cors = require('cors');
// 1. 注册中间件
app.use(cors());

// 2. 配置解析表单数据的中间件
app.use(express.urlencoded({
  extended: false,
}));

// 解析 token
/**
 * 不添加algorithms: ['HS256']：会导致报错的语句 node_modules\_express-jwt@6.0.0@express-jwt\lib\index.js:22
 * 原因是：2020.7.7日jwt更新之后，安装的express-jwt模块会默认为6.0.0版本，更新后的jwt需要在配置中加入algorithms属性，即设置jwt的算法。一般HS256为配置algorithms的默认值：
 */
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api/]}))


app.use('/api', usersRouter);
app.use('/my', usersInfoRouter);
app.use('/my/article', articleCateRouter);

// 错误中间件
app.use((err, req, res, next)=> {
  if(err instanceof  joi.ValidationError) return res.cc(err);

  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！');
  
  // 未知错误
  return res.cc(err);
})


app.listen('3007', () => {
  console.log('api server running at success http://127.0.0.1:3007');
});
