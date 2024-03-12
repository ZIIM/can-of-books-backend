'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./model/books.js');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL)
  .then(() => {
    // change names for books 
    let artOfWar = new Book({ title: '', description: '', status: 'Available'});
    let thinkGrowRich = new Book({ title: '', description: '', status: 'Available'});
    let richDadPoorDad = new Book({ title: '', description: '', status: 'Available'});
    artOfWar.save();
    thinkGrowRich.save();
    richDadPoorDad.save();
  }).catch(e => console.error(e));
