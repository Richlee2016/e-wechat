import * as Joi from 'joi';
import validator from '../middleware/validator';
// 参数验证 测试
export const HomeIndexDto =  validator({
    type: 'query',
    valid: Joi.object({
        test: Joi.number(),
    }),
});