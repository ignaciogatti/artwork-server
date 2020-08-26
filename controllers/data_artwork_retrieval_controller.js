const Data = require('../models/data');


// this is our get method
// this method fetches all available data in our database
getData = (req, res) => {
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  };
  
  // this is our getUserRatings method
  // this method fetches all available ratings for a user in our database
getUserRatings = (req, res) => {

    const { userId, tourApproach } = req.params;
    Data.find({ userId : userId, tourApproach : tourApproach }, 'userId sourceArtworkId ratedArtworkId experimentType',(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
};

// this is our update method
// this method overwrites existing data in our database
updateData = (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this is our delete method
// this method removes existing data in our database
deleteData = (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};

// this is our create method
// this method adds new data in our database
putData = (req, res) => {
    let data = new Data();

    const { userId, rating, sourceArtworkId, ratedArtworkId, experimentType, tourApproach } = req.body;

    if (!userId || !rating || !sourceArtworkId || !ratedArtworkId || !experimentType || !tourApproach) {
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
    data.tourApproach = tourApproach;

    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ 
        success: true, 
        data: {
            userId: data.userId,
            sourceArtworkId: data.sourceArtworkId,
            ratedArtworkId: data.ratedArtworkId,
            experimentType: data.experimentType,
            tourApproach: data.tourApproach
        } 
        });
    });
};

module.exports = {
    getData,
    getUserRatings,
    updateData,
    deleteData,
    putData
    
}