const db = require('../db/index.js');

// 获取文章分类
exports.getArticleData = (req, res) => {
  const getArticleCateSql = 'select * from ev_article_cate where is_delete=0 order by id asc'
  db.query(getArticleCateSql, (err, results) => {
    // SQL 语句执行失败
    if(err) return res.cc(err);

    res.send({
      status: 0,
      message: '文章分类列表获取成功！',
      data: results
    });
  })
};