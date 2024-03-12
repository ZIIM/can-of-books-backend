'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Empty = mongoose.model('Empty', someSchema);

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;


app.get('/test', async (request, response) => {

  let documents = await empty.find(); // added new
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
