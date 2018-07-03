var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var institutionSchema = new Schema({
  name: String,
  type: String,
  address: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: Number,
    country: String
  }
});

module.exports = mongoose.model('Institution', institutionSchema);
