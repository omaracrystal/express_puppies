var express = require('express');
var router = express.Router();

var Puppy = require('../models/puppies')

var tempPuppyArray = [];
var newPuppy = new Puppy(1, 'Bart', 20);
var johnPuppy = new Puppy(2, 'John', 15);
var danPuppy = new Puppy(3, 'Dan', 15);


tempPuppyArray.push(newPuppy, johnPuppy, danPuppy);

router.get('/puppies', function(req, res, next) {
  // console.log(newPuppy);
  // res.send("yo")
  res.json(tempPuppyArray);
});

router.get('/puppy/:id', function(req, res, next){
  var id = +req.params.id;

  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID===+req.params.id;
  });
  if (pup.length>0){
    res.json(pup[0])
  } else {
    res.json({message: "Puppy ain't existing here"});
  }

});

//add
router.post('/puppies', function(req, res, next) {
  // does the puppy already exist?
  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID === +req.params.puppyID;
  });
  //yes? throw an error
  if (pup.length >0) {
    res.json(
      {message: "Yo! That puppy already exists!"}
      )
  } else { //no? return a success
    var newPostPuppy = new Puppy(
      +req.body.puppyID,
      req.body.puppyName,
      +req.body.puppyAge
      );
  tempPuppyArray.push(newPostPuppy);
  res.json(
    {message: 'success', puppy: newPostPuppy}
    );
  }
});

//edit
router.put('/puppy/:id', function(req, res, next) {
      console.log(req.body)

  if(isNaN(parseInt(req.body.puppyAge))) {
    res.json({message: "Please enter a number for the puppy's age!"})
    return false;
  }
  //add validation for checking if puppyAge is an integer
  if (typeof +req.body.puppyAge === "number") {
    //if exists, and not an iteger, throw an error

  }
  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID===+req.params.id;
  var data = req.body;
  });

  var data = req.body;
    // grab object from array
    // update specific keys
    // push back into the array
  if (pup.length>0){
    for (var i = 0; i < tempPuppyArray.length; i++) {
      if (tempPuppyArray[i].puppyID === +req.params.id) {
        for (key in data) {
          if (key === 'puppyAge') {
            tempPuppyArray[i].puppyAge = req.body.puppyAge
          } else if (key === 'puppyName') {
            tempPuppyArray[i].puppyName = req.body.puppyName
          }
        }
      }
    }
    res.send(tempPuppyArray)
  } else {
    res.json("Puppy ain't existing here");
  }
});

//delete
router.delete('/puppy/:id', function(req, res, next) {

 // var pup = tempPuppyArray.filter(function(puppy){
 //   return puppy.puppyID===+req.params.id;
 // });
 // if (pup.length>0){
 //   for (var i=0; i<tempPuppyArray.length; i++) {
 //     if (tempPuppyArray[i].puppyID===parseInt(req.params.id)) {
 //       var tempPuppy = tempPuppyArray.splice(i, 1);
 //         res.send({
 //           message: 'that puppy is gone',
 //         });

 //     }
 //   }
 //   res.send(tempPuppyArray[i]);
 // }
 // else {
 //   res.json("Puppy ain't existing here");
 // }
 //

 tempPuppyArray.splice(req.params.id - 1, 1);

 res.json(tempPuppyArray)
});



module.exports = router;
