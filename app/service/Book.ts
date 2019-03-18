import { Service } from "egg";
import * as _ from "lodash";
/**
 * 书籍
 */
export default class Book extends Service {
  public commonOpt: any = { method: "GET", dataType: "json" };
  /** 请求书城主页 */
  public async fetchHome() {
    const { ctx, app } = this;
    const { xmBook } = app.config;
    try {
      const res = await ctx.curl(
        `${xmBook.prefix}/hs/v3/channel/418`,
        this.commonOpt
      );
      const [banner, hot, recommend, boy, girl, free, topic] = res.data.items;
      return {
        banner: this._homeBanner(banner),
        hot: this._homeListVod(hot),
        recommend: this._homeRecommend(recommend),
        boy: this._homeListVod(boy),
        girl: this._homeListVod(girl),
        free: this._homeFree(free),
        topic: this._homeTopic(topic)
      };
    } catch (error) {
      console.log(error);
    }
  }
  /** 瀑布流 */
  public async fetchFalls(start: number, count: number) {
    const { ctx, app } = this;
    const { xmBook } = app.config;
    const opt = Object.assign(this.commonOpt, {
      headers: { Cookie: xmBook.cookie }
    });
    try {
      const res = await ctx.curl(
        `${xmBook.prefix}/rock/book/recommend?start=${start}&count=${count}`,
        opt
      );
      return this._vodData(res.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  /** 代理 */
  public async bookProxy(
    method: "GET" | "POST" = "GET",
    url: string,
    data?: any
  ) {
    const { ctx, app } = this;
    const { xmBook } = app.config;
    const opt: any = {
      method,
      headers: { Cookie: xmBook.cookie },
      dataType: "json"
    };
    if (method === "POST" && data) {
      opt.data = data;
    }
    try {
      console.log(`${xmBook.prefix}${url}`, opt);
      const res = await ctx.curl(`${xmBook.prefix}${url}`, opt);
      let dataRes: any = null;
      // home page
      if (url === "/hs/v3/channel/418") {
        const [banner, hot, recommend, girl, boy, free, topic] = res.data.items;
        dataRes = {
          banner: this._homeBanner(banner),
          hot: this._homeListVod(hot),
          recommend: this._homeRecommend(recommend),
          boy: this._homeListVod(boy),
          girl: this._homeListVod(girl),
          free: this._homeFree(free),
          topic: this._homeTopic(topic)
        };
        return dataRes;
      }
      // base page
      if (url.includes("/store/v0/fiction/list/")) {
        dataRes = this._bannerHandle(res.data);
      } else if (url.includes("/hs/v3/channel/")) {
        dataRes = this._channelHandle(res.data);
      } else if (url.includes("/hs/v0/android/store/category")) {
        dataRes = this._categoryHandle(res.data);
      } else if (url.includes("/store/v0/ad/ranks")) {
        dataRes = this._rankHandle(res.data);
      } else if (url.includes("/store/v0/ad/persistent")) {
        dataRes = this._recomendHandle(res.data);
      } else if (
        url.includes("/store/v0/fiction/category/") ||
        url.includes("/store/v0/fiction/rank")
      ) {
        dataRes = this._vodData(res.data.items);
      } else if (url.includes("/hs/v0/android/fiction/book/")) {
        dataRes = {
          detail: this._vodData([res.data.item]),
          authorBook: this._vodData(res.data.author_books)
        };
      }
      return dataRes;
    } catch (error) {
      console.log(error);
    }
  }
  /** 免费章节 获取 储存 更新 */
  public async freeBookChapter(type: number, chapter: number) {
    const { ctx } = this;
    try {
      const theBook = await ctx.model.Book.findOne({ _id: chapter }).exec();
      if (theBook) {
        // 章节缓存一天
        if (
          (Date.now() - new Date(theBook.meta.updateAt).getTime() > 1000 * 60 * 60 * 24)&& theBook.status === '连载'
        ) {
          const fetchChpater = await ctx.helper
            .Crawler()
            .bookChapter(type, chapter);
          const _theBook =Object.assign(theBook,fetchChpater);
          console.log(_theBook);
          await _theBook.save();
          return fetchChpater.chapters;
        }
        return theBook.chapters;
      } else {
        const fetchChpater = await ctx.helper
          .Crawler()
          .bookChapter(type, chapter);
        const _theBook = new ctx.model.Book(
          Object.assign(fetchChpater, {
            _id: chapter
          })
        );
        await _theBook.save();
        return fetchChpater.chapters;
      }
    } catch (error) {}
  }
  /** 免费阅读 储存 */
  public async freeBookContext(type: number, chapter: number, id: number) {
    const { ctx } = this;
    try {
      const theChapter = await ctx.model.Chapter.findOne({id:`${chapter}&${id}`}).exec()
      if(!theChapter){
        console.log('find new chapter');
        const res = await ctx.helper.Crawler().bookContext(type,chapter,id)
        const _chapter = new ctx.model.Chapter({
          id:`${chapter}&${id}`,
          title:res.title,
          context:res.context
        });
        await _chapter.save()
        return res
      }
      return theChapter
    } catch (error) {
      
    }
  }
  /** */
  /** 主页处理函数 */
  private _vodData(data) {
    return data.map((o: any) => {
      return {
        id: o.fiction_id,
        cover: o.cover,
        title: o.title,
        authors: o.authors,
        categories: o.categories,
        chapterCount: o.chapter_count,
        click: o.click,
        finish: o.finish,
        latestCreated: o.latest_created,
        tags: o.new_tags,
        rights: o.rights,
        score: o.score,
        summary: o.summary,
        wordCount: o.word_count
      };
    });
  }
  private _homeBanner({ data: { data } }) {
    return _.chain(data)
      .take(2)
      .map((o: any) => {
        return {
          img: o.ad_pic_url,
          referenceId: o.reference_id
        };
      });
  }
  private _homeListVod(item) {
    return {
      list: this._vodData(item.data.data),
      referenceId: item.reference_id
    };
  }
  private _homeRecommend(item) {
    const list = this._vodData(item.data.data);
    return {
      list: _.chunk(list, 15),
      referenceId: item.reference_id
    };
  }
  private _homeFree(item) {
    const list = item.data.data.map((o: any) => {
      return {
        id: o.data.fiction_id,
        cover: o.data.book_cover,
        title: o.ad_name
      };
    });
    return {
      list,
      referenceId: item.reference_id
    };
  }
  private _homeTopic(item) {
    const list = item.data.data.map((o: any) => {
      return {
        img: o.ad_pic_url,
        referenceId: o.reference_id
      };
    });
    return {
      list,
      referenceId: item.reference_id
    };
  }
  /** banner 处理 */
  private _bannerHandle(data) {
    const { label,banner, description, items } = data;
    return {
      label,
      banner,
      description,
      list: this._vodData(items)
    };
  }
  /** 频道处理 */
  private _channelHandle(data) {
    const { ad_setting_name, items } = data;
    const group = items.map(o => {
      const { reference_id, ad_name, data } = o;
      return {
        referenceId: reference_id,
        name: ad_name,
        list: this._vodData(data.data)
      };
    });
    return {
      title: ad_setting_name,
      list: group
    };
  }
  /** 分类 */
  private _categoryHandle(data) {
    const { male, female } = data;
    const mapList = items => {
      return items.map(o => {
        const {
          category_id,
          children,
          fiction_count,
          label,
          new_image,
          new_image2
        } = o;
        return {
          id: category_id,
          name: label,
          children,
          count: fiction_count,
          cover1: new_image,
          cover2: new_image2
        };
      });
    };
    return {
      male: mapList(male),
      female: mapList(female)
    };
  }
  /** 排行 */
  private _rankHandle(data) {
    const { items } = data;
    const group = items.slice(18, items.length);
    return group.map(o => {
      const { cover, description, name, ranks } = o;
      return {
        id: ranks,
        cover,
        name,
        description: description.split("\n")
      };
    });
  }
  /** 专题 请求 */
  private _recomendHandle(data) {
    const { items } = data;
    return items.map(o => {
      const { ad_copy, ad_name, ad_pic_url, reference_id } = o;
      return {
        id: reference_id,
        name: ad_name,
        cover: ad_pic_url,
        description: ad_copy
      };
    });
  }
}
