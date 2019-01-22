import { Controller } from 'egg';
import {Contro,Get,Post} from '../router'

@Contro('/book')
export default class BookController extends Controller {
  @Get('/home',['@cache'])
  public async home(){
    const {ctx} = this
    ctx.body = await ctx.service.book.fetchHome()
  }
  @Get('/falls',['@cache'])
  public async falls(){
    const {ctx} = this
    const {start,count} = ctx.query;
    ctx.body = await ctx.service.book.fetchFalls(start,count)
  }
  @Post('/proxy',['@cache'])
  public async proxy(){
    const {ctx} = this
    const {url,data,method} =ctx.request.body
    // const isQuery = /(.+)\?(.+)/.test(url)
    // let baseUrl = url
    // if(isQuery){
    //   baseUrl = `${RegExp.$1}${params || ""}?${RegExp.$2}`.trim()
    // }else{
    //   baseUrl = (url + params || "").trim() 
    // }
    ctx.body = await ctx.service.book.bookProxy(method,url,data)
  }
}
