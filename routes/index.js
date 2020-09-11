const express = require("express");
const router = express.Router();
const passport = require("passport");


// Models
const User = require("../models/user");
// End Models


// Root Route
router.get("/", (req, res) => {
	res.render("landing");
});
// End Root Route


// Authentication Routes
router.get("/register", (req, res) => {
	res.render("register")
});
router.post("/register", (req, res) => {
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			req.flash("error", err.message)
			res.redirect("register");
		} else{
			passport.authenticate("local")(req, res, () => {
				res.redirect("/campgrounds");
			});
		}
	});
});
router.get("/login", (req, res) => {
	res.render("login");
});
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res) => {

});
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/campgrounds");
});
// End Authentication Routes

module.exports = router;