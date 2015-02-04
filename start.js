//GLOBAL VARIABLES
var databaseUrl = "localhost/topsekrit";
var collections = ["restaurants"];

//REQUIRED MODULES
var router = require("./router.js");
var db = require("mongojs").connect(databaseUrl, collections);
var Restaurant = require("./models/restaurant.js");

var startServer = function () {

  //BEFORE STARTING THE SERVER

  //Check to see if we have restaurants already, if not then create some.
  db.restaurants.find({}, function (err, restaurants) {
    if (err) {
      console.log("WHY WOULD YOU DO THIS?");
      console.log(err);
    } else if (restaurants.length > 0) {
      console.log("Basic restaurants already created, skipping restaurant creation.");
    } else {
      console.log("Creating initial restaurants.");
      Restaurant.functions.createInitials();
    }
  })

  //START THE ROUTER/SERVER  Server technically starts inside the router via http.createServer(); ... don't ask.
  router.router();

}

startServer();

exports.startServer = startServer;