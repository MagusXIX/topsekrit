//GET RESTAURANTS FOR INITIAL PAGE LOAD, THEN RUN THE REST OF THE APP
var restaurants;

$.get("/getRestaurants", function (data) {
  restaurants = JSON.parse(data);

  //Set the ID of each restaurant equal to its database ID
  for (i = 0; i < restaurants.length; i++) {
    restaurants[i].id = restaurants[i]._id;
  }

  run();  //YEAH, RUN! https://www.youtube.com/watch?v=1mENGatJBaY
})

var run = function () {
  //MODELS
  var app = {};

  app.Restaurant = Backbone.Model.extend({
      defaults: {
          id: ''
        , name: ''
        , imagePath: ''
        , rating: ''
        , allRatings: ''
      },
      url: "/updateRestaurant"
  });

  var restaurant = new app.Restaurant(); //For declaring new restaurants.

  //COLLECTIONS
  app.Restaurants = Backbone.Collection.extend({
      url: "/getRestaurants"
    , model: app.Restaurant
  })

  //LOAD THE INITIAL RESTAURANTS INTO THE COLLECTION
  var loadedRestaurants = new app.Restaurants(restaurants);

  //DECLARE COLLECTION AND FETCH ITS MODELS FROM SERVER
  var fetchedRestaurants = new app.Restaurants();
  fetchedRestaurants.fetch({
    success: function () {
      //in case you need to do something immediately after restaurants are fetched
    },
    error: function () {
      console.log("Error fetching restaurants from server.");
    }
  })

  //VIEWS

  //Manage view for each individual restaurant
  app.RestaurantView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#restaurant-template").html()),
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      $("#restaurantImg").attr("src", restaurants[i].image);
      return this;
    }
  });

  //Define the main view for the app
  app.MainView = Backbone.View.extend({
    el: '#mainCan',
    initialize: function () {
      for (i = 0; i < restaurants.length; i++) {
        this.addRestaurant();
      }
    },
    events: {
      "click .rating": "addRating"
    },
    addRestaurant: function () {
      var view = new app.RestaurantView({model: restaurant});
      $('#mainCan').append("<img src='"+restaurants[i].image+"' class='restaurantImg' alt='WTFM8'></img>")
      var thisStarCan = 'starCan' + i.toString();
      $('#mainCan').append("<div id='"+thisStarCan+"' class='starCan'></div>")
      $('#mainCan').append(view.render().el);
      for (d = 0; d < Math.ceil(restaurants[i].rating); d++) {
        $('#starCan'+i).append("<img id='"+d+"' class='rating' src='/redStar.png' alt='WTFM8' data-rating='"+d+"' data-owner='"+restaurants[i]._id+"'></img>")
      }

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
    },
    addRating: function (e) {
      console.log("Click.");
      var rating = $(e.target).data('rating') + 1;
      var owner = $(e.target).data('owner');
      var thisModel = loadedRestaurants.get(owner);
      thisModel.attributes.allRatings.push(rating);

      var findNewRating = function () {
        var newRating = Math.round((count / thisModel.attributes.allRatings.length) * 100) / 100;
        thisModel.attributes.rating = newRating;
      }

      var count = 0;
      for (x = 0; x < thisModel.attributes.allRatings.length; x++) {
        count += thisModel.attributes.allRatings[x];
        if (x == thisModel.attributes.allRatings.length - 1) {
          findNewRating();
        }
      }

      thisModel.save({}, {
        success: function () {
          console.log("Succeeded?");
        },
        error: function () {
          console.log("Failed?");
        }
      });
    }
  })

  app.mainView = new app.MainView(); //Instantiate the main view for the app.
}

/*var restaurants;

  $.get("/getRestaurant", function (data) {
    restaurants = JSON.parse(data);
    run();  //YEAH, RUN! https://www.youtube.com/watch?v=1mENGatJBaY
  })

  var run = function () {
  //MODELS
  var app = {};

  app.Restaurant = Backbone.Model.extend({
      defaults: {
          name: ''
        , imagePath: ''
        , rating: ''
        , allRatings: ''
      }
  });

  var restaurant = new app.Restaurant();

  //COLLECTIONS
  app.Restaurants = Backbone.Collection.extend({
      model: app.Restaurant
  });

  app.Restaurants = new app.Restaurants();

  //VIEWS
  app.RestaurantView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#restaurant-template").html()),
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      $("#restaurantImg").attr("src", restaurants[i].image);
      return this;
    }
  });

  app.RestaurantViews = Backbone.View.extend({
    el: '#mainCan',
    initialize: function () {
      for (i = 0; i < restaurants.length; i++) {
        this.addRestaurant();
      }
    },
    events: {
      "click .rating": "addRating"
    },
    addRestaurant: function () {
      var view = new app.RestaurantView({model: restaurant});
      $('#mainCan').append("<img src='"+restaurants[i].image+"' class='restaurantImg' alt='WTFM8'></img>")
      var thisStarCan = 'starCan' + i.toString();
      $('#mainCan').append("<div id='"+thisStarCan+"' class='starCan'></div>")
      $('#mainCan').append(view.render().el);
      for (d = 0; d < Math.ceil(restaurants[i].rating); d++) {
        $('#starCan'+i).append("<img id='"+d+"' class='rating' src='/redStar.png' alt='WTFM8' data-rating='"+d+"'></img>")
      }

      //Manage star hover states with jQuery
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
    },
    addRating: function (e) {
      var rating = $(e.target).data('rating') + 1;

    }
  })

  app.restaurantView = new app.RestaurantViews();
}*/