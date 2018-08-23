var express   = require("express"),
router        = express.Router(),
Campground    = require("../models/camps"),
middlewareObj = require("../middleware");

router.get("/", function(req, res){
  Campground.find({},function(err, camps){
      if(err){
        console.log("error");
      } else {
        res.render("campgrounds/index", {campgrounds: camps});
      }
  })
});

router.post("/",middlewareObj.isLoggedIn,function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username,
  }
  Campground.create({name: name, image: image, description: desc, author: author, price: price}, function(err, allCampground){
    if(err){
      console.log("error");
    } else {
      res.redirect("/campgrounds");

    }
  })
});

router.get("/new", middlewareObj.isLoggedIn , function(req, res){
  res.render("campgrounds/new");

});

router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comment").exec(function(err, detail){
      if(err){
        console.log("error");
      } else {
        res.render("campgrounds/detail", {details: detail});
      }
  })
});
//****************************************
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCamps){
      if(err){
        console.log(err);
      } else {
          res.render("campgrounds/edit", {camps: foundCamps})
      }
  })
})


router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.blog, function(err, detail){
      if(err){
        res.redirect("/campgrounds")
      } else {
        res.redirect("/campgrounds/" + req.params.id)
      }
  })
});


router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err, detail){
      if(err){
        res.redirect("/campgrounds")
      }
      else{
        res.redirect("/campgrounds")
      }
  });
});

module.exports = router;
