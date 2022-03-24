const express = require('express');
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
const { reg_login_schema } = require('../schema/users.js');

const usersHandle = require('../router-handle/users.js')


const router = express.Router();
// 注册
router.post('/register', expressJoi(reg_login_schema), usersHandle.register);

// 登录
router.post('/login', expressJoi(reg_login_schema), usersHandle.login);

module.exports = router;