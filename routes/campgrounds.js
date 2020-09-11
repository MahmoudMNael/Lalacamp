const express = require("express");
const router = express.Router();


// Models
const Campground = require("../models/campground");
// End Models


// Middlewares
const middleware = require("../middlewares")
// End Middlewares


// Campgrounds Routes
router.get("/campgrounds", (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, (err, campgrounds) => {
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});
router.post("/campgrounds", middleware.isLoggedIn, (req, res) => {
	// get data from the form and push it to "campgrounds"
	const name = req.body.name;
	const image = req.body.image;
	const description = req.body.description;
	const price = req.body.price;
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	const newCampground = {name: name, image: image, price: price, description: description, author: author};
	// Create a new campground and save to DB
	Campground.create(newCampground, (err, newItem) => {
		if(err){
			req.flash("error", "Something went wrong!")
		} else{
			// redirect to campgrounds page
			res.redirect("/campgrounds");
			console.log(`NEWLY CREATED ITEM: ${newItem}`);
		}
	});
});
router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});
router.get("/campgrounds/:id", (req, res) => {
	// Find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
		if(err){
			console.log(err);
		} else{
			// Render show template with that campground
			res.render("campgrounds/show", {campground: campground});
		}
	});
});
router.get("/campgrounds/:id/edit", middleware.isCampgroundAuthorized, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/edit", {campground: foundCamp})
		}
	});
});
router.put("/campgrounds/:id", middleware.isCampgroundAuthorized,(req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.camp, (err, updatedCamp) => {
		if(err){
			console.log("err");
		} else{
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});
router.delete("/campgrounds/:id", middleware.isCampgroundAuthorized,(req, res) => {
	Campground.findByIdAndDelete(req.params.id, (err) => {
		if(err){
			console.log(err);
			res.redirect(`/campgrounds/${req.params.id}`);
		} else{
			res.redirect("/campgrounds");
		}
	});
});
// End Campgrounds Routes

module.exports = router;