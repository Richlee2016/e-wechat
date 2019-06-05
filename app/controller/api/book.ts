import { Controller } from 'egg';
import { Contro, Get, Prefix } from '../../router';

@Prefix(['api', 'book'])
@Contro('/book')
export default class ApiBookController extends Controller {
  @Get('/my')
  public async my() {
    this.ctx.body = 2;
  }
  @Get('myqqq')
  public async my1() {
    this.ctx.body = 2;
  }
}
