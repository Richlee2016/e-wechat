import { Controller } from 'egg';
import {Contro,Get} from '../router'
import {HomeIndexDto} from '../dto/home'
@Contro('/')
export default class HomeController extends Controller {
  @Get('/',[HomeIndexDto])
  public async main(){
    const ctx = this.ctx
    ctx.body = await ctx.service.test.sayHi('13245979')
  }
  @Get('/name')
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
  @Get('/home')
  public async home() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
