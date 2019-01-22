// import { Context } from 'egg';
import { isObject } from "lodash";
export default{
  setNum(data) {
    if (isObject(data)) return data;
    for (let key in data) {
      const val = data[key];
      if (!isNaN(val)) {
        data[key] = Number(val);
      }
      if (isObject(val)) {
        this.setNum(val);
      }
    }
    return data;
  }
};
