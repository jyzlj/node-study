const path  = require('path');

const db = require('../db/index.js');

exports.addArticle = (req, res) => {
  if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！');

  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
  };
  const sql = 'insert into ev_articles set ?';
  db.query(sql, articleInfo, (err, results) => {
    // SQL 语句执行失败
    if(err) return res.cc(err);

    if(results.affectedRows !== 1) return res.cc('文章添加失败！');

    res.cc('文章添加成功！', 0);
  })
}