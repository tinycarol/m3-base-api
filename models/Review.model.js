const { Schema, model, SchemaTypes } = require("mongoose");

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  bookId: {
    type: SchemaTypes.ObjectId,
    ref: "Book",
    required: true,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
