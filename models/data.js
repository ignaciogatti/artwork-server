// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    userId: String,
    sourceArtworkId: String,
    ratedArtworkId: String,
    experimentType: String,
    tourApproach: String,
    rating: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("datas", DataSchema);
