var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
    "first_name":{
        type:String,
    },
    "last_name":{
        type:String
    },
    "notifications":{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Notification'
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);