import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
import cacheMid from "../app/middleware/cache";
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1547024757636_1700";

  // add your egg config in here
  config.middleware = [];

  //csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  };
  //mongodb
  config.mongoose = {
    url: "mongodb://localhost:27017/eggapi",
    options: {}
  };
  //redis
  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "auth",
      db: 0
    }
  };
  //内置 middlware
  config.autoMiddlware = [
    {
      name: "@cache",
      middlware: cacheMid,
      opt: {}
    }
  ];
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    xmBook: {
      prefix: "http://dushu.xiaomi.com",
      cookie:
        "uLocale=zh_CN; Hm_lvt_a1d10542fc664b658c3ce982b1cf4937=1489720605,1489996190,1490060009,1490144056; Hm_lpvt_a1d10542fc664b658c3ce982b1cf4937=1490144059; app_id=mi_wap; build=8888; device_id=D950FH275FLEFLJX; user_type=2; device_hash=76dc2d8d805f607f7e10f8596e06730a; user_id=1236127735; token=s4xOpaiEvnQH-8h_y541nhFPb6E-Nf3j_8ZBQDTS5gYkuzGxs5cko2iW-tJ9Mvl8"
    }
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
