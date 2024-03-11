'use strict';

const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(cors());


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
