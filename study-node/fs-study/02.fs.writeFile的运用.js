const fs = require('fs');

// fs.writeFile(file, data[, option], callback);
/**
 * 参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径
 * 参数2：必选参数，表示要写入的内容
 * 参数3：可选参数，表示以什么格式写入文件内容，默认是 utf8
 * 参数4：必选参数，文件写入完成后的回调函数
 */
 fs.writeFile('./files/text2.txt', 'fs.writeFile我是要添加的内容', function(err){
 // 如果写入成功，则 err 的值为 null
 // 如果写入失败，则 err 的值为错误对象
 if(err) {
 	return console.log('文件写入错误', err.message);
  }
   console.log('文件写入成功');
 })