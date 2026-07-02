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

// 1. getAllRecipes()
async function getAllRecipes() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

// 2. getOneRecipe(index)
async function getOneRecipe(index) {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  const recipe = parsedData[index];
  return recipe;
}

// 3. getAllRecipeNames()
async function getAllRecipeNames() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  const names = parsedData.map((recipe) => recipe.name);
  return names;
}

// 4. getRecipesCount()
async function getRecipesCount() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  return parsedData.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
app.get("/get-one-recipe/:index", async (req, res) => {
  // store the index into a variable
  const recipeIndex = Number(req.params.index);
  // call the helper function, store in variable
  const recipe = await getOneRecipe(recipeIndex);
  // send json data back as a response
  res.json(recipe);
});

// 3. GET /get-all-recipe-names
app.get("/get-all-recipe-names", async (req, res) => {
  const names = await getAllRecipeNames();
  res.json(names);
});

// 4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
  const count = await getRecipesCount();
  res.json(count);
});