const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
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
  cover: {
    type: String,
    default:
      "https://lingopolo.org/thai/sites/lingopolo.org.thai/files/styles/entry/public/images/2016/08/22/book.jpg",
  },
  year: {
    type: Number,
    required: true,
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
