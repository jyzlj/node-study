const joi =require('joi');

const name = joi.string().required();

const alias  = joi.string().alphanum().required();

const id = joi.number().integer().min(1).required();

exports.addArticleCate = {
  body: {
    name,
    alias
  }
};

// id 的校验规则
exports.deleteArticleCateId = {
  params: {
    id,
  }
};
