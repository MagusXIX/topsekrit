//GLOBALS
var restaurants;

//MODULES
var restaurantModel = require("../models/restaurant.js");
var restaurantView = require("../views/restaurant.js");

var Restaurants = Backbone.Collection.extend({
  url: "/getRestaurants",
  model: restaurantModel.Restaurant
})

Restaurants.initialize = function (initialRestaurants) {
  restaurants = new Restaurants(initialRestaurants);
  return restaurants;
}

Restaurants.collectionPasser = function () {
  return restaurants;
}

Restaurants.updateRatings = function (rating, owner) {
  var count = 0;
  var thisOwner = restaurants.get(owner);
  thisOwner.attributes.allRatings.push(rating);
  for (x = 0; x < thisOwner.attributes.allRatings.length; x++) {
    count += thisOwner.attributes.allRatings[x];
    if (x == thisOwner.attributes.allRatings.length - 1) {
      var newRating = Math.round((count / thisOwner.attributes.allRatings.length) * 100) / 100;
      thisOwner.attributes.rating = newRating;
      thisOwner.save();
      restaurantView.Restaurant.updateView(restaurants);
    }
  } 
}

exports.Restaurants = Restaurants;