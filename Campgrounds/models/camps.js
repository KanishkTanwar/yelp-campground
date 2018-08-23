var mongoose = require("mongoose")

var yelpSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    price: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      
      username: String
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  });

module.exports = mongoose.model("Campground", yelpSchema);
