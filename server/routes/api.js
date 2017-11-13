const express= require('express');
const router = express.Router();
const Place = require('../models/place');
const User = require('../models/user')

//get all
router.get('/place', function(req, res, next){
  Place.find({}).then(function(result){
    res.send(result);
  }).catch(next);
});



//get single poll
router.get('/place/:id', function(req, res, next){
  Place.findOne({id: req.params.id})
  .then(function(result){
    if(!result){
      console.log("404");
      res.status(404);
      res.send("no Place")
    }
    else{
      res.send(result)
    }
  }).catch(next);
})

router.post('/place', function(req, res, next){
  Place.create(req.body).then(function(Product){
    res.send(Product);
  }).catch(next)
});

router.put('/place/:id', function(req, res, next){
  console.log("place init", req.body)
    Place.findOneAndUpdate({id: req.params.id}, req.body).then(function(){
        Place.findOne({id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    }).catch(next);
});

router.delete('/place/:id', function(req, res, next){
  Place.findByIdAndRemove({_id: req.params.id}).then(function(del){
    res.send(del);
  }).catch(next);
})

// user
router.get('/user', function(req, res, next){
  User.find().then(function(result){
    res.send(result);
  }).catch(next);
});
//find user
router.get('/user/:id', function(req, res, next){
  User.findOne({id:req.params.id}).then(function(result){
    // res.send(result);
    if(!result){
      console.log("404");
      res.status(404);
      res.send("none");
    }
    else{
      res.send(result)
    }
  }).catch(next);
});

//create
router.post('/user', function(req, res, next){
  console.log(req.body)
  User.create(req.body).then(function(create){
    res.send(create);
  }).catch(next)
});
//update
router.put('/user/:id', function(req, res, next){
  console.log("user update", req.body)
    User.findOneAndUpdate({id: req.params.id}, req.body).then(function(){
        User.findOne({id: req.params.id}).then(function(user){
            res.send(user);
        });
    }).catch(next);
});
//delete
router.delete('/user/:id', function(req, res, next){
  User.findByIdAndRemove({_id: req.params.id}).then(function(del){
    res.send(del);
  }).catch(next);
})

module.exports = router;
