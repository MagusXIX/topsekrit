//GLOBAL VARIABLES
var databaseUrl = "localhost/topsekrit";
var collections = ["restaurants"];

//REQUIRED MODULES
var db = require("mongojs").connect(databaseUrl, collections);

var functions = {
  model: function (restaurant) {
    var restaurantInstance = {
        name: restaurant.name //string
      , image: restaurant.image //path to the image, a string
      , rating: restaurant.rating //float, average of allRatings
      , allRatings: restaurant.allRatings //array of floats
    };

    return restaurantInstance;
  },

  createInitials: function () {
    var wilkinsons = {
        name: "Wilkinson's Family Restaurant"
      , image: "../css/images/wilkinsons.jpg"
      , rating: 0
      , allRatings: []
    }
    db.restaurants.save(this.model(wilkinsons), function (err, data) {
      if (err) {
        console.log("Error saving Wilkinson's");
        console.log(err);    }
    });

    var doubler = {
        name: "Double R Diner"
      , image: "../css/images/doubler.jpg"
      , rating: 0
      , allRatings: []
    }
    db.restaurants.save(this.model(doubler), function (err, data) {
      if (err) {
        console.log("Error saving Double R");
        console.log(err);    
      }
    });
  }
}

exports.functions = functions;