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

// 增加文章列表分类
exports.addArticleCate = (req, res) => {
  const judgeArticleTypeSql = 'select * from ev_article_cate where name=? or alias=?';

  db.query(judgeArticleTypeSql, [req.body.name, req.body.alias], (err, results) => {
    // SQL 语句执行失败
    if(err) return res.cc(err);

    // 分类名称 和 分类别名 都被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！');
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！');
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！');
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！');

    const addArticleTypeSql = 'insert into ev_article_cate set ?';
    db.query(addArticleTypeSql, req.body,(err, results) => {
      // SQL 语句执行失败
    console.log(err, '11111111111');

      if(err) return res.cc(err);

      if(results.affectedRows !== 1) return res.cc('新增文章分类失败！');

      res.cc('新增文章分类成功！', 0)
    })
  });
};

// 删除文章分类
exports.deleteArticleCate = (req, res) => {
  const deleteArticleSql = 'update ev_article_cate set is_delete=1 where id=?';

  db.query(deleteArticleSql, req.params.id, (err, results) => {
    if(err) return res.cc(err);

    if(results.affectedRows !== 1) return res.cc('删除文章分类失败');

    res.cc('删除文章分类成功！', 0)
  });
};

// 获取文章详情
exports.getCateDetail = (req, res) => {
  const getArtCateSql = 'select * from ev_article_cate where id=?';
  db.query(getArtCateSql, req.params.id, (err, results) => {
    // SQL 语句执行失败
    if(err) return res.cc(err);

    if(results.length !== 1) return res.cc('获取文章详情失败！');

    res.send({
      status: 0,
      message: '获取文章详情成功！',
      data: results[0],
    })
  })
}