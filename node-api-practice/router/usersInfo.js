const express = require('express');

const expressJoi = require('@escook/express-joi');
const { update_userInfo_schema, update_pwd_schema, update_avatar_schema } = require('../schema/users.js');
const usersInfo = require('../router-handle/usersInfo.js');
const router = express.Router();

// 获取用户基本信息
router.get('/userInfo', usersInfo.getUsersInfo);

// 更新用户基本信息
router.post('/update/userInfo', expressJoi(update_userInfo_schema), usersInfo.updateUserInfo)

// 更新密码
router.post('/update/pwd',expressJoi(update_pwd_schema), usersInfo.updatePwd);

// 更换头像
router.post('/update/avatar',expressJoi(update_avatar_schema), usersInfo.updateAvatar)

module.exports = router;