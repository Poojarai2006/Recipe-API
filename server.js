const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/recipesDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Recipe API is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
const Recipe = require('./models/Recipe');

//  Add Recipe
app.post('/recipes', async (req, res) => {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json(recipe);
});

//  Get All Recipes
app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

//  Get One Recipe
app.get('/recipes/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
});

//  Update Recipe
app.put('/recipes/:id', async (req, res) => {
    const updated = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

//  Delete Recipe
app.delete('/recipes/:id', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});