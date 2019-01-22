import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  static: true,
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks"
  },
  mongoose: {
    enable: true,
    package: "egg-mongoose"
  },
  redis: {
    enable: true,
    package: "egg-redis"
  }
};

export default plugin;
