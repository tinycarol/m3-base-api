const express = require("express");
const hbs = require("hbs");
const createError = require("http-errors");
const logger = require("morgan");
const mongoose = require("mongoose");
require("./config/db.config");

const app = express();

app.use(logger("dev"));
app.use(express.static("public"));

// creates an absolute path pointing to a folder called "views"
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

const routes = require("./config/routes");

// Router
app.use(routes);

// Default route, forward 404 to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler handler
app.use(function (error, req, res, next) {
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Resource not found");
  } else if (error.message.includes("E11000")) {
    error = createError(400, "Already exists");
  } else if (!error.status) {
    error = createError(500, error);
  }

  if (error.status >= 500) {
    console.error(error);
  }

  const data = {};
  data.status = error.status;
  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce(
        (errors, key) => ({
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        }),
        {}
      )
    : undefined;

  res.status(error.status).render("error", data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀`);
});
