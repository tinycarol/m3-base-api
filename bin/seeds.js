require("dotenv").config();
require("../config/db.config");
const Book = require("../models/Book.model");
const Review = require("../models/Review.model");
const Character = require("../models/Character.model");
const Featuring = require("../models/Featuring.model");
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

const characters = [];
for (let i = 0; i < 500; i++) {
  characters.push({
    name: faker.name.findName(),
  });
}

Promise.all([
  Book.deleteMany(),
  Review.deleteMany(),
  Character.deleteMany(),
  Featuring.deleteMany(),
])
  .then(() =>
    Promise.all([Book.insertMany(books), Character.insertMany(characters)])
  )
  .then(([books, characters]) => {
    books.map((book) => console.log(book.title));
    const reviews = [];
    const featuring = [];

    const used = {};

    for (let i = 0; i < 500; i++) {
      const randomBook = books[Math.floor(Math.random() * books.length)];
      reviews.push({
        title: faker.lorem.words(3 + Math.floor(Math.random() * 3)),
        description: faker.lorem.paragraphs(1 + Math.floor(Math.random() * 3)),
        author: faker.name.findName(),
        score: Math.floor(Math.random() * 6),
        bookId: randomBook._id,
      });

      const randomCharacter =
        characters[Math.floor(Math.random() * characters.length)];
      if (!used[`${randomCharacter._id}${randomBook._id}`]) {
        featuring.push({
          bookId: randomBook._id,
          characterId: randomCharacter._id,
        });
        used[`${randomCharacter._id}${randomBook._id}`] = true;
      }
    }
    return Promise.all([
      Review.insertMany(reviews),
      Featuring.insertMany(featuring),
    ]);
  })
  .then(([reviews]) => reviews.map((review) => console.log(review.title)))
  .finally(() => {
    process.exit();
  });
