import * as Joi from 'joi';
import validator from '../middleware/validator';
// 条件筛选守卫
export const MovieVodsDto = validator({
  type: 'query',
  valid: Joi.object().keys({
    page: Joi.number(),
    size: Joi.number(),
    year: Joi.number(),
    director: Joi.string(),
    actor: Joi.string(),
    classify: Joi.string(),
    catalog: Joi.string(),
  }),
});

// 搜索守卫
export const MovieSearchDto = validator({
  type: 'body',
  valid: Joi.object().keys({
    keyword: Joi.string().required(),
    page: Joi.number(),
    size: Joi.number(),
  }),
});
