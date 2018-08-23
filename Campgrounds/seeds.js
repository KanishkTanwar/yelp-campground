var mongoose = require("mongoose"),
Campground = require("./models/camps.js")
Comments = require("./models/comments.js")

camps = [
  {
    name: "Nighty Night",
    image: "https://www.photosforclass.com/download/pixabay-1208201?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f3c67da7eeb6b8_960.jpg&user=Free-Photos",
    description: "good place 5/5 must visit",
  },

  {
    name: "Down To Earth",
    image: "https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f3c67da7eeb6b8_960.jpg&user=Pexels",
    description: "jebridi jebish",
  },

  {
    name: "On Fire",
    image: "https://www.photosforclass.com/download/flickr-252428248",
    description: "nice place go and enjoy",
  }
]
function seedDB(){
  Campground.remove({},function(err){
    // if(err){
    //   console.log(err);
    // } else {
    //   camps.forEach(function(camp){
    //     Campground.create(camp, function(err, addedCamps){
    //         if(err){
    //           console.log("error");
    //         } else {
    //           console.log("CAMPS ADDED");
    //           Comments.create(
    //             {
    //               author: "Kan",
    //               text: "Fuck You same Comment"
    //             }, function(err, addedComment){
    //               if(err){
    //                 console.log(err);
    //               } else {
    //                 addedCamps.comment.push(addedComment);
    //                 addedCamps.save();
    //                 console.log("Comments added");
    //               }
    //             })
    //         }
    //     })
    //   })
    //    console.log("Removed every thing from database");
    // }
  })
}
module.exports = seedDB;
