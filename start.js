//GLOBAL VARIABLES
var databaseUrl = "localhost/topsekrit";
var collections = ["restaurants"];

//REQUIRED MODULES
var router = require("./router.js");
var db = require("mongojs").connect(databaseUrl, collections);
var Restaurant = require("./models/restaurant.js");

var startServer = function () {

  //Turn on the controllers.
  db.restaurants.find({}, function (err, restaurants) {
    if (err) {
      console.log(err);
    } else if (restaurants.length > 0) {
      console.log("Basic restaurants already created, skipping restaurant creation.");
    } else {
      console.log("Creating initial restaurants.");
      Restaurant.functions.createInitials();
    }
  })

  //Start the router.  Server technically starts inside the router via http.createServer(); ... don't ask.
  router.router();

}

startServer();

exports.startServer = startServer;