const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Book = require("../models/Book.model");

router.get("/", (req, res, next) => {
  Book.find()
    .limit(5)
    .then((books) => {
      res.render("index", { books });
    })
    .catch((e) => next(e));
});

router.get("/books", (req, res, next) => {
  const query = req.query.search || "";
  Book.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
    ],
  })
    .then((books) => {
      res.render("books", { books, query: query });
    })
    .catch((e) => next(e));
});

router.get("/books/:id", (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      res.render("book", { ...book.toJSON(), detail: true });
    })
    .catch((e) => next(e));
});

module.exports = router;
