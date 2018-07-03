var express = require('express');
var router = express.Router();
var Institution = require('../models/institution');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Institution.find().then((institution) => res.json(institution))
});

router.get('/:id', (req, res, next) => {
  Institution.findById(req.params.id).then((institution) => res.json(institution))
});

router.post('/', (req, res, next) => {
  var institution = new Institution({
    name: req.body.name,
    type: req.body.type,
    address: {
      street1: req.body.address.street1,
      street2: req.body.address.street2,
      city: req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip,
      country: req.body.address.country
    }
  });
  institution.save(function(err, results) {
    console.log(results._id);
    res.redirect(`/institution/${results._id}`);
  });
});

router.put('/:id', (req, res, next) => {
  Institution.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    type: req.body.type,
    address: {
      street1: req.body.address.street1,
      street2: req.body.address.street2,
      city: req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip,
      country: req.body.address.country
    }
  },
  () => res.redirect(`/institution/${req.params.id}`));
});

module.exports = router;
