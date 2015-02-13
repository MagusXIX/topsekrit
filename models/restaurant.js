//GLOBAL VARIABLES
var databaseUrl = "localhost/topsekrit";
var collections = ["restaurants"];

//REQUIRED MODULES
var db = require("mongojs").connect(databaseUrl, collections);
var mainController = require("../controllers/mainController.js");

var functions = {
  model: function (restaurant) {
    var restaurantInstance = {
        name: restaurant.name //string
      , image: restaurant.image //path to the image, a string
      , rating: restaurant.rating //float, average of allRatings
      , allRatings: restaurant.allRatings //array of floats
      , id: restaurant.id //There's a smarter way to do this, but for now this is just the default database ._id CHANGE ME LATER
      , view: restaurant.view //Storing the view here is sloppy, but expedient. Streamline later.
    };

    return restaurantInstance;
  },

  createInitials: function () {
    var wilkinsons = {
        name: "Wilkinson's Family Restaurant"
      , image: "./static/css/images/wilkinson.jpg"
      , rating: 4.85
      , allRatings: [4, 5, 5, 5, 5, 5, 5]
    }
    db.restaurants.save(this.model(wilkinsons), function (err, data) {
      if (err) {
        console.log("Error saving Wilkinson's");
        console.log(err);    }
    });

    var doubler = {
        name: "Double R Diner"
      , image: "./static/css/images/doubler.jpg"
      , rating: 4.5
      , allRatings: [4, 4, 4, 5, 5, 5]
    }
    db.restaurants.save(this.model(doubler), function (err, data) {
      if (err) {
        console.log("Error saving Double R");
        console.log(err);    
      }
    });
  },

  retrieveRestaurants: function (request, response) {
    console.log("Querying db for restaurants.");
    db.restaurants.find({}, function (err, restaurants) {
      if (err) {
        console.log("Error in retrieveRestaurants");
        console.log(err);
      } else {
        mainController.functions.sendRestaurants(request, response, restaurants);
      }
    })
  },

  updateRestaurant: function (request, response, restaurant) {
    console.log("Finding and modifying.");
    db.restaurants.findAndModify({
      query: {name: restaurant.name},
      update: {name: restaurant.name, image: restaurant.image, rating: restaurant.rating, allRatings: restaurant.allRatings, id: restaurant._id, view: restaurant.view},
      new: true,
    }, function (err, dbRestaurant) {
      if (err) {
        console.log("Error in updateRestaurant");
        console.log(err);
      } else if (dbRestaurant) {
        functions.retrieveRestaurants(request, response); //Retrieve update restaurants and send them back to the client.
      } else {
        console.log("No match?");
        console.log(dbRestaurant);
      }
    })
  }
}

exports.functions = functions;