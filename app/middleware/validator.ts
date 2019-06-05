import { Context } from 'egg';
import * as Joi from 'joi';
interface arg {
  type: 'query' | 'body';
  valid: Joi.ObjectSchema;
  handle?(arg, ctx, next): any;
}
/** 参数验证器 */
export default function validatorMiddleware(arg: arg): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    let validData = {};
    const ty = arg.type || 'body';
    if (ty === 'body') {
      validData = ctx.request.body;
    }
    if (ty === 'query') {
      validData = ctx.query;
    }
    return Joi.validate(validData, arg.valid, err => {
      if (err !== null) {
        if (arg.handle) {
          arg.handle(err, ctx, next);
          return next();
        } else {
          ctx.body = err;
        }
      } else {
        return next();
      }
    });
  };
}
