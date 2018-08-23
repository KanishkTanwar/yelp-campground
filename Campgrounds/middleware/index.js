var Campground = require("../models/camps")
var Comments= require("../models/comments.js")

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to login to do that")
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCamps){
        if(err){
          req.flash("error", "Campground not found")
        } else {
          if(foundCamps.author.id.equals(req.user._id)){// why not just do === because foundCamps.author.id this is moongoose object and other is just string == may works
            next();
          } else {
            req.flash("error", "You dont have Permission to do that")
            res.redirect("back")
          }
        }
    })
} else {
  req.flash("error", "You need to be logged in to do that")
  res.redirect("back")// just send users where they were before
}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comments.findById(req.params.comment_id, function(err, foundComments){
        if(err){
          req.flash("error", "Campground not found")
        } else {
          if(foundComments.author.id.equals(req.user._id)){// why not just do === because foundCamps.author.id this is moongoose object and other is just string == may works
            next();
          } else {
            req.flash("error", "You don't have Permission to do that")
            res.redirect("back")
          }
        }
    })
  } else {
    res.redirect("back")// just send users where they were before
  }
}

module.exports = middlewareObj
