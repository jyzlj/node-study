const express = require('express');

const articleCate = require('../router-handle/articleCate.js');

const router = express.Router();

router.get('/cates', articleCate.getArticleData);


module.exports = router;