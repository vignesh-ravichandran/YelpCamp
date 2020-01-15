var Campground  	=require("../models/campground"),
	 Comment     	=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCommentOwnership=function(req,res,next){
	
	
	if(req.isAuthenticated()){
		Comment.findById(req.params.commentsid, function(err,foundComment){
		if(err){
			res.redirect("back");
		}else{
			
			if(foundComment.author.id.equals(req.user._id)){
			next(); }else{
				res.redirect("back");
			}
			
		}
	})
	}else{
		res.redirect("back");
	}

}


middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to perform this");
	res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership=function(req,res,next){
	
	
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			req.flash("error","Campground can't be found");
			res.redirect("back");
		}else{
			
			if(foundCampground.author.id.equals(req.user._id)){
			next(); }else{
				req.flash("error","You are not permitted");
				res.redirect("back");
			}
			
		}
	})
	}else{
		req.flash("error","You need to be logged in ");
		res.redirect("back");
	}
	
	
	
	
}
	


module.exports=middlewareObj;