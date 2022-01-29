const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Featuring = require("../models/Featuring.model");
const Character = require("../models/Character.model");
const Review = require("../models/Review.model");
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
      res.render("books/books", { books, query: query });
    })
    .catch((e) => next(e));
});

router.get("/books/create", (req, res, next) => {
  Character.find()
    .then((characters) => {
      res.render("books/form", { characters });
    })
    .catch((e) => next(e));
});

router.post("/books/create", (req, res, next) => {
  console.log(req.body);
  if (!req.body.cover) {
    req.body.cover = undefined;
  }
  Book.create(req.body)
    .then((book) => {
      if (req.body.featuring) {
        if (!Array.isArray(req.body.featuring)) {
          req.body.featuring = [req.body.featuring];
        }
        const featurings = req.body.featuring.map((characterId) => ({
          characterId,
          bookId: book._id,
        }));
        return Featuring.insertMany(featurings).then(() =>
          res.redirect(`/books/${book._id}`)
        );
      } else {
        res.redirect(`/books/${book._id}`);
      }
    })
    .catch((e) => next(e));
});

router.get("/books/:id", (req, res, next) => {
  Book.findById(req.params.id)
    .populate("reviews")
    .populate({
      path: "featuring",
      populate: {
        path: "character",
      },
    })
    .then((book) => {
      res.render("books/book", { ...book.toJSON(), detail: true });
    })
    .catch((e) => next(e));
});

router.get("/books/:id/update", (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      res.render("books/form", book);
    })
    .catch((e) => next(e));
});

router.post("/books/:id/update", (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => {
      res.redirect(`/books/${book._id}`);
    })
    .catch((e) => next(e));
});

router.post("/books/:id/delete", (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/books");
    })
    .catch((e) => next(e));
});

router.get("/books/:id/delete", (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/books");
    })
    .catch((e) => next(e));
});

router.get("/characters/:id", (req, res, next) => {
  Character.findById(req.params.id)
    .populate({
      path: "featuring",
      populate: {
        path: "book",
      },
    })
    .then((character) => {
      res.render("character", character);
    })
    .catch((e) => next(e));
});

module.exports = router;
