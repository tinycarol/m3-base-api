require("dotenv").config();
require("../config/db.config");
const Book = require("../models/Book.model");
const sandersonBooks = require("../data/sanderbooks.json");
const faker = require("faker");

const books = [...sandersonBooks];
for (let i = 0; i < 20; i++) {
  books.push({
    title: faker.lorem.words(3 + Math.floor(Math.random() * 3)),
    description: faker.lorem.paragraphs(1 + Math.floor(Math.random() * 3)),
    author: faker.name.findName(),
    year: 1800 + Math.floor(Math.random() * 222),
  });
}

Book.deleteMany()
  .then(() => Book.insertMany(books))
  .then((books) => books.map((book) => console.log(book.title)))
  .finally(() => {
    process.exit();
  });
