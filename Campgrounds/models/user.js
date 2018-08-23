var mongoose = require("mongoose"),
     passportLocalMongoose = require("passport-local-mongoose")

var authSchema = new mongoose.Schema(
  {
    username: String,
    password: String
  }
)
authSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", authSchema)
