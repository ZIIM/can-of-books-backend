'use strict';
// Requires and configures dotenv, a module that loads environment variables from a .env file into process.env. This is useful for hiding sensitive configuration options (like database passwords) from your source code.
require('dotenv').config(); 
// Requires the Express framework and assigns it to the variable express. Express is a web application framework for Node.js, designed for building web applications and APIs.
const express = require('express');
// Requires the CORS (Cross-Origin Resource Sharing) package and assigns it to the variable cors. CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors');
// Requires the Mongoose package, a MongoDB object modeling tool designed to work in an asynchronous environment, and assigns it to the variable mongoose.
const mongoose = require('mongoose');
// take this empty out
// const Empty = mongoose.model('Empty', someSchema);

// Creates an instance of an Express application.
// Tells the Express application to use CORS. This enables your server to accept requests from different origins (domains), which is especially important for API services accessed by web applications running on other domains.
const app = express();
app.use(cors());



const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;


app.get('/test', async (request, response) => {

  let documents = await Empty.find(); // added new
  response.send('test request received')

})

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // This makes the title a required field
  },
  description: {
    type: String,
    required: true // This makes the description a required field
  },
  status: {
    type: String,
    default: 'available' // Default status is 'available' if not specified
    // You might also consider using an enum if there are only a few valid statuses.
    // For example: enum: ['available', 'borrowed', 'reserved']
  }
});

// Create a model from the schema
const Book = mongoose.model('Book', bookSchema);

// Export the model
module.exports = Book;

mongoose.connect(DATABASE_URL)
.then(() => {
  app.listen(PORT, () => {
    console.log('Server is listening!', PORT);
  });
})
.catch(e => {
  console.log('DB Connection issue', e);
});

// commented out below
// app.listen(PORT, () => console.log(`listening on ${PORT}`));
