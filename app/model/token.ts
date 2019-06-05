module.exports = app => {
  const mongoose = app.mongoose;
  const TokenSchema = new mongoose.Schema({
    name: String,
    access_token: String,
    expires_in: Number,
    refresh_token: String,
    openid: String,
    scope: String,
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

  TokenSchema.pre('save', function(next) {
    if (TokenSchema.isNew) {
      TokenSchema.meta.createAt = TokenSchema.meta.updateAt = Date.now();
    } else {
      TokenSchema.meta.updateAt = Date.now();
    }
    next();
  });

  return mongoose.model('t_token_table', TokenSchema);
};
