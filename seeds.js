const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const seeds = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1490452322586-70484206da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in elit sit amet erat cursus faucibus. Mauris eget suscipit massa, id tincidunt enim. Maecenas semper eros id porta sodales. In id sem nunc. Vivamus euismod, nunc in placerat semper, lorem dolor accumsan mauris, at sollicitudin metus turpis quis tellus. Cras feugiat, elit elementum tempor venenatis, velit purus bibendum nisi, non auctor purus felis ac leo. Aliquam eget finibus purus. Nunc lacinia neque et augue semper, a elementum velit congue. Etiam vel lorem arcu. Pellentesque molestie quam purus, a efficitur felis dapibus et. Nunc sodales nulla nec nisi volutpat, nec tempor."
	},
	{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in elit sit amet erat cursus faucibus. Mauris eget suscipit massa, id tincidunt enim. Maecenas semper eros id porta sodales. In id sem nunc. Vivamus euismod, nunc in placerat semper, lorem dolor accumsan mauris, at sollicitudin metus turpis quis tellus. Cras feugiat, elit elementum tempor venenatis, velit purus bibendum nisi, non auctor purus felis ac leo. Aliquam eget finibus purus. Nunc lacinia neque et augue semper, a elementum velit congue. Etiam vel lorem arcu. Pellentesque molestie quam purus, a efficitur felis dapibus et. Nunc sodales nulla nec nisi volutpat, nec tempor."
	},
	{
		name: "Canyon Floor",
		image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in elit sit amet erat cursus faucibus. Mauris eget suscipit massa, id tincidunt enim. Maecenas semper eros id porta sodales. In id sem nunc. Vivamus euismod, nunc in placerat semper, lorem dolor accumsan mauris, at sollicitudin metus turpis quis tellus. Cras feugiat, elit elementum tempor venenatis, velit purus bibendum nisi, non auctor purus felis ac leo. Aliquam eget finibus purus. Nunc lacinia neque et augue semper, a elementum velit congue. Etiam vel lorem arcu. Pellentesque molestie quam purus, a efficitur felis dapibus et. Nunc sodales nulla nec nisi volutpat, nec tempor."
	}
];


const seedDB = async () => {
	// Remove all campgrounds
	await Campground.deleteMany({}, (err) => {
		if(err){
			throw err;
		} else{
			console.log("Removed campgrounds");
		}
	});
	await Comment.deleteMany({}, (err) => {
		if(err){
			throw err;
		} else{
			console.log("Removed comments")
		}
	})

	// Add some new campgrounds
	for(const seed of seeds){
		await Campground.create(seed, (err, campground) => {
			if(err){
				throw err;
			} else{
				console.log("ADDED A NEW CAMPGROUND!");
				// Add some new comments
				Comment.create({
					text: "This place is great but, I wish there was INTERNET.",
					author: "Homer"
				}, (err, comment) => {
					if(err){
						throw err;
					} else{
						campground.comments.push(comment);
						campground.save();
						console.log("ADDED A NEW COMMENT");
					}
				})
			}
		})
	}
}

module.exports = seedDB;