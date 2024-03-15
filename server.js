'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Books = require('./model/books.js');
const authorize = require('./authorize.js');

dotenv.config();

const PORT = process.env.PORT || 3001;
const DATABASE_URL=process.env.DATABASE_URL;

const app = express();
app.use(cors());

// tells express to expect json data attached to our request objects.
app.use(express.json());
app.use(authorize);

// route for handling POST request to '/books'
app.get('/books', async(request,response)=>{
  // READ from the books model
  let documents = await Books.find(); // should return every model instance in the Data Base
  response.send(documents); // sends the retrieved docuemnts as a http response
});

// CREATE!! a books object by defining a route for handling POST requests
app.post('/books', async(request, response)=>{
  let json = request.body;
  console.log('Books values', json);
  let newBooks = await Books.create(json);
  response.send(newBooks);
});

// DELETE!! a books object by id
app.delete('/books/:id', async(request, response)=>{
  let id = request.params.id; // Retrieves the ID of the book to delete from the request parameters.
  console.log('Books ID to Remove', id); // logs id of the book to deleete to console
  let result = await Books.findByIdAndDelete(id); //deletes book with spec id
  if(result){
    response.status(204).send('OK');
  }else{
    response.status(400);
  }
});

// Update book 
app.put('/books/:id', async (request,response)=>{
  let id = request.params.id;
  let updatedBookData = request.body;

  try {
    let updatedBook = await Books.findByIdAndUpdate(id, updatedBookData, { new: true });
    if (!updatedBook) {
      return response.status(404).send('Book not found');
    }
    response.send(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    response.status(500).send('Internal Server Error');
  }
});


mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
}).catch(e => {
  console.log('DB CONNECTION ISSUES!!', e);
});
