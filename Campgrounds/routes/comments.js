var express = require("express"),
router      = express.Router({mergeParams: true}),// as we are shortening routes here by defining in app file :id is not passing here to pass use mergeParams
Comments  = require("../models/comments"),
Campground  = require("../models/camps");
middlewareObj = require("../middleware");

router.get("/new",middlewareObj.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, detail){
      if (err){
        console.log(err);
      } else {
        res.render("comments/new",{details:detail})
      }
  })
})

router.post("/",middlewareObj.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, camps){
    if (err){
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      Comments.create(req.body.comments, function(err, comment){
        if(err){
          req.flash("error", "something went wrong")
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save()
          camps.comment.push(comment)
          camps.save();
          req.flash("success", "successfully added comment")
          res.redirect("/campgrounds/" + camps._id )
        }
      })
    }
  })
})

router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
  Comments.findById(req.params.comment_id, function(err, foundComments){
      if(err){
        console.log(err);
      } else {
          res.render("comments/edit", {details: foundComments, id: req.params.id})
      }
  })
})


router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
  Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, detail){
      if(err){
        res.redirect("/campgrounds")
      } else {
        res.redirect("/campgrounds/" + req.params.id)
      }
  })
});


router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
  Comments.findByIdAndRemove(req.params.comment_id, function(err, detail){
      if(err){
        res.redirect("/campgrounds")
      }
      else{
        req.flash("success", "comment deleted")
        res.redirect("/campgrounds/" + req.params.id)
      }
  });
});

module.exports = router;
