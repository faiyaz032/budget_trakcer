//dependencies
const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

//config variables
const PORT = process.env.PORT || 3001;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_ATLAS_URI || 'mongodb://localhost/budget_tracker';

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// routes
app.use(require('./routes/api.js'));

//connect database
mongoose
   .connect(MONGODB_CONNECTION_STRING)
   .then(() => {
      console.log(`App is successfully connected to the database`);
      app.listen(PORT, () => {
         console.log(`App is alive on PORT:${PORT}!`);
      });
   })
   .catch((error) => console.log(error));
