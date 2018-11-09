// Setup
// -----------------------------------------------------------------------------
// #############################################################################
const express = require("express");
const mongoose = require("mongoose");

const Cat = require("./cat-model.js");

// connect to the database defined by this CONNECTION STRING
// (domain, port, database name, and all info about the database)
mongoose.connect("mongodb://localhost/cat-ebay");

const app = express();

app.listen(3000, () => {
  console.log("Meow! Server ready. 😸");
});

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");



// Routes
// -----------------------------------------------------------------------------
// #############################################################################
app.get("/", (request, response, next) => {
  Cat.find({ toys: { $ne: null } })
    .then(catResults => {
      response.locals.catArray = catResults;
      response.render("cat-list.hbs");
    })
    .catch(err => {
      console.log("HOME PAGE Cat.find() failure 💩", err);
      response.render("cat-error.hbs");
    });
});
