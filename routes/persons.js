var express = require('express');
var router = express.Router();
var Person = require('../models/person');
var Institution = require('../models/institution');
var Home = require('../models/home');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Person.find()
  .populate('location', 'address')
  .populate('spouse', ['name', 'email'])
  .populate('cv.education.institution')
  .populate('cv.jobs.institution')
  .then((persons) => res.json(persons))
})


router.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .populate('location', 'address')
  .populate('spouse', ['name', 'email'])
  .populate('cv.education.institution')
  .populate('cv.jobs.institution')
  .then((person) => {
    person ? res.json(person) : res.status(404).send(`No person with ID ${req.params.id}.`)
  })
});

router.post('/', (req, res, next) => {
  var person = new Person({
    name: {
      full: req.body.name.full,
      first: req.body.name.first,
      last: req.body.name.last
    },
    sex: req.body.sex,
    birthday: req.body.birthday,
    email: req.body.email,
    spouse: req.body.spouse ? mongoose.Types.ObjectId(req.body.spouse) : null,
    children: req.body.children ? req.body.children.map((child) => {
      mongoose.Types.ObjectId(child)
    }) : null,
    cv: {
  		education:
        req.body.cv.education ? req.body.cv.education.map((edu) => {
          let structuredEdu = {
            institution: edu.institution ? mongoose.Types.ObjectId(edu.institution) : null,
            startDate: edu.startDate ? edu.startDate : null,
            completionDate: edu.completionDate ? edu.completionDate : null,
            programs: edu.programs ? edu.programs : null
          }
          return structuredEdu;
        }) : null,
      jobs: [
        req.body.cv.jobs ? req.body.cv.jobs.map((job) => {
          let structuredJob = {
            institution: job.institution ? mongoose.Types.ObjectId(job.institution) : null,
            startDate: job.startDate,
            completionDate: job.completionDate,
            title: job.title
          }
          return structuredJob;
        }) : null
      ]
    },
    location: req.body.location ? mongoose.Types.ObjectId(req.body.location) : null,
  });
  person.save(function(err, results) {
    err ? console.log(err) : console.log(results._id);
    res.redirect(`/persons/${results._id}`);
  });
});

router.put('/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, {
    name: {
      full: req.body.name.full,
      first: req.body.name.first,
      last: req.body.name.last
    },
    sex: req.body.sex,
    birthday: req.body.birthday,
    email: req.body.email,
    spouse: req.body.spouse ? mongoose.Types.ObjectId(req.body.spouse) : null,
    children: req.body.children ? req.body.children.map((child) => {
      mongoose.Types.ObjectId(child)
    }) : null,
    cv: {
  		education:
        req.body.cv.education ? req.body.cv.education.map((edu) => {
          let structuredEdu = {
            institution: edu.institution ? mongoose.Types.ObjectId(edu.institution) : null,
            startDate: edu.startDate ? edu.startDate : null,
            completionDate: edu.completionDate ? edu.completionDate : null,
            programs: edu.programs ? edu.programs : null
          }
          return structuredEdu;
        }) : null
      ,
      jobs:
        req.body.cv.jobs ? req.body.cv.jobs.map((job) => {
          let structuredJob = {
            institution: job.institution ? mongoose.Types.ObjectId(job.institution) : null,
            startDate: job.startDate,
            completionDate: job.completionDate,
            title: job.title
          }
          return structuredJob;
        }) : null
    },
    location: req.body.location ? mongoose.Types.ObjectId(req.body.location) : null,
  },
  () => res.redirect(`/persons/${req.params.id}`));
});

module.exports = router;
