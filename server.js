'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;


app.get('/test', (request, response) => {

  response.send('test request received')

})

// mongoose.connect(DATABASE_URL)
// .then(() => {
//   app.listen(PORT, () => {
//     console.log('Server is listening!', PORT);
//   });
// })
// .catch(e => {
//   console.log('DB Connection issue', e);
// });


app.listen(PORT, () => console.log(`listening on ${PORT}`));
