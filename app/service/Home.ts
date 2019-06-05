import { Service } from 'egg';
/**
 * Test Service
 */
export default class Home extends Service {
  /** 刷新api请求限制 */
  async clearApi() {
    const { app, ctx } = this;
    const {
      Wx: { WxConfig },
    } = app.config;
    const token = await ctx.service.token.createToken();
    const opt: any = {
      method: 'POST',
      data: {
        appid: WxConfig.Appid,
      },
    };
    console.log(opt);
    try {
      const res = await ctx.curl(
        `https://api.weixin.qq.com/cgi-bin/clear_quota?access_token=${token}`,
        opt
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  /** 自定义菜单 */
  async createMenus() {
    const { app, ctx } = this;
    const {
      Wx: { WxConfig },
    } = app.config;
    const token = await ctx.service.token.createToken();
    const opt: any = {
      method: 'POST',
      data: WxConfig.Menus,
      dataType: true,
    };
    try {
      await ctx.curl(
        ` https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`,
        opt
      );
    } catch (error) {
      console.log(error);
    }
  }
}
