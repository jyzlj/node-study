const express = require('express');

const router = express.Router();

const expressJoi = require('@escook/express-joi');

const { addArticle } = require('../router-handle/article.js');

const { addArticleRules } = require('../schema/article.js');

// 导出解析 formData 格式表单数据的包
const multer = require('multer');
// 导入处理路劲的核心模块
const path = require('path');
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') });

router.post('/addArticle',upload.single('cover_img'), expressJoi(addArticleRules), addArticle)



module.exports = router;