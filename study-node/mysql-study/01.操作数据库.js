// 1. 导入 mysql 模块
const mysql = require('mysql');
// 2. 建立与 MySQL 数据库的连接
const db = mysql.createPool({
	host: '127.0.0.1', // 数据库的 IP 地址
	user: 'root', // 登录数据库的账号
	password: 'qwertyuiop0', // 登录数据库的密码
	database: 'my_db_o1', // 指定要操作的数据库
});

// 检测 mysql 模块能否正常工作
// db.query('select 1', (err, results) => {
//   if (err) return console.log(err.message);
//   // 只要能打印出 [ RowDataPacket { '1': 1 } ] 的结果，就证明数据库连接正常
//   console.log(results);
// });

/**
 * 查询 users 表中所有的数据
 */
const sqlStr = 'select * from users';
db.query(sqlStr, (err, results) => {
  // 数据查询失败
  if(err) return console.log(err.message);
  /**
   * 数据查询成功 
   * 注意：如果执行的是 select 查询语句，则执行的结果是数组
   */
  console.log(results);
});

// const userData = {
//   username: '胖丁',
//   password: '123456',
// };

// const insertSqlData = 'insert into users (username, password) values (?, ?)';
// db.query(insertSqlData, [userData.username, userData.password], (err, results) => {
//   // 数据插入失败
//   if(err) return console.log(err.message);

//   /**
//    * 数据插入成功
//    * 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
//    * 可以通过 affectedRows 属性，来判断是否插入数据成功
//    */
//   if(results.affectedRows === 1) {
//     console.log('数据插入成功', results);
//   }
// });

// const userList = {
//   username: '芳芳',
//   password: '123456',
// };
// const insertSqlList = 'insert into users set ?';

// db.query(insertSqlList, userList, (err, results) => {
//   // 数据插入失败
//   if(err) return console.log(err.message);

//   /**
//    * 数据插入成功
//    * 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
//    * 可以通过 affectedRows 属性，来判断是否插入数据成功
//    */
//   if(results.affectedRows === 1) {
//     console.log('数据插入成功', results);
//   }
// });

/**
 * 更新数据
 */

const updateUserData = {
  id: 8,
  username: '我叫胖丁哈哈',
  password: '22222'
}

// const updateSqlDate = 'update users set username=?, password=? where id=?';

// db.query(updateSqlDate, [updateUserData.username, updateUserData.password, updateUserData.id], (err, results) => {
//   if(err) return console.log(err.message); // 更新失败

//   if(results.affectedRows === 1) {
//     console.log('更新成功!')
//   }
// })

const updateSqlDate = 'update users set ? where id=?';

db.query(updateSqlDate, [updateUserData, updateUserData.id], (err, results) => {
  if(err) return console.log(err.message); // 更新失败

  if(results.affectedRows === 1) {
    console.log('更新成功!')
  }
})

/**
 * 删除数据
 * 推荐根据 id 这样的唯一标识，来删除对应的数据
 */

const deleteSqlData = 'delete from users where id=?';

db.query(deleteSqlData, 8, (err, results) => {
  if(err) return console.log(err.message);

  if(results.affectedRows === 1) return console.log('删除成功!');
});
