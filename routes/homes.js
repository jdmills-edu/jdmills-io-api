var express = require('express');
var router = express.Router();
var Home = require('../models/home');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Home.find().then((homes) => res.json(homes))
});

router.get('/:id', (req, res, next) => {
  Home.findById(req.params.id).then((home) => res.json(home))
});

router.post('/', (req, res, next) => {
  var home = new Home({
    address: {
      street1: req.body.address.street1,
      street2: req.body.address.street2,
      city: req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip,
      country: req.body.address.country
    },
    sqft: req.body.sqft,
    movedIn: req.body.movedIn,
    movedOut: req.body.movedOut
  });
  home.save(function(err, results) {
    console.log(results._id);
    res.redirect(`/homes/${results._id}`);
  });
});

router.put('/:id', (req, res, next) => {
  Home.findByIdAndUpdate(req.params.id, {
    address: {
      street1: req.body.address.street1,
      street2: req.body.address.street2,
      city: req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip,
      country: req.body.address.country
    },
    sqft: req.body.sqft,
    movedIn: req.body.movedIn,
    movedOut: req.body.movedOut
  },
  () => res.redirect(`/homes/${req.params.id}`));
});

module.exports = router;
