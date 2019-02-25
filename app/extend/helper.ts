// import { Context } from 'egg';
import { isObject } from 'lodash';
import * as Crawler from '../declare/crawler/index'
export default{
  setNum(data) {
    if (isObject(data)) return data;
    for (const key in data) {
      const val = data[key];
      if (!isNaN(val)) {
        data[key] = Number(val);
      }
      if (isObject(val)) {
        this.setNum(val);
      }
    }
    return data;
  },
  Crawler(){ return Crawler }
};
