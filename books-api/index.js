// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// import node modules
import express from "express";
import fs from "fs/promises";

// app instance of express
const app = express();

// port
const port = 3000;

// middleware for using JSON
app.use(express.json());

// start server!
app.listen(port, () => {
  console.log(`it's going on port: ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()
async function getAllBooks() {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

// 2. getOneBook(index)
async function getOneBook(index) {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedData = JSON.parse(data);
  const book = parsedData[index];
  return book;
}

// 3. getOneBookTitle(index)
async function getOneBookTitle(index) {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedData = JSON.parse(data);
  const book = parsedData[index];
  return book.title;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books
app.get("/get-all-books", async (req, res) => {
  // call the helper function, store in variable
  const books = await getAllBooks();
  // send json data back as a response
  res.json(books);
});

// 2. GET /get-one-book/:index
app.get("/get-one-book/:index", async (req, res) => {
  // store the index into a variable
  const bookIndex = Number(req.params.index);
  // call the helper function, store in variable
  const book = await getOneBook(bookIndex);
  // send json data back as a response
  res.json(book);
});

// 3. GET /get-one-book-title/:index — try writing this one yourself!
app.get("/get-one-book-title/:index", async (req, res) => {
  // store the index into a variable
  const bookIndex = Number(req.params.index);
  // call the helper function, store in variable
  const title = await getOneBookTitle(bookIndex);
  // send json data back as a response
  res.json({ title });
});