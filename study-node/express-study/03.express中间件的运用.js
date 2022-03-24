const express = require('express');
const app = express();
const mw = (req, res, next) => {
	console.log('这是一个简单的中间件函数');
	next();
};
// 全局生效的中间件
app.use(mw)

app.get('/', (req, res, next) => {
  res.data = {
    name: '胖丁',
    age: 22,
  }
	next();  // 中间件函数的形参列表中，必须包含 next 函数
    // next 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由
});
app.get('/', (req, res) => {
  res.data.hobby = '吃饭',
  res.send(res.data);
});

app.get('/user', (req, res) => {
  
  res.send(res.data || 'res.data 是空的');
});

app.listen('80', () => {
	console.log('express server running at http://127.0.0.1');
});