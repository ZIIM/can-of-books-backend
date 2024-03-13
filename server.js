'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Books = require('./model/books.js');

dotenv.config();

const PORT = process.env.PORT || 3001;
const DATABASE_URL=process.env.DATABASE_URL;

const app = express();
app.use(cors());

// tells express to expect json data attached to our request objects.
app.use(express.json());

app.get('/books', async(request,response)=>{
  // READ from the books model
  let documents = await Books.find(); // should return every model instance in the Data Base
  response.send(documents);
});

// create a books object
app.post('/books', async(request, response)=>{
  let json = request.body;
  console.log('Books values', json);
  let newBooks = await Books.create(json);
  response.send(newBooks);
});

// delete a books object by id
app.delete('/books/:id', async(request, response)=>{
  let id = request.params.id;
  console.log('Books ID to Remove', id);
  let result = await Books.findByIdAndDelete(id);
  if(result){
    response.status(204).send('OK');
  }else{
    response.status(400);
  }
});


// app.get('/books', async (request, response) => {
//   try {
//     const books = await Books.find();
//     console.log('BOOKS FROM MONGODB', books);
//     response.json(books);
//   } catch (error) {
//     response.status(500).send({ error: 'Error fetching books' });
//   }
// });









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
