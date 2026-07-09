// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// import Node modules
import express from "express"; // framework for building the server & API endpoints
import fs from "fs/promises"; // lets us read files (our "database") using promises/async-await

// create an instance of the express app
const app = express();

// the port our server will listen on
const port = 3000;

// middleware: tells the server to parse incoming request bodies as JSON
app.use(express.json());

// start the server and listen for incoming requests on the given port
app.listen(port, () => {
  console.log(`it's going on port: ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------
// These functions handle reading/processing the data.
// They don't talk to Express directly - the endpoints below call these.

// 1. getAllRecipes()
// Reads the JSON file and returns the full list of recipes
async function getAllRecipes() {
  const data = await fs.readFile("recipes-data.json", "utf8"); // read the raw file as text
  const parsedData = JSON.parse(data); // convert the text into a JS array/object
  return parsedData;
}

// 2. getOneRecipe(index)
// Reads the JSON file and returns a single recipe at the given index
async function getOneRecipe(index) {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  const recipe = parsedData[index]; // grab just the recipe at this position in the array
  return recipe;
}

// 3. getAllRecipeNames()
// Reads the JSON file and returns just the "name" field of every recipe
async function getAllRecipeNames() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  const names = parsedData.map((recipe) => recipe.name); // pull out only the "name" property from each recipe
  return names;
}

// 4. getRecipesCount()
// Reads the JSON file and returns how many recipes it contains
async function getRecipesCount() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  return parsedData.length; // the array's length = total number of recipes
}

// ---------------------------------
// API Endpoints
// ---------------------------------
// These define the routes clients (like Postman or the browser) can call
// Each one calls a helper function above and sends the result back as a response

// 1. GET /get-all-recipes
// Returns every recipe in the file
app.get("/get-all-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
// Returns a single recipe based on the index passed in the URL (e.g. /get-one-recipe/2)
app.get("/get-one-recipe/:index", async (req, res) => {
  // store the index from the URL params into a variable
  const recipeIndex = Number(req.params.index); // req.params values are strings, so convert to a number
  // call the helper function, store the result in a variable
  const recipe = await getOneRecipe(recipeIndex);
  // send the JSON data back as a response
  res.json(recipe);
});

// 3. GET /get-all-recipe-names
// Returns just the list of recipe names, without the full recipe details
app.get("/get-all-recipe-names", async (req, res) => {
  const names = await getAllRecipeNames();
  res.json(names);
});

// 4. GET /get-recipes-count
// Returns how many recipes exist in total
app.get("/get-recipes-count", async (req, res) => {
  const count = await getRecipesCount();
  res.json(count);
});