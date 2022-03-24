const fs = require('fs');

// fs.readFile(path[, options], callback)
/** 
 * 参数1：必选参数，字符串，表示文件路径
 * 参数2：可选参数，表示一什么编码格式来读取文件   'utf8'
 * 参数3：必选参数，文件读取完成后，通过毁掉函数拿到读取结果
 */
 fs.readFile('./files/text1.txt', 'utf8', (err, dataStr) =>{
  // err 表示失败之后的结果， dataStr 表示成功之后的结果
  // 如果读取成功，则 err 的值为 null；读取失败，则 err 为错误对象， dataStr 为 undefined
  if(err) {
    return console.log('文件写入错误', err.message);
  }
  // 如果读取成功，dataStr 则是打印成功的结果
  console.log(dataStr);
});
