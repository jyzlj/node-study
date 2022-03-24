// 1. 导入 http 模块
const http = require('http');

// 2. 创建 web 服务器实例
const server = http.createServer();

// 3. 为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', (req, res) => {
  /**
   * req 是请求对象，它包含了与客户端相关的数据和属性
   * req.url 是客户端请求的 URL 地址
   * req.method 是客户端的 method 请求类型
   */
  //  const str = `Your request url is ${req.url}, and request method is ${req.method}`

  /**
   * 如果不设置响应头，中文的话在客户端浏览器是会乱码的
   * 设置响应头的两种方式: 
   * res.setHeader('Content-type', 'text/plain;charset=utf-8')
   * res.writeHead(200, {'Content-Type':'text/html;charset=UTF8'});
   */
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'}); // text/plain 就是普通文本，纯文本无法解析标签
    // res.setHeader('Content-type', 'text/html;charset=utf-8'); // text/html 显示html的格式在页面上，可以解析标签
    const str = `<h1>您请求的 url 地址是 ${req.url}, 请求的 method 类型是 ${req.method}</h1>`;
    console.log(str);
   /**
    * res.end() 方法，向客户端反应一些内容，并结束这次请求的处理过程
    */
    res.end(str)
});

// 4. 启动服务器
server.listen('80', () => {
  console.log('server running at http://127.0.0.1:80');
});
