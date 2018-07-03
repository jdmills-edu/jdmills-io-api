var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeSchema = new Schema(
  {
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      zip: Number,
      country: String
    },
    sqft: Number,
    movedIn: Date,
    movedOut: Date,
  }
);

module.exports = mongoose.model('Home', homeSchema);
