// Packages
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR:", err.message);
});
// End Packages


// Models
const seedDB = require("./seeds");
const User = require("./models/user");
// End Models


// App
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret: "YelpCamp user authentication",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.error = req.flash("error");
	next();
});
// End App


// Routes
const indexRoutes = require("./routes/index");
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
// End Routes


// App Listener
const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log(`App has started on PORT ${port}`);
});
// End App Listener