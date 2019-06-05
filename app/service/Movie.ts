import { Service } from 'egg';
import { SearchMovie } from '../interface/movie.interface';
export default class Movie extends Service {
  // 获取单个电影
  public async getMovie(id: string | number) {
    const { ctx } = this;
    try {
      const movie = await ctx.model.Movie.findOne({ id }).exec();
      return movie;
    } catch (error) {
      console.log(error);
    }
  }
  // 根据url参数 筛选电影
  public async getMovies(q: SearchMovie) {
    const { ctx } = this;
    const { page = 1, size = 10 } = q;
    const query: any[] = [{ id: { $exists: true } }];
    for (const [key, val] of Object.entries(q)) {
      const data = {};
      if (!['page', 'size'].includes(key)) {
        data[key] = val;
        query.push(data);
      }
    }
    const skip = (page - 1) * size;
    const search = {
      name: { $ne: 'none' },
      $and: query,
    };
    try {
      const counts = await ctx.model.Movie.countDocuments(search).exec();
      const movielist = await ctx.model.Movie.find(search, {
        name: 1,
        year: 1,
        img: 1,
        cover: 1,
      })
        .sort({ _id: -1 })
        .limit(size)
        .skip(skip)
        .exec();

      return {
        list: movielist,
        count: counts,
      };
    } catch (error) {
      console.log(error);
    }
  }
  // 搜索电影
  public async searchMovie(q: {
    keyword: string;
    page?: number;
    size?: number;
  }) {
    const { ctx } = this;
    const { keyword, page = 1, size = 10 } = q;
    const reg = new RegExp(keyword);
    const query: any = {
      $or: [{ name: { $regex: reg } }],
    };
    if (keyword.length >= 2) {
      query['$or'].concat([
        { actor: { $regex: reg } },
        { director: { $regex: reg } },
      ]);
    }
    const skip = (page - 1) * size;
    try {
      const counts = await ctx.model.Movie.countDocuments(query).exec();
      const list = await ctx.model.Movie.find(query)
        .sort({ _id: -1 })
        .limit(size)
        .skip(skip)
        .exec();
      return { counts, list };
    } catch (error) {
      console.log(error);
    }
  }
}
