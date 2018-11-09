const mongoose = require("mongoose");

// Schema class from Mongoose
const Schema = mongoose.Schema;


// use Mongoose's Schema class to create our schema object
// (the schema is the STRUCTURE of documents in the model's collection)
const catSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 40,
  },
  color: {
    type: String,
    minlength: 3,
  },
  vetVisits: [ Date ],
  toys: [ String ],
  // ObjectId isn't a built-in JavaScript class (unlike String, Number, etc.)
  owners: [ Schema.Types.ObjectId ],
  countryCode: {
    type: String,
    // a string of EXACTLY 2 UPPERCASE letters
    match: /^[A-Z][A-Z]$/,
  },
  photo: String,
});

// the variable "Cat" is our Mongoose model class
// the "Cat" model will allow us to make queries on the "cats" collection
// (Mongoose converts the model name "Cat" into the collection name "cats")
const Cat = mongoose.model("Cat", catSchema);


// share the "Cat" variable with other files
module.exports = Cat;
