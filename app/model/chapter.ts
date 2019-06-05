module.exports = app => {
  const mongoose = app.mongoose;
  const ChapterSchema = new mongoose.Schema({
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    context: {
      type: Array,
      require: true,
    },
    meta: {
      createAt: {
        type: Date,
        default: Date.now(),
      },
      updateAt: {
        type: Date,
        default: Date.now(),
      },
    },
  });

  ChapterSchema.pre('save', function(this: any, next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  return mongoose.model('t_chapter_table', ChapterSchema);
};
