var express=require("express");
var router=express.Router();

var passport    	=require("passport"),
	User        	=require("../models/user");


var middleware     =require("../middleware");

router.get("/", function(req, res){
    res.render("campgrounds/landing");
});




//auth routes
//register form
router.get("/register",function(req,res){
	res.render("register");
});

//signup logic
router.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){console.log(err);
				req.flash("error", err.message);
			   return res.redirect("/register");}
		
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
		
		
	});
	
});

//login form
router.get("/login",function(req,res){
	res.render("login");
});
//handling login logic
router.post("/login",passport.authenticate("local",{
	successRedirect :"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
	
});

//logout
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});



module.exports=router;