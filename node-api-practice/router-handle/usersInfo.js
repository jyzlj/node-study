// 导入数据库
const db = require('../db/index');

const bcrypt = require('bcryptjs');

// 获取用户信息
exports.getUsersInfo = (req, res) => {
  const getUsersInfoSql = 'select id, username, nickname, email, user_pic from ev_users where id=?';
  db.query(getUsersInfoSql, req.user.id, (err, results) => {
    // SQL 执行失败
    if(err) return res.cc(err);

    if(results.length !==1) return res.cc('获取用户信息失败！');

    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0],
    });
  });
};

// 更新用户信息
exports.updateUserInfo = (req, res) => {
  const updateUserInfoSql = 'update ev_users set ? where id=?';
  db.query(updateUserInfoSql, [req.body, req.body.id], (err, results) => {
    // SQL语句执行失败
    if(err) return res.cc(err);

    if(results.affectedRows !==1 ) return res.cc('修改用户信息失败！');

    // 成功
    res.cc('修改用户信息成功！', 0);
  })
};

// 更新密码
exports.updatePwd = (req, res) => {
  // 判断用户输入的旧密码是否正确
  const oldPawSql = 'select * from ev_users where id=?';

  db.query(oldPawSql, req.user.id, (err, results) => {
    // SQL 语句执行失败
    if(err) return res.cc(err);
    
    if(results.length !== 1) return res.cc('用户不存在！');

    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);

    if(!compareResult) return res.cc('旧密码输入错误！');
    
    // 旧密码正确，修改密码
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);

    const updateNewPwdSql = 'update ev_users set password=? where id=?';

    db.query(updateNewPwdSql, [newPwd, req.user.id], (err, results) => {
      // SQL 语句执行失败
      if(err) return res.cc(err);

      if(results.affectedRows !== 1) return res.cc('密码更新失败！');

      res.cc('密码更新成功！', 0)
    })
  })
};

// 更换头像
exports.updateAvatar = (req, res) => {
  const userInfoAvatarSql = 'update ev_users set user_pic=? where id=?';
  db.query(userInfoAvatarSql, [req.body.avatar, req.user.id], (err, results) => {
    // SQL 语句执行失败
    if(err) return res.cc(err);

    if(results.affectedRows !== 1) return res.cc('头像更新失败！');

    res.cc('头像更新成功！', 0);
  })
}
