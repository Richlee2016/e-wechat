module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const MessageSchema = new mongoose.Schema({
    MsgType: String,
    Content: String,
    ToUserName: String,
    Reply: Mixed,
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

  MessageSchema.pre("save", function(next) {
    if (MessageSchema.isNew) {
      MessageSchema.meta.createAt = MessageSchema.meta.updateAt = Date.now();
    } else {
      MessageSchema.meta.updateAt = Date.now();
    }
    next();
  });




  return mongoose.model("t_reply_table", MessageSchema);
};
