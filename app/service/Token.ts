import { Service } from 'egg';
/** Token Service */
export default class TokenServer extends Service {
  /** 请求 access_token */
  public async fetchToken() {
    const { app, ctx } = this;
    const {
      Wx: { WxConfig },
    } = app.config;
    const baseUrl = `${
      WxConfig.Prefix
    }/token?grant_type=client_credential&appid=${WxConfig.Appid}&secret=${
      WxConfig.Secret
    }`;
    console.log('请求了一次token---------------------');
    try {
      const getToken = await ctx.curl(baseUrl, { dataType: 'json' });
      return getToken.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  /** 更新 access_token */
  public async createToken(): Promise<string> {
    const { ctx } = this;
    try {
      const access_token = await ctx.app.redis.get('access_token');
      if (!access_token) {
        const newToken = await this.fetchToken();
        await ctx.app.redis.set('access_token', newToken.access_token);
        await ctx.app.redis.expire('access_token', 7000);
        return newToken.access_token;
      }
      return access_token;
    } catch (error) {
      throw new Error(error);
    }
  }

  /** 根据code 请求 oauth token */
  // TODO:未做持久化处理
  public async fetchOauthToken(code) {
    const { app, ctx } = this;
    const {
      Wx: { WxOpenIdConfig },
    } = app.config;
    try {
      const getOauthToken = await ctx.curl(WxOpenIdConfig.getToken(code), {
        dataType: 'json',
      });
      return getOauthToken;
    } catch (error) {
      throw new Error(error);
    }
  }
  /** 刷新access_token */
  public async refreshOauthToken() {
    // const refreshToken = this.TokenModle.find()
    // const opt = {
    //   url:WxOpenIdConfig.refreshToken(refreshToken),
    //   method:'GET'
    // }
    // try {
    //   let getOauthToken = await Rxios(opt)
    // } catch (error) {
    //   throw new Error(error);
    // }
  }
}
