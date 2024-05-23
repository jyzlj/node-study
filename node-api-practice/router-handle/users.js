// 导入数据库
const db = require('../db/index');

// 生成 token
const jwt = require('jsonwebtoken');

const config = require('../config.js');

const bcryptjs = require('bcryptjs');
// 注册的处理函数
exports.register = (req, res) => {
  const userInfo = req.body;
  // 1. 校验密码和账号不能为空
  // if( !userInfo || !userInfo.username || !userInfo.password) return res.cc('账号或密码不能为空！')

  // 2. 判断用户名是否注册过
  const UserNameRegisteredSql = 'select * from ev_users where username=?';
  db.query(UserNameRegisteredSql, userInfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if(err) return res.cc(err);
    
    if(results.length > 0) return res.cc('用户名已被注册！');

    /**
     * bcryptjs 对密码进行加密
     * bcryptjs.hashSync(明文密码, 随机的长度)
     * 对用户的密码,进行 bcryptjs 加密，返回值是加密之后的密码字符串
     */
    userInfo.password = bcryptjs.hashSync(userInfo.password, 10);

    // 3. 插入新用户
    const insertUserSql = 'insert into ev_users set ?';
    db.query(insertUserSql, {username: userInfo.username, password: userInfo.password}, (err, results) => {
      // 执行 SQL 语句失败
      if(err) return res.send(err);
      // SQL 语句执行成功，但影响行数不为 1
      if(results.affectedRows !== 1) return res.send('注册用户失败，请稍后再试！');
      // 注册成功
      res.cc('注册成功！', 0);
    })
  });
};
// 登录的处理函数
exports.login = (req, res) => {
  const userInfo = req.body;

  const queryUsersSql = 'select * from ev_users where username=?'
  db.query(queryUsersSql, userInfo.username, (err, results) => {
    // SQL 语句执行失败
    if(err) return res.cc(err);
    // SQL 语句执行成功，但是查询不到数据
    if(results.length !== 1) return res.cc('查询不到该账户！');

    /**
     * 判断密码输入是否正确
     * bcrypt.compareSync(用户提交的密码, 数据库中的密码)
     * 返回值是布尔值（true 一致、false 不一致）
     */
    const isLogin = bcryptjs.compareSync(userInfo.password, results[0].password);
    if(!isLogin) return res.cc('密码不正确！');

    /**
     * 生成 token
     */
    // 剔除出敏感数据，比如密码
    const user = { ...results[0], password: '', user_pic: '' }

    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '10h',
    });

    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer '  + tokenStr
    });
  })
};

// 注销
export const logout = (req, res) => {
  req.session.user = null;
  req.session.islogin = false;
  res.send({ msg: '注销成功', status: 200 });
}