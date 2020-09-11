const Campground = require("../models/campground")
const Comment = require("../models/comment")


let middlewareObj = {}

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		req.flash("error", "You need to login first!")
		res.redirect("/login");
	}
}

middlewareObj.isCampgroundAuthorized = (req, res, next) => {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCamp) => {
			if (err) {
				req.flash("error", "Campground not found!")
				res.redirect("back");
			} else {
				if (foundCamp.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have the permission!")
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to login first!")
		res.redirect("back");
	}
}

middlewareObj.isCommentAuthorized = (req, res, next) => {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.commentId, (err, foundComment) => {
			if (err) {
				req.flash("error", "Comment not found!")
				res.redirect("back");
			} else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have the permission!")
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to login first!")
		res.redirect("back");
	}
}


module.exports = middlewareObj