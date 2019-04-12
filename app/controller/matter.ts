import { Controller } from 'egg';
import { Contro, Get, Post, Prefix} from '../router';
// import * as path from 'path'
// import sendToWormhole from 'stream-wormhole'
@Prefix(['matter'])
@Contro('/matter')
export default class MatterController extends Controller {
  // 添加 素材
  @Post('/upload')
  async createMatter() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const fileBuffer = stream.read();
    const { type, title = '', introduction = '' } = stream.fields;
    const token = await ctx.service.token.createToken();
    ctx.body = await ctx.service.matter.createMatter({
      file: {
        buffer: fileBuffer,
        length: fileBuffer.length,
        ...stream,
      },
      token,
      type: !!type,
      description: {
        title,
        introduction,
      },
    });
  }
  // 添加图文素材
  @Post('matterNews')
  async createMatterNews() {
    const { ctx } = this;
    const token = await ctx.service.token.createToken();
    const res = await ctx.service.matter.createMatterNews(
      token,
      ctx.request.body.articles,
    );
    ctx.body = res;
  }
  // 获取素材
  @Get('/matter')
  async fetchMatter() {
    const { ctx } = this;
    const { mediaId, type } = ctx.query;
    const isMedia = !!type;
    const token = await ctx.service.token.createToken();
    const res = await ctx.service.matter.fetchMatter(token, mediaId, isMedia);
    ctx.body = res;
  }

  // 删除永久素材
  @Post('/delleteMatter')
  async deleteMatter() {
    const { ctx } = this;
    const { mediaId } = ctx.request.body;
    const token = await ctx.service.token.createToken();
    const res = await ctx.service.matter.deleteMatter(token, mediaId);
    ctx.body = res;
  }

  // 修改图文素材
  @Post('/updateMatter')
  async updateMaterial() {
    const { ctx } = this;
    const token = await ctx.service.token.createToken();
    const res = await ctx.service.matter.updateMatter(token, ctx.request.body);
    ctx.body = res;
  }
  // 获取素材列表
  @Get('/getMatterList')
  async getMatterList() {
    const { ctx } = this;
    const { page, count, type } = ctx.query;
    const token = await ctx.service.token.createToken();
    const res = await ctx.service.matter.fetchMatterList({
      token,
      page,
      count,
      type,
    });
    ctx.body = res;
  }
}
