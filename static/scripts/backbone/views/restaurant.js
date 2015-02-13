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