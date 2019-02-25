import { Service } from "egg";
import * as Rxios from "request-promise-native";
/**
 * Test Service
 */
export default class User extends Service {
  /**
   * 标签管理
   * @param method 增删改查
   * @param tag 标签
   */
  public async handleTag(
    method: "create" | "get" | "update" | "delete",
    tag: { id?: number; name?: string; count?: number }
  ) {
    // const { ctx } = this;
    const { token, WxTagConfig } = await this._getTabToken();
    let opt: any = {
      method: "POST",
      json: true
    };
    let baseUrl = WxTagConfig.createTag(token);
    switch (method) {
      case "create":
        opt.body = { tag };
        break;
      case "get":
        opt.method = "GET";
        baseUrl = WxTagConfig.fetchTag(token);
        break;
      case "update":
        baseUrl = WxTagConfig.updateTag(token);
        opt.body = { tag };
        break;
      case "delete":
        baseUrl = WxTagConfig.deleteTag(token);
        opt.body = { tag };
        break;
    }
    opt.url = baseUrl;
    try {
      const res = await Rxios(opt);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 获取标签下粉丝列表
   * @param userTag 用户列表
   */
  public async fetchUserTag(userTag: { tagid: number; next_openid?: string }) {
    const { token, WxTagConfig } = await this._getTabToken();
    let opt: any = {
      method: "POST",
      url: WxTagConfig.fetchUserTag(token),
      body: userTag,
      json: true
    };
    try {
      const res = await Rxios(opt);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 批量为用户打标签/取消标签
   * @param method 1:打标签  0:取消标签
   * @param userTag
   */
  public async membersTag(
    method: 1 | 0,
    userTag: { tagid: number; openid_list?: string[] }
  ) {
    const { token, WxTagConfig } = await this._getTabToken();
    let baseUrl = WxTagConfig.batchtTag(token);
    if (!method) {
      baseUrl = WxTagConfig.batchuntTag(token);
    }
    try {
      const res = await Rxios({
        url:baseUrl,
        method: "POST",
        body: userTag,
        json: true
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 获取用户身上的标签列表
   * @param openid 用户 id
   */
  public async getidTag(openid: string) {
    const { ctx } = this;
    const { token, WxTagConfig, opt } = await this._getTabToken();
    try {
      const res = await ctx.curl(
        WxTagConfig.getidTag(token),
        opt("POST", { openid })
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 获取用户列表
   * @param openid 用户 id
   */
  public async fetchUserList(openid: string | undefined) {
    const { ctx } = this;
    const { token, WxUserConfig, opt } = await this._getTabToken();
    try {
      const res = await ctx.curl(
        WxUserConfig.fetchUserList(token, openid),
        opt()
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 设置用户备注名
   * @param mark
   */
  public async createMark(mark: { openid: string; remark: string }) {
    const { ctx } = this;
    const { token, WxUserConfig, opt } = await this._getTabToken();
    try {
      const res = await ctx.curl(
        WxUserConfig.createMark(token),
        opt("POST", mark)
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 获取用户基本信息(UnionID机制)
   * @param openid 用户 id
   */
  public async fetchUnionId(openid: string) {
    const { ctx } = this;
    const { token, WxUserConfig, opt } = await this._getTabToken();
    try {
      const res = await ctx.curl(
        WxUserConfig.fetchUnionId(token, openid),
        opt()
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 批量获取用户基本信息
   * @param user_list
   */
  public async fetchUnionIds(
    user_list: Array<{ openid: string; lang?: string }>
  ) {
    // const { ctx } = this;
    const { token, WxUserConfig, opt } = await this._getTabToken();
    user_list.forEach(o => (o.lang = "zh_CN"));
    console.log(WxUserConfig.fetchUnionIds(token), opt("POST", { user_list }));
    try {
      const res = await Rxios({
        url:WxUserConfig.fetchUnionIds(token),
        method:'POST',
        body:user_list,
        json:true
      })
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 获取公众号的黑名单列表
   * @param begin_openid 开头 openid
   */
  public async fetchBlackList(begin_openid: string | undefined) {
    const { ctx } = this;
    const { token, WxUserConfig, opt } = await this._getTabToken();
    try {
      const res = await ctx.curl(
        WxUserConfig.fetchBlackList(token),
        opt("POST", { begin_openid })
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 拉黑用户
   * @param openid_list openid 列表
   */
  public async createBlack(openid_list: string[]) {
    const { ctx } = this;
    const { token, WxUserConfig, opt } = await this._getTabToken();
    try {
      const res = await ctx.curl(
        WxUserConfig.createBlack(token),
        opt("POST", { openid_list })
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 取消拉黑用户
   * @param openid_list openid 列表
   */
  public async deleteBlack(openid_list: string[]) {
    const { ctx } = this;
    const { token, WxUserConfig, opt } = await this._getTabToken();
    try {
      const res = await ctx.curl(
        WxUserConfig.deleteBlack(token),
        opt("POST", { openid_list })
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 储存openid
   */
  public async saveUser(openid: string) {
    const { ctx } = this;
    const _user = new ctx.model.User({ openid });
    const user = await _user.save();
    return user;
  }
  /** 辅助函数 */
  private async _getTabToken() {
    const { app, ctx } = this;
    const token = await ctx.service.token.createToken();
    const {
      Wx: { WxTagConfig, WxUserConfig }
    } = app.config;
    let optFun = (
      method?: "GET" | "POST",
      data?: any
    ): { method: "GET" | "POST"; data?: any; dataType: string } => {
      let dataType = "json";
      if (method === "POST") {
        return { method: "POST", data, dataType };
      } else {
        return { method: "GET", dataType };
      }
    };
    return {
      token,
      WxTagConfig,
      WxUserConfig,
      opt: optFun
    };
  }
}
