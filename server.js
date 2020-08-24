const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
var dbConnectionRoute = require('./mongoConnection.json');
const data_artwork_retrieval_router = require('./routes/data_artwork_retrieval_routes');


const API_PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// this is our MongoDB database
const dbRoute = dbConnectionRoute.mongo_connection;


// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// append /api for our http requests
app.use('/api', data_artwork_retrieval_router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
