const express = require('express');

const articleCate = require('../router-handle/articleCate.js');

const expressJoi = require('@escook/express-joi')

const router = express.Router();

const { addArticleCate, deleteArticleCateId } = require('../schema/cate')

// 获取文章分类列表
router.get('/cates', articleCate.getArticleData);

// 增加文章分类
router.post('/addCates', expressJoi(addArticleCate), articleCate.addArticleCate);

// 删除文章分类
router.get('/deleteCate/:id', expressJoi(deleteArticleCateId), articleCate.deleteArticleCate);

// 获取文章详情
router.get('/detailCate/:id',expressJoi(deleteArticleCateId), articleCate.getCateDetail)

module.exports = router;