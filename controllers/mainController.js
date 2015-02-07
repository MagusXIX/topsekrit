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
    fs.readFile("./views/statics/mainView.html", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      respond(request, response, data);
    });
  },


  //------
  //IMAGES
  //------
  doubler: function (request, response) {
    fs.readFile("./views/css/images/doubler.jpg", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      respond(request, response, data);
    })
  },

  wilkinson: function (request, response) {
    fs.readFile("./views/css/images/wilkinson.jpg", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      respond(request, response, data);
    })
  },

  redStar: function (request, response) {
    fs.readFile("./views/css/images/redStar.png", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      respond(request, response, data);
    })
  },

  //-----------
  //STYLESHEETS
  //-----------
  stylus: function (request, response) {
    fs.readFile("./views/css/stylus.css", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      response.setHeader('content-type', 'text/css');
      respond(request, response, data);
    })
  },

  //-------
  //SCRIPTS
  //-------
  testjs: function (request, response) {
    fs.readFile("./views/scripts/test.js", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      response.setHeader('content-type', 'application/javascript');
      respond(request, response, data);
    })
  },

  updateRestaurant: function (request, response, data) {
    console.log("Updating restaurant.");
    console.log(data);
    Restaurants.functions.updateRestaurant(request, response, data);
  },

  getRestaurants: function (request, response) {
    Restaurants.functions.retrieveRestaurants(request, response);
  },

  sendRestaurants: function (request, response, restaurants) {
    response.setHeader('content-type', 'application/json');
    respond(request, response, JSON.stringify(restaurants));
  }

}

exports.functions = functions;