const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const stream_routes = require("./routes/stream");
const student_routes = require("./routes/student");


const HttpError = require("./models/http-error");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST, GET, PUT, PATH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use(stream_routes);
app.use(student_routes);

app.use((req, res, next) => {
	const error = new HttpError("Could not find this route", 404);
	throw error;
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res
		.status(error.code || 500)
		.json({ Error: error.message || "An unkown error has occurred" });
});

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then((result) => {
		app.listen(5000, () => {
			console.log(`Server is running at ${process.env.SERVER}`);
		});
	})
	.catch((e) => {
		console.log(e);
	});
