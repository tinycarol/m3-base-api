![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Express Books

## Introduction

The goal of this class is to build functionality from a predefined project scaffolding. We are going to create a basic website for a library.

## Instructions

### Iteration 0.1 | Initialize the project

Start by installing all the dependencies:

```shell
$ npm install
```

To run the app:

```shell
$  npm run dev
```

<br>

### Iteration 0.2 | Familiarize yourself with the code

The repo comes with a predefined structure for our mongo + express project. Take a look at all the files. You'll see that we are using the following libraries:

- `express` as a Node API framework
- `mongoose` for DB connection and interaction
- `dotenv` for environment variable management
- `http-errors` for error generation
- `morgan` for request logging
- `nodemon` to launch and autoreload our server when files change

Make sure that you understand everything we're doing! Read the code thoroughly and explain it to yourself.

Once you're finished, you are ready to start. 🚀

<br>

### Iteration 1 | First model

Since our project is going to be a book library, we should start by creating our first model: a Book. This model should have the following fields:

| Name        | Type   | Required | Default value                                                                                            |
| ----------- | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| title       | String | true     | -                                                                                                        |
| author      | String | true     | -                                                                                                        |
| description | String | true     | -                                                                                                        |
| year        | Number | true     | -                                                                                                        |
| cover       | String | false    | https://lingopolo.org/thai/sites/lingopolo.org.thai/files/styles/entry/public/images/2016/08/22/book.jpg |

Add a `/models/Book.model.js` file and create your mongoose model there. Make sure you export it so you can use it later!

<br>

### Iteration 2 | Listing the books

Now that we have our model, we should add some way to access it. We're going to start by creating the `Books` section, which is already linked in our navbar, but currently returns a 404 error 😞.

Add a `GET /books` endpoint that fetches all books from the database and renders them in a list, displaying the title, author, year of publication and a small cover.

### Iteration 3 | Seed the database

If we access our `Books` section now, it appears to be broken! Although there is no error message, there are no books.

This makes sense: we just created the model, but there's nothing in that collection! We need to seed our database. Seeding a database is adding some prefilled data for testing. In this case, we just want to see what our site would look like once there's some data in the DB. The code for this should be in a `/bin/seeds.js` file.

There are two approaches for this sort of functionality:

- Manually generating an array of Books and adding those to the DB
- Using an external library to generate "random" data that fits the model

We're going to follow both methods simultaneously: we have a `/data/sanderbooks.json` file that contains the info of some books by Brandon Sanderson. So we could just add that! But it's a short list, and a library should have looots of books.

To generate other books, we're going to use [faker](https://www.npmjs.com/package/faker/v/5.5.3). Note: You should be careful and specifically install the `5.5.3` version, [since the next versions are corrupted!](https://www.theverge.com/2022/1/9/22874949/developer-corrupts-open-source-libraries-projects-affected)

Follow the link to see the docs of `faker`. There, you'll see that it has methods to generate random values:

- Words: `faker.lorem.words(5)`
- Names: `faker.lorem.findName()`
- Paragraphs: `faker.lorem.paragraphs(3)`

Use this to generate some random books and, together with Sanderson's books, add them to the database. You can use the `insertMany` method that all mongoose models have. Remember to configure `dotenv` so it will connect to your database, and also remember to import the DB config file!

Your file should look like this:

```javascript
require("dotenv").config();
require("../config/db.config");
const Book = require("../models/Book.model");
const sandersonBooks = require("../data/sanderbooks.json");

// TODO: Generate random books
// TODO: Delete all existing books
// TODO: Add those books to the DB
```

<br>

### Iteration 4 | Book detail

Now, if you access the `Books` section, you should see the list of books! We want to be able to see the full info of the book.

For this, there's two steps:

- Add an `Read more` anchor to the books list that links to each specific book. Since we're creating a REST API, the URL should be `/books/${book_id}`.

- Add a `GET /books/:id` route that finds the book with that specific ID and renders a detail page. This should display the full book cover and the book description.

<br>

### Bonus | Most popular books

Our home page is a little empty. Change it so it displays a list of the most popular books (AKA the first 5 books in the database 🤫).

### Bonus | Search

There's a looot of books! It's hard to find the info for a specific book, so it would be useful to add some way to filter them.

Add a search box to the `Books` list that will let you filter by title or author. Note that you can search for a text in a model field using `Model.find({ "fieldName": { "$regex": "${SEARCH_QUERY}", "$options": "i" } })`, but we want to search in two different fields, and not necessarily simultaneously!

**Happy coding!** :heart:
