const express = require("express");
const router = express.Router();
const createError = require("http-errors");

router.get("/", (req, res, next) => {
  return res.render("index");
});

module.exports = router;
