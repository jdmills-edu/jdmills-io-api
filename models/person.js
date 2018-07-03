var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  name: {
    full: String,
    first: String,
    last: String
  },
  sex: String,
  birthday: Date,
  email: String,
  spouse: {
     type: Schema.Types.ObjectId,
     ref: 'Person' // Reference to some EventSchema
  },
  children: [{
     type: Schema.Types.ObjectId,
     ref: 'Person' // Reference to some EventSchema
  }],
  cv: {
    education: [{
      institution: {
        type: Schema.Types.ObjectId,
        ref: 'Institution' // Reference to some EventSchema
      },
      startDate: Date,
      completionDate: Date,
      programs: [{
        name: String,
        certificate: String
      }]
    }],
    jobs: [{
      institution: {
        type: Schema.Types.ObjectId,
        ref: 'Institution' // Reference to some EventSchema
      },
      startDate: Date,
      completionDate: Date,
      title: String
    }]
  },
  location: {
     type: Schema.Types.ObjectId,
     ref: 'Home' // Reference to some HomeSchema
  },
  photoUrl: String
});

module.exports = mongoose.model('Person', personSchema);
