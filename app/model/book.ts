module.exports = (app) => {
  const mongoose = app.mongoose;
  const BookSchema = new mongoose.Schema({
    _id: String,
    name: String,
    preid: String,
    id: String,
    author: String,
    newChapter: String,
    newChapterHref: String,
    status: String,
    update: String,
    context: String,
    chapters: [],
    list: [],
    meta: {
      createAt: {
        type: Date,
        default: Date.now()
      },
      updateAt: {
        type: Date,
        default: Date.now()
      }
    }
  });

  BookSchema.pre('save', function(this: any, next, ) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  const Book =  mongoose.model('t_book_table', BookSchema);
  return Book;
};
