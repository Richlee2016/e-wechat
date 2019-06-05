module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    _id: String,
    openid: String,
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

  UserSchema.pre('save', function(next) {
    if (UserSchema.isNew) {
      UserSchema.meta.createAt = UserSchema.meta.updateAt = Date.now();
    } else {
      UserSchema.meta.updateAt = Date.now();
    }
    next();
  });

  return mongoose.model('t_user_table', UserSchema);
};
