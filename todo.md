# Express Puppies

## GET Request - all puppies - '/api/v1/puppies'

1. Set up Endpoint
1. Serve ALL puppies back in JSON
1. Test

## GET Request - single puppy - '/api/v1/puppy/<id>'

1. Set up Endpoint
1. Serve a SINGLE puppy back in JSON
1. Test

## POST Request - all puppies - '/api/v1/puppies'

1. Set up Endpoint
1. Serve the NEWLY CREATED puppy in JSON
1. Test

## PUT Request - single puppy - '/api/v1/puppy/<id>'

1. Set up Endpoint
1. Serve the UPDATED PUPPY in JSON
1. Test

## DELETE Request - single puppy - '/api/v1/puppy/<id>'

1. Set up Endpoint
1. Serve the DELETE PUPPY info in JSON
1. Test


# STEPS
## apps.js
1. Open app.js create new route
1. Open app.js create new main route
   app.use('/api/v1', puppyAPIRoutes)

## apiRoutes.js
1. Test out in new apiRoutes.js file
  router.get('/puppies', function(req, res, next) {
  console.log(newPuppy);
  res.send("yo")
});
1. Create global variables

## models folder
1. Create models folder within server folder
   (have whatever we need to create a new instance of our resourse)
1. Create new file puppies.js within models folder
1. Create constuctor then export it as Puppy

## apiRoutes.js
1. Add some complexity to the POST request to "if statement"
1. Create PUT request in apiRoutes.js
1. Set up JSON with GET
      ```
  router.get('/puppies', function(req, res, next) {
      // console.log(newPuppy);
      // res.send("yo")
      res.json(tempPuppyArray);
  });
      ```
1. Create POST request with httpie
1. Within the PUT router update the if statement
1. Add DELETE route
1. Clean up! make code dry since we repeated several things in each route

## NOTES:
1. Within the PUT (edit/update) (we never change the ID but we could change the name and age or other key values)

## TERMINAL:
1. Command + "T"> to open new tab > and to run nodemon
1. Go into other tab and paste http -f POST localhost:3000/api/v1/puppies test=test
1. What do we do with this data?

## TERMINAL SYNTAX
#### POST (the -f goes through the form picks up data then creates new Puppy)
```
http -f POST localhost:3000/api/v1/puppies/ puppyName=John puppyAge=3
```

#### PUT (Edit/ Update)
```
http PUT localhost:3000/api/v1/puppy/2 puppyName=crystal puppyAge=1
```

#### DELETE (remove from array and view from json)
```
http DELETE localhost:3000/api/v1/puppy/3
```


# EXAMPLES BELOW
### POST in the apiRoutes.js
```
router.post('/puppies', function(req, res, next) {
  var newPostPuppy = new Puppy(
    +req.body.puppyID,
    req.body.puppyName,
    +req.body.puppyAge
  );
  tempPuppyArray.push(newPostPuppy);
  res.json({message: 'success', puppy: newPostPuppy})
  res.send(req.body)
});

module.exports = router;
```
## POST in the terminal
```
  ➜  express_puppies git:(master) ✗ http -f POST localhost:3000/api/v1/puppies puppyID=4 puppyName=Taco puppyAge=7

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 75
Content-Type: application/json; charset=utf-8
Date: Mon, 24 Aug 2015 20:11:40 GMT
ETag: W/"4b-GU4uN6iLNIcVk1aTiOChDA"
X-Powered-By: Express

{
    "message": "success",
    "puppy": {
        "puppyAge": 7,
        "puppyID": 4,
        "puppyName": "Taco"
    }
}
```

## PUT in the apiRoutes.js
```
router.put('/puppy/:id', function(req, res, next) {
  var id = +req.params.id;

  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID===+req.params.id;
  });
  if (pup.length>0){
    res.json("something is happening here")
  } else {
    res.json("Puppy ain't existing here");
  }
});
```
## PUT in the terminal
```
➜  express_puppies git:(master) ✗ http PUT localhost:3000/api/v1/puppy/2 puppyName=crystal puppyAge=1 puppyId=7

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 145
Content-Type: application/json; charset=utf-8
Date: Mon, 24 Aug 2015 22:10:11 GMT
ETag: W/"91-zOBIGobdNHhzrMtbsTZYTw"
X-Powered-By: Express

[
    {
        "puppyAge": 20,
        "puppyID": 1,
        "puppyName": "Bart"
    },
    {
        "puppyAge": "1",
        "puppyID": 2,
        "puppyName": "crystal"
    },
    {
        "puppyAge": 15,
        "puppyID": 3,
        "puppyName": "Dan"
    }
]
```
## DELETE in the apiRoutes.js
```
router.delete('/puppy/:id', function(req, res, next) {
 tempPuppyArray.splice(req.params.id - 1, 1);
 res.json(tempPuppyArray)
});
```
## DELETE in the terminal
```
➜  express_puppies git:(master) ✗ http DELETE localhost:3000/api/v1/puppy/3

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 99
Content-Type: application/json; charset=utf-8
Date: Mon, 24 Aug 2015 22:25:18 GMT
ETag: W/"63-bCrEWT4qxokQRicKNYD0uQ"
X-Powered-By: Express

[
    {
        "puppyAge": 20,
        "puppyID": 1,
        "puppyName": "Bart"
    },
    {
        "puppyAge": "1",
        "puppyID": 2,
        "puppyName": "crystal"
    }
]
```
