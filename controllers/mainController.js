//Global Variables

//Required Modules
var fs = require("fs");
var Restaurants = require("../models/restaurant.js");

var respond = function(request, response, write){
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(write);
  response.end();
}

var functions = {
  index: function (request, response) {
    fs.readFile("./views/mainView.html", function (err, data) {
      if (err) {
        console.log("Error finding html index.");
        console.log(err);
      } else {
        respond(request, response, data);
      }
    });
  },

  bundle: function (request, response) {
    fs.readFile("./bundle.js", function (err, data) {
      if (err) {
        console.log("Error findingle bundle.");
        console.log(err);
      } else {
        respond(request, response, data);
      }
    })
  },

  updateRestaurant: function (request, response, data) {
    console.log("Updating restaurant.");
    Restaurants.functions.updateRestaurant(request, response, data);
  },

  getRestaurants: function (request, response) {
    console.log("Getting restaurants.");
    Restaurants.functions.retrieveRestaurants(request, response);
  },

  sendRestaurants: function (request, response, restaurants) {
    console.log("Sending restaurants.");
    response.setHeader('content-type', 'application/json');
    respond(request, response, JSON.stringify(restaurants));
  }

}

exports.functions = functions;