import { Controller } from 'egg';
import { MovieSearchDto, MovieVodsDto } from '../dto/movie';
import { Contro, Get, Post, Prefix } from '../router';
@Prefix(['movie'])
@Contro('/movie')
export default class MovieController extends Controller {
  @Get('/getvod/:id')
  public async getVod() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.movie.getMovie(id);
    ctx.body = res;
  }
  @Get('/getvods', [MovieVodsDto])
  public async getTypeVod() {
    const { ctx } = this;
    const q = ctx.query;
    const res = await ctx.service.movie.getMovies(q);
    ctx.body = res;
  }
  @Post('/search', [MovieSearchDto])
  public async searchMove() {
    const { ctx } = this;
    const q = ctx.request.body;
    const res = await ctx.service.movie.searchMovie(q);
    ctx.body = res;
  }
}
