import { Controller } from "egg";
import { Contro, Get,Post, Prefix } from "../router";
import {MovieVodsDto,MovieSearchDto} from '../dto/movie'
@Prefix(["movie"])
@Contro("/movie")
export default class MovieController extends Controller {
  @Get("/getvod/:id")
  public async getVod() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const res = await ctx.service.movie.getMovie(id);
      ctx.body = res;
    } catch (error) {
      console.log(error);
    }
  }
  @Get("/getvods",[MovieVodsDto])
  public async getTypeVod(){
    const {ctx} = this;
    const q = ctx.query;
    try {
        const res =await ctx.service.movie.getMovies(q)
        ctx.body = res
    } catch (error) {
        console.log(error);
    }
  }
  @Post('/search',[MovieSearchDto])
  public async searchMove(){
      const {ctx} = this;
      const q = ctx.request.body
      try {
          const res = await ctx.service.movie.searchMovie(q);
          ctx.body = res
      } catch (error) {
          console.log(error);
      }
  }
}
