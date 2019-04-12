import { Controller } from 'egg';
import { Contro, Get, Post, Prefix } from '../router';
@Prefix(['user'])
@Contro('/User')
export default class UserController extends Controller {
  /**
   * 标签增删改查
   * @param body
   */
  @Post('/Tag')
  public async handlleTag() {
    const { ctx } = this;
    const { method, tag } = ctx.request.body;
    const res = await ctx.service.user.handleTag(method, tag);
    ctx.body = res;
  }
  /**
   * 获取标签下粉丝
   * @param query
   */
  @Post('/UserTag')
  public async fetchUserTag() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.user.fetchUserTag(body);
    ctx.body = res;
  }
  /**
   * 粉丝标签管理
   * @param body
   */
  @Post('/MembersTag')
  public async membersTag() {
    const { ctx } = this;
    const { method, member } = ctx.request.body;
    const res = await ctx.service.user.membersTag(method, member);
    ctx.body = res;
  }
  /**
   * 获取粉丝下的标签
   * @param query
   */
  @Get('/IdTag')
  public async getidTag() {
    const { ctx } = this;
    const { openid } = ctx.query;
    const res = await ctx.service.user.getidTag(openid);
    ctx.body = res;
  }
  /**
   * 获取用户列表
   * @param query
   */
  @Get('/UserList')
  public async fetchUserList() {
    const { ctx } = this;
    const { next_openid } = ctx.query;
    const res = await ctx.service.user.fetchUserList(next_openid);
    ctx.body = res;
  }
  /**
   * 获取用户信息
   * @param query
   */
  @Get('/UnionId')
  public async fetchUnionId() {
    const { ctx } = this;
    const { openid } = ctx.query;
    const res = await ctx.service.user.fetchUnionId(openid);
    ctx.body = res;
  }
  /**
   * 批量用户信息
   * @param body
   */
  @Post('/UnionIds')
  public async fetchUnionIds() {
    const { ctx } = this;
    const { user_list } = ctx.request.body;
    const res = await ctx.service.user.fetchUnionIds(user_list);
    ctx.body = res;
  }
  /**
   * 获取黑名单列表
   * @param query
   */
  @Get('/BlackList')
  public async fetchBlackList() {
    const { ctx } = this;
    const { next_openid } = ctx.query;
    const res = await ctx.service.user.fetchBlackList(next_openid);
    ctx.body = res;
  }
  /**
   * 拉入黑名单
   * @param body
   */
  @Post('/CreateBlack')
  public async createBlack() {
    const { ctx } = this;
    const { openid_list } = ctx.request.body;
    const res = await ctx.service.user.createBlack(openid_list);
    ctx.body = res;
  }
  /**
   * 删除黑名单
   * @param body
   */
  @Post('/DeleteBlack')
  public async deleteBlack() {
    const { ctx } = this;
    const { openid_list } = ctx.request.body;
    const res = await ctx.service.user.deleteBlack(openid_list);
    ctx.body = res;
  }
}
