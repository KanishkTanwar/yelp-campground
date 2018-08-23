var express      = require("express"),
app              = express(),
mongoose         = require("mongoose"),
bodyParser       = require("body-parser"),
Campground       = require("./models/camps.js"),
seedDB           = require("./seeds.js"),
Comments         = require("./models/comments.js"),
User             = require("./models/user.js"),
passport         = require("passport"),
localStatergy    = require("passport-local"),
expressSession   = require("express-session"),
indexRoutes      = require("./routes/index"),
campgroundRoutes = require("./routes/campgrounds"),
commentRoutes    = require("./routes/comments"),
methodOveride    = require("method-override"),
flash            = require("connect-flash")

//console.log(process.env.MONGO_DATABASE)

mongoose.connect(process.env.MONGO_DATABASE,{ useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.use(methodOveride("_method"))
app.use(flash())

//Passport configuration
app.use(expressSession({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session());
passport.use(new localStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error")//error comes as a key from /islogin error is just a key which will be passed to template
   res.locals.success = req.flash("success")
   next();
});// this will pass req.user value in every template currentuser will be the context

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);///campgrounds means every routes will automatically append as /campgrounds in campgrounds
app.use("/campgrounds/:id/comments", commentRoutes);//id will not pass as a arg in comment because of shortening so mergeParams is required
app.listen(8000, function(){
  console.log("connected");
})
