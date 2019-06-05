import { Context } from 'egg';

// 请求缓存
export default function ErrorHandlerMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { app } = ctx;
    try {
      await next();
    } catch (err) {
      app.emit('error', err);
      const status = err.status || 500;
      const error_msg =
        status === 500 && app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;
      ctx.body = { error_msg };
      ctx.body.success = false;
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
}
