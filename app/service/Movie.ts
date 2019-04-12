import { Service } from "egg";
import { SearchMovie } from "../interface/movie.interface";
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
    let { page = 1, size = 10 } = q;
    let query: Array<any> = [{ id: { $exists: true } }];
    for (let [key, val] of Object.entries(q)) {
      let data = {};
      if (!["page", "size"].includes(key)) {
        data[key] = val;
        query.push(data);
      }
    }
    let skip = (page - 1) * size;
    let search = {
      name: { $ne: "none" },
      $and: query
    };
    try {
      const counts = await ctx.model.Movie.countDocuments(search).exec();
      const movielist = await ctx.model.Movie.find(search, {
        name: 1,
        year: 1,
        img: 1,
        cover: 1
      })
        .sort({ _id: -1 })
        .limit(size)
        .skip(skip)
        .exec();

      return {
        list: movielist,
        count: counts
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
    let { keyword, page = 1, size = 10 } = q;
    let reg = new RegExp(keyword);
    let query: any = {
      $or: [{ name: { $regex: reg } }]
    };
    if (keyword.length >= 2) {
      query["$or"].concat([
        { actor: { $regex: reg } },
        { director: { $regex: reg } }
      ]);
    }
    let skip = (page - 1) * size;
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
