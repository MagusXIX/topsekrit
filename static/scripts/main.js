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