module.exports = app => {
  const mongoose = app.mongoose;
  const MovieSchema = new mongoose.Schema({
    _id: Number,
    id: Number,
    name: String,
    score: Number,
    area: String,
    othername: String,
    year: Number,
    img: String,
    cover: String,
    isFinish: String,
    imdb: String,
    catalog: [String],
    classify: [String],
    actor: [String],
    director: [String],
    intro: String,
    url: [[]],
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

  MovieSchema.pre('save', function(this: any, next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  const Book = mongoose.model('t_movie_home', MovieSchema);
  return Book;
};
