// import { Context } from "egg";
// import * as _ from "lodash";
// export function bookFreeMiddleware(): any {
//   return async (ctx: Context, next: () => Promise<any>) => {
//     const { app } = ctx;
//     const { type, chapter, id } = ctx.query;
//     const saveName = `/book/chapter?type=${type}&chapter=${chapter}`;
//     const isOverTime = await app.redis.hget(saveName,'passtime')
//     if(!isOverTime){
//         await ctx.app.redis.expire(saveName, 60);
//     }
//     let findKey = "chapter";
//     if (id) {
//       findKey = id;
//     }
//     const book = await app.redis.hget(saveName, findKey);
//     if (book) {
//       ctx.body = JSON.parse(book);
//     } else {
//       await next();
//       await app.redis.hset(saveName, findKey, JSON.stringify(ctx.body));
//     }
//   };
// }
