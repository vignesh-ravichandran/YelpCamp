var express=require("express");

var middleware     =require("../middleware");


var router=express.Router({mergeParams:true});


var Campground  	=require("../models/campground"),
	 Comment     	=require("../models/comment");


router.get("/new",middleware.isLoggedIn,function(req,res){
	
	Campground.findById(req.params.id,function(err,campground){
		if(err){console.log(err);}else{
			res.render("comments/new",{campground: campground});
		}
	});
	
	
});

router.post("/",middleware.isLoggedIn,function(req,res){
	
	Campground.findById(req.params.id,function(err,campground){
		if(err){console.log(err);
			   res.redirect("campgrounds");
			   
			   }else{
			Comment.create(req.body.comment,function(err,comment){
				
				if(err){console.log(err);}else{
					
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					//console.log(req.user.username);
					//console.log(comment.author.username);
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
				
			}
						  
						  
						  );
		}
	});
	
	
	
});


router.get("/:commentsid/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.commentsid,function(err,foundcomment){
		if(err){res.redirect("back");}else{
				res.render("comments/edit",{campground_id: req.params.id,comment: foundcomment});
		}
	})
	

	
	
});


router.put("/:commentsid",middleware.checkCommentOwnership,function(req,res){
	
	Comment.findByIdAndUpdate(req.params.commentsid,req.body.comment,function(err,udpatedcomment){
		if(err){res.redirect("back");}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
	
	
})

router.delete("/:commentsid",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.commentsid,function(err){
		if(err){res.redirect("back");}else{
			
			res.redirect("/campgrounds/"+req.params.id);
			
		}
	});
});



	
	
	



module.exports=router;