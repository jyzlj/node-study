// 用户信息验证模块
const joi =require('joi');

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * integer() 整数
 */

/**
 * 1. 用户名的校验规则
 */
const username = joi.string().alphanum().min(1).max(10).required();

/**
 * 2. 密码的校验规则
 */
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

/**
 * 3. 重复密码的校验规则
 */

// const repassword = joi.ref('password');

/**
 * 4. id 的校验规则
 */
const id = joi.number().integer().min(1).required();

/**
 * 5. nickname 的校验规则
 */
const nickname = joi.string().required();

/**
 * 6. email 的校验规则
 */
const email = joi.string().email().required();

/**
 * 7. avatar 的校验规则
 */
const avatar = joi.string().dataUri().required();

// 用户注册和登录的表单校验
exports.reg_login_schema = {
  body: {
    username,
    password,
    // repassword
  }
};

// 更新用户数据的表单校验
exports.update_userInfo_schema = {
  body: {
    id,
    nickname,
    email
  }
};

// 更新密码的校验
exports.update_pwd_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  }
};

// 更换头像
exports.update_avatar_schema = {
  body: {
    avatar
  }
}
