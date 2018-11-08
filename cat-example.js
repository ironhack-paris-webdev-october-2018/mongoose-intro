const mongoose = require("mongoose");

// connect to the database defined by this CONNECTION STRING
// (domain, port, database name, and all info about the database)
mongoose.connect("mongodb://localhost/cat-ebay");


// the variable "Cat" is our Mongoose model class
// the "Cat" model will allow us to make queries on the "cats" collection
// (Mongoose converts the model name "Cat" into the collection name "cats")
const Cat = mongoose.model("Cat", { name: String, age: Number });



// Creating new cats (insert a document in the database)
// -----------------------------------------------------------------------------

// Mongoose queries return PROMISES so we use the standard then() and catch()
Cat.create({ name: "Oreo", age: 0.6 })
  // then() callbacks get called if the operation is successful
  .then(catDoc => {
    console.log("CAT CREATE WORKED!! 😎", catDoc);
  })
  // catch() callbacks get called if the operation FAILS
  .catch(err => {
    console.log("CAT CREATE failed 😓", err);
  });

// Cat.create().then().catch();

// const myPromise = Cat.create();
// myPromise.then();
// myPromise.catch();

const niccolosCat = new Cat({ name: "Raja", age: 6 });
niccolosCat.save()
  .then(catDoc => {
    console.log("Raja CREATE success!! 🤓", catDoc);
  })
  .catch(err => {
    console.log("Raja CREATE failure 😩", err);
  });



// Reading cats from the database (uses filter, project, and sort objects)
// -----------------------------------------------------------------------------

// "find()" will always give you an ARRAY of results
Cat.find({ age: { $lt: 1 } })
  .then(catResults => {
    // with "find()" the result is ALWAYS an array
    catResults.forEach(catDoc => {
      console.log(`ONE CAT -> ${catDoc.name} (id: ${catDoc._id})`);
    });
  })
  .catch(err => {
    console.log("Cat.find() FAILURE 😡", err);
  });

// "findOne()" will always give you a SINGLE document
Cat.findOne({ name: { $ne: "Oreo" } })
  .then(catDoc => {
    console.log(`Cat.findOne() -> ${catDoc.name} (id: ${catDoc._id})`);
  })
  .catch(err => {
    console.log("Cat.findOne() FAILURE 🤬", err);
  });

// "findById()" will always give you a SINGLE document
Cat.findById("5be43f89a06f24c9a94a2a50")
  .then(catDoc => {
    console.log(`Cat.findById() -> ${catDoc.name} (id: ${catDoc._id})`);
  })
  .catch(err => {
    console.log("Cat.findById() FAILURE 💩", err);
  });



// Updating cats in the database
// -----------------------------------------------------------------------------
// 1st argument -> FILTER OBJECT (which document(s)?)
// 2nd argument -> UPDATES OBJECT (how will they change?)
//                 (update operators: $set, $inc, $push)

Cat.findByIdAndUpdate(
  "5be43f89a06f24c9a94a2a50",
  { $set: { name: "Rubie", age: 4 } }
) // "$set" is like the = operator (name = "Rubie")
.then(catDoc => {
  console.log(`Cat UPDATED ${catDoc._id}`);
})
.catch(err => {
  console.log("Cat RUBIE update FAILURE 💩", err);
});

Cat.updateMany(
  { name: { $eq: "Raja" } },
  { $inc: { age: 1 } }
) // "$inc" is like the ++ or += operators (age += 1)
.then(result => {
  console.log("RAJAS are ONE YEAR older", result);
})
.catch(err => {
  console.log("Cat.updateMany() FAILURE!! 💩", err);
});



// Deleting cats from the database
// -----------------------------------------------------------------------------
// "findByAndRemove()" deletes the document and gets it for you too
Cat.findByIdAndRemove("5be443ca9e604ecb04b10c57")
  .then(catDoc => {
    console.log(`DELETED ${catDoc.name} (id: ${catDoc._id})`);
  })
  .catch(err => {
    console.log("Cat.findByIdAndRemove() FAILURE 🤯", err);
  });

// "deleteMany()" is for deleting several documents at once
Cat.deleteMany({ name: { $eq: "Gateau" } })
  .then(result => {
    console.log("Cat.deleteMany() SUCCESS!!", result);
  })
  .catch(err => {
    console.log("Cat.deleteMany() FAILURE!! 😓", err);
  });
