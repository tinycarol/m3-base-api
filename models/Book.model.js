const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

bookSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "bookId",
  localField: "_id",
});

bookSchema.virtual("featuring", {
  ref: "Featuring",
  localField: "_id",
  foreignField: "bookId"
});

const Book = model("Book", bookSchema);

module.exports = Book;
