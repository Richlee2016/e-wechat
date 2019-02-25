import { Controller } from "egg";
import { Contro, Get, Post,Prefix } from "../router";
import * as getRawBody from "raw-body";
@Prefix(['home'])
@Contro("/")
export default class HomeController extends Controller {
  // 回调
  @Get("/")
  public async open() {
    const ctx = this.ctx;
    const { code } = ctx.query;
    await ctx.service.token.fetchOauthToken(code);
    ctx.body = 123;
  }
  // 回调
  @Post("/wechat-hear")
  async root() {
    const { ctx } = this;
    const { req, query } = ctx;
    const message = await getRawBody(req, {
      length: req.headers["content-length"],
      limit: "1mb"
    });
    ctx.body = await ctx.service.message.HandleMessage(query, message);
  }
  // 重置api次数
  @Get("/clear-wechat")
  async clearApi() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.clearApi();
  }
  // 创建菜单
  @Post("/createMenu")
  async createMenu() {
    const res = await this.ctx.service.home.createMenus();
    return res;
  }
  // 创建回复
  @Post("CreateReply")
  async createReply() {
    const { ctx } = this;
    const data = ctx.request.body;
    await ctx.service.message.CreateReply(data);
  }
  // 获取 token
  @Get("/fetchToken")
  async fetchToken() {
    this.ctx.body = await this.ctx.service.token.createToken();
  }
  // 获取 openid
  @Get("/OpenId")
  async openId() {}
  // test redis
  @Get("/redis")
  async testForRedis() {
    const { ctx, app } = this;
    // set 字符串
    // await app.redis.set('set-test','box1')
    // hash 哈希值
    // await app.redis.hset('hash-test','rich',2)
    // list 列表 可重复
    await app.redis.lpush("list-test", 1);
    // maps 集合 不可重复
    await app.redis.sadd("maps-test", "good");
    // 有序集合
    // await app.redis.zadd("zmap-test", "nice", 1, "box");
    ctx.body = 1;
  }
}
