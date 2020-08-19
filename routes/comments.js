const express = require("express");
const router = express.Router();

// Models
const Campground = require("../models/campground");
const Comment = require("../models/comment");
// End Models


// Middlewares
const middleware = require("../middlewares")
// End Middlewares


// Comments Routes
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {campground: campground});
		}
	});
});
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		console.log(campground)
		if(err){
			req.flash("error", "Something went wrong!")
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment, (err, comment) => {
				if(err){
					console.log(err);
				} else{
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// Save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect(`/campgrounds/${campground._id}`);
				}
			});
		}
	});
});
router.get("/campgrounds/:id/comments/:commentId/edit", middleware.isCommentAuthorized, (req, res) => {
	Comment.findById(req.params.commentId, (err, foundComment) => {
		if(err){
			res.redirect("back");
		} else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
		}
	});
});
router.put("/campgrounds/:id/comments/:commentId", middleware.isCommentAuthorized, (req, res) => {
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
		if (err) {
			res.redirect("back");
		} else {
			res.redirect(`/campgrounds/${req.params.id}`)
		}
	});
});
router.delete("/campgrounds/:id/comments/:commentId", middleware.isCommentAuthorized, (req, res) => {
	Comment.findByIdAndDelete(req.params.commentId, (err) => {
		if(err){
			res.redirect("back");
		} else{
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});
// End Comments Routes

module.exports = router;