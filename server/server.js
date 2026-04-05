const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', async function (req, res) {
    /* Task 1.2. Remove the line below and eturn the movies from 
     the model as an array */
  const movies = await loadJSONs()
  res.json(movies)
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
  res.sendStatus(404)
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

async function loadJSONs() {
  const fs = require("fs");

  const folder = path.join(__dirname, "files/json");;

  const array = fs.readdirSync(folder)
    .filter(file => file.endsWith(".json"))
    .map(file => {
      const content = fs.readFileSync(path.join(folder, file));
      return JSON.parse(content);
    });

  return array; // Array mit allen JSON-Inhalten
}