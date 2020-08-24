const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');


const API_PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = process.env.MONGODB_CONNECTION;


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

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our getUserRatings method
// this method fetches all available ratings for a user in our database
router.get('/getUserRatings/:userId', (req, res) => {
  const { userId } = req.params;
  Data.find({ userId : userId }, 'userId sourceArtworkId ratedArtworkId experimentType',(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { userId, rating, sourceArtworkId, ratedArtworkId, experimentType } = req.body;

  if (!userId || !rating || !sourceArtworkId || !ratedArtworkId || !experimentType) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.userId = userId.toString();
  data.sourceArtworkId = sourceArtworkId;
  data.ratedArtworkId = ratedArtworkId;
  data.rating = rating;
  data.experimentType = experimentType;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ 
      success: true, 
      data: {
        userId: data.userId,
        sourceArtworkId: data.sourceArtworkId,
        ratedArtworkId: data.ratedArtworkId,
        experimentType: data.experimentType
      } 
    });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
