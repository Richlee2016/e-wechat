import { Controller } from 'egg';
import * as Dto from '../dto/book';
import { Contro, Get, Post, Prefix } from '../router';
@Prefix(['book'])
@Contro('/book')
export default class BookController extends Controller {
  @Get('/home', ['@cache'])
  public async home() {
    const { ctx } = this;
    ctx.body = await ctx.service.book.fetchHome();
  }
  @Get('/falls', [Dto.BookFallsDto, '@cache'])
  public async falls() {
    const { ctx } = this;
    const { start, count } = ctx.query;
    ctx.body = await ctx.service.book.fetchFalls(start, count);
  }
  @Post('/proxy', [Dto.BookProxyDto, '@cache'])
  public async proxy() {
    const { ctx } = this;
    const { url, data, method } = ctx.request.body;
    ctx.body = await ctx.service.book.bookProxy(method, url, data);
  }
  @Get('/search', [Dto.BookSearchDto, ['@cache', { time: 60 * 60 * 2 }]])
  public async search() {
    const { ctx } = this;
    const { q } = ctx.query;
    ctx.body = await ctx.helper.Crawler().bookSearch(q);
  }
  @Get('/chapter', [Dto.BookChapterDto])
  public async chapter() {
    const { ctx } = this;
    const { type, chapter } = ctx.query;
    ctx.body = await ctx.service.book.freeBookChapter(type, chapter);
  }
  @Get('/context', [Dto.BookContextDto])
  public async context() {
    const { ctx } = this;
    const { type, chapter, id } = ctx.query;
    ctx.body = await ctx.service.book.freeBookContext(type, chapter, id);
  }
}
