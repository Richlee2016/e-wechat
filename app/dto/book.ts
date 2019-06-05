import * as Joi from 'joi';
import validator from '../middleware/validator';
// 书城代理 守卫
export const BookProxyDto = validator({
  type: 'body',
  valid: Joi.object()
    .keys({
      url: Joi.string().required(),
      method: Joi.any().valid('GET', 'POST'),
      data: Joi.any().optional(),
    })
    .with('url', 'method'),
});

// 瀑布流 参数 守卫
export const BookFallsDto = validator({
  type: 'query',
  valid: Joi.object().keys({
    start: Joi.number(),
    count: Joi.number(),
  }),
});

// 书籍搜索 守卫
export const BookSearchDto = validator({
  type: 'query',
  valid: Joi.object().keys({
    q: Joi.string().required(),
  }),
});

// 书籍目录 守卫
export const BookChapterDto = validator({
  type: 'query',
  valid: Joi.object().keys({
    type: Joi.number().required(),
    chapter: Joi.number().required(),
  }),
});

// 书籍详情 守卫
export const BookContextDto = validator({
  type: 'query',
  valid: Joi.object().keys({
    type: Joi.number().required(),
    chapter: Joi.number().required(),
    id: Joi.number().required(),
  }),
});
