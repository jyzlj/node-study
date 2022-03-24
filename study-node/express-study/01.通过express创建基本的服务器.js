// 1. 导入 express
const express = require('express');
// 2. 创建 web 服务器
const app = express();

/**
 * app.get('请求的URL', (req, res) => { 处理函数 })
 * 参数1：请求的URL
 * 参数2：请求所对应的回调函数
 *        req：请求对象(包含了与请求相关的属性和方法)
 *        res：响应对象(包含了与响应相关的属性和方法)
 */
app.get('/list', (req, res) => {
  /**
   * req.query 默认是一个空对象
   * 客户端使用 ?name=zs&age=22 这种查询字符串形式，发送到服务器的参数
   */
  console.log(req.query, 'query');
  const data = {
    "name": "胖丁",
    "age": 22,
  };
  res.send(data);
});

app.get('/home/:id/:name', (req, res) => {

  /**
   * req.params 默认是一个空对象, 里面存放着通过 : 动态匹配到的参数值
   * 客户端请求 /1/芳芳
   */
  console.log(req.params);
  res.send(req.params);
});

/**
 * app.post('请求的URL', (req, res) => { 处理函数 })
 * 参数1：请求的URL
 * 参数2：请求所对应的回调函数
 *        req：请求对象(包含了与请求相关的属性和方法)
 *        res：响应对象(包含了与响应相关的属性和方法)
 */
app.post('/user', (req, res) => { 
  const data = {
    "name": "胖丁",
    "age": 22,
  };
  res.send(data);
});

// 3. 调用 app.listen(端口号, 启动成功之后的回调函数), 启动服务器
app.listen('80', () => {
  console.log('express server running at http://127.0.0.1');
});
