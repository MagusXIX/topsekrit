(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../models/restaurant.js":2,"../views/restaurant.js":3}],2:[function(require,module,exports){
var Restaurant = Backbone.Model.extend({
    defaults: {
        id: ''
      , name: ''
      , image: ''
      , rating: ''
      , allRatings: ''
      , starCan: ''
    },
    url: "/updateRestaurant"
});

exports.Restaurant = Restaurant;
},{}],3:[function(require,module,exports){
var restaurantsCollection = require("../collections/restaurants.js");
var restaurantModel = require("../models/restaurant.js");

var Restaurant = Backbone.View.extend({
  el: "#mainCan",
  template: Handlebars.compile($("#restaurant-template").html()),
  initialize: function () {
    this.render();
  },
  render: function () {
    var restaurants = restaurantsCollection.Restaurants.collectionPasser();
    for (i = 0; i < restaurants.models.length; i++) {
      $("#mainCan").append(this.template(restaurants.models[i].attributes));
      for (d = 0; d < Math.ceil(restaurants.models[i].attributes.rating); d++) {
        //HTML for the stars written here. Gross, but maybe a bit less gross than another backbone view for just one image?
        $('#starCan'+i).append("<img id='"+d+"' class='rating' src='.../../static/css/images/redStar.png' alt='WTFM8' data-rating='"+d+"' data-owner='"+restaurants.models[i].attributes._id+"'></img>")
      }
    }
    return this;
  }
})

Restaurant.updateView = function (restaurants) {
  console.log("updating view.");
  $(".restaurant").remove();
  $(".clear").remove();
  var restaurant = new restaurantModel.Restaurant();
  var view = new Restaurant({model: restaurant});

  //Manage star hover states with jQuery, TODO: find a way to do this in CSS instead
  $(function () {
    $(".starCan").mouseenter(function () {
      var self = this;
      var stars = $("#"+self.id+" .rating");
      $("#"+self.id+" .rating").hover(function () {
        for (z in stars) {
          if (stars[z].id > this.id) {
            $("#"+self.id+" #"+stars[z].id).hide();
          }
        }
      })
    }).mouseleave(function () {
      $(".starCan .rating").show();
    })
  })

  //When a rating is clicked, updates everything with new ratings.
  $(".rating").click(function (e) {
    var rating = $(e.target).data('rating') + 1;
    var owner = $(e.target).data('owner');
    restaurantsCollection.Restaurants.updateRatings(rating, owner);
  })
}

exports.Restaurant = Restaurant;
},{"../collections/restaurants.js":1,"../models/restaurant.js":2}],4:[function(require,module,exports){
//GET RESTAURANTS FOR INITIAL PAGE LOAD, THEN RUN THE REST OF THE APP
var initialRestaurants, restaurants, view;

//REQUIRED MODULES
var restaurantsCollection = require("./backbone/collections/restaurants.js");
var restaurantModel = require("./backbone/models/restaurant.js");
var restaurantView = require("./backbone/views/restaurant.js");

$.get("/getRestaurants", function (data) {
  initialRestaurants = jQuery.parseJSON(data);

  //Set the ID of each restaurant equal to its database ID
  for (i = 0; i < initialRestaurants.length; i++) {
    initialRestaurants[i].id = initialRestaurants[i]._id;
    initialRestaurants[i].starCan = "starCan"+i;
  }

  run();
})

//Controls the flow of the app.
var run = function () {
  app.instantiateCollection();
  app.instantiateViews();
}

var app = {
  instantiateCollection: function () {
    restaurants = restaurantsCollection.Restaurants.initialize(initialRestaurants);
  },
  instantiateViews: function () {
    var restaurant = new restaurantModel.Restaurant();
    view = new restaurantView.Restaurant({model: restaurant});

    //Manage star hover states with jQuery, TODO: find a way to do this in CSS instead
    $(function () {
      $(".starCan").mouseenter(function () {
        var self = this;
        var stars = $("#"+self.id+" .rating");
        $("#"+self.id+" .rating").hover(function () {
          for (z in stars) {
            if (stars[z].id > this.id) {
              $("#"+self.id+" #"+stars[z].id).hide();
            }
          }
        })
      }).mouseleave(function () {
        $(".starCan .rating").show();
      })
    })

    //When a rating is clicked, updates everything with new ratings.
    $(".rating").click(function (e) {
      var rating = $(e.target).data('rating') + 1;
      var owner = $(e.target).data('owner');
      restaurantsCollection.Restaurants.updateRatings(rating, owner);
    })
  }
}
},{"./backbone/collections/restaurants.js":1,"./backbone/models/restaurant.js":2,"./backbone/views/restaurant.js":3}]},{},[4]);
