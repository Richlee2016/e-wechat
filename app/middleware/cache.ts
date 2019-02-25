import { Context } from 'egg';

/**
 * 
 * @param opt 
 * ['@cache'] 永久储存
 * [['@cache',{time:10}]]  储存10秒
 */
// 请求缓存
export default function fooMiddleware(opt:{time:number}): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const {url, method} = ctx;
    const saveKey = method === 'GET' ? url : JSON.stringify(ctx.request.body).trim();
    let Cache: string | null = null;
    if (opt.time){
      Cache = await ctx.app.redis.get(saveKey);
    }else{
      Cache = await ctx.app.redis.hget('forever', saveKey);
    }
    if (Cache){
      ctx.body = JSON.parse(Cache);
    }else{
      await next();
      if (opt.time){
        await ctx.app.redis.set(saveKey, JSON.stringify(ctx.body));
        await ctx.app.redis.expire(saveKey, opt.time);
      }else{
        await ctx.app.redis.hset('forever', saveKey, JSON.stringify(ctx.body));
      }
    }
  };
}