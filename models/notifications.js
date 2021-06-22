var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotificationSchema = new Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId,ref:'User', required: true },
    location:{type:mongoose.Schema.Types.Mixed,required:true},
    message:{type:mongoose.Schema.Types.String,required:false},
    severity:{type:mongoose.Schema.Types.String,required:true},
    forDate:{type:mongoose.Schema.Types.Date,required:true}
  },
  {
    timestamps: true,
  }
);

var Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
