import { Application } from "egg";
import * as _ from "lodash";
let MapRouter: any = [];
// const box:any = [
//   {
//     controller:'home',
//     path:'Home',
// middlewares:[],
//     methods:[
//       {
//         name:'index',
//         path:'name',
//         method:'get',
//         middlewares:[]
//       }
//     ]
//   }
// ]
export default (app: Application) => {
  const { controller, router } = app;
  const autoMids = app.config.autoMiddlware;
  MapRouter.forEach(r => {
    const cpath = r.path === "/" ? "" : r.path;
    const contro = controller[r.name];
    const cmiddlewares = r.middlewares;
    r.methods.forEach(m => {
      // console.log(m.method,r.path,m.path,(cpath+m.path).trim())
      // console.log('my middlewares===>',m.middlewares);
      const allMids = cmiddlewares.concat(m.middlewares);
      const initMids = initMiddleware(allMids, autoMids);
      const finllMids = initMids.concat(contro[m.name]);
      router[m.method]((cpath + m.path).trim(), ...finllMids);
    });
  });
};

/** 解析 内置 中间件 */
const initMiddleware = (ms, mids) => {
  if (ms.length === 0) return [];
  const handlMs = ms.map(o => {
    if (_.isString(o)) {
      return _.chain(mids)
        .find(m => m.name === o)
        .thru(mid => (mid ? mid.middlware(mid.opt) : ""))
        .value();
    } else if (_.isArray(o)) {
      if (o.length === 2) {
        return _.chain(mids)
          .find(m => m.name === o[0])
          .thru(mid => (mid ? mid.middlware(o[1] || mid.opt) : ""))
          .value();
      } else {
        return "";
      }
    } else if (_.isFunction(o)) {
      return o;
    } else {
      return "";
    }
  });
  return _.compact(handlMs);
};
/** 解析 controller 名称 */
const getControllerName = (name): string => {
  let controller: string = /(.+)Controller/.test(name) ? RegExp.$1 : name;
  return controller.toLowerCase();
};
/** 获取 controller 名称 */
export const Contro = (path: string, middlewares: any[] = []) => target => {
  let cname = getControllerName(target.name);
  MapRouter.forEach(o => {
    if (o.name === cname) {
      o.path = path;
      o.middlewares = middlewares;
    }
  });
};
/** 获取方法名称 并进行设置 */
const setRouter = (path: string, method: string, middlewares: any[] = []) => (
  target,
  name
) => {
  let cname = getControllerName(target.constructor.name);
  const isExist = MapRouter.some(o => o.name === cname);
  if (isExist) {
    MapRouter.forEach(o => {
      if (o.name === cname) {
        o.methods.push({ name, path, method, middlewares });
      }
    });
  } else {
    MapRouter.push({
      name: cname,
      methods: [{ name, path, method, middlewares }]
    });
  }
};
/** 请求方法 */
export const Get = (path: string, middlewares?: any[]) =>
  setRouter(path, "get", middlewares);
export const Post = (path: string, middlewares?: any[]) =>
  setRouter(path, "post", middlewares);
