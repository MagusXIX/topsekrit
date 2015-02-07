//GET RESTAURANTS FOR INITIAL PAGE LOAD, THEN RUN THE REST OF THE APP
var restaurants, view;

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
        , image: ''
        , rating: ''
        , allRatings: ''
        , view: '' //Storing the view here is sloppy, but expedient. Streamline later.
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

  //VIEWS

  //Manage view for each initial restaurant
  app.InitialRestaurantView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.render();
    },
    render: function () {
      for (i = 0; i < restaurants.length; i++) {
        $('#mainCan').append("<img src='"+restaurants[i].image+"' class='restaurantImg' alt='WTFM8'></img>")
        $('#mainCan').append("<p>"+restaurants[i].name+"</p>")
        var thisStarCan = 'starCan' + i.toString();
        $('#mainCan').append("<div id='"+thisStarCan+"' class='starCan'></div>")
        for (d = 0; d < Math.ceil(restaurants[i].rating); d++) {
          $('#starCan'+i).append("<img id='"+d+"' class='rating' src='/redStar.png' alt='WTFM8' data-rating='"+d+"' data-owner='"+restaurants[i]._id+"'></img>")
        }
        $('#mainCan').append("<p>"+restaurants[i].allRatings.length+" users rated this at "+restaurants[i].rating+"</p>");
      }
      return this;
    }
  });

  //Manage view for each modified restaurant
  app.AdjustedRestaurantView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.render();
    },
    render: function () {
      for (i = 0; i < loadedRestaurants.models.length; i++) {
        $('#mainCan').append("<img src='"+loadedRestaurants.models[i].attributes.image+"' class='restaurantImg' alt='WTFM8'></img>")
        $('#mainCan').append("<p>"+loadedRestaurants.models[i].attributes.image+"</p>")
        var thisStarCan = 'starCan' + i.toString();
        $('#mainCan').append("<div id='"+thisStarCan+"' class='starCan'></div>")
        for (d = 0; d < Math.ceil(loadedRestaurants.models[i].attributes.rating); d++) {
          $('#starCan'+i).append("<img id='"+d+"' class='rating' src='/redStar.png' alt='WTFM8' data-rating='"+d+"' data-owner='"+loadedRestaurants.models[i].attributes._id+"'></img>")
        }
        $('#mainCan').append("<p>"+loadedRestaurants.models[i].attributes.allRatings.length+" users rated this at "+loadedRestaurants.models[i].attributes.rating+"</p>");
      }
      return this;
    }
  })

  //Define the main view for the app
  app.MainView = Backbone.View.extend({
    el: '#mainCan',
    initialize: function () {
      this.addRestaurant();
    },
    events: {
      "click .rating": "addRating",
    },
    addRestaurant: function () {
      view = new app.InitialRestaurantView({model: restaurant});
      for (i = 0; i < loadedRestaurants.models.length; i++) {
        loadedRestaurants.models[i].view = view;
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
    addRating: function (e) { //Adds a new rating to allRatings, calculates new rating, updates model.
      console.log("Adding rating.");
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

      thisModel.save();
      this.updateViews(owner); //now that the data is updated, change the views to reflect new information
    },
    updateViews: function (owner) {
      console.log("Updating views.");
      //Fetching here is slower than just updating views with information already in the client
      //But I'm starting here because it makes the app more bulletproof in the face of many users
      //By pulling the info from the database before updating views, we always have the latest info.
      //That's the theory, anyway.  Time crunch!
      //TODO: update views with data already in client, then create function that updates from db periodically
      loadedRestaurants.fetch();

      for (i = 0; i < loadedRestaurants.models.length; i++) {
        loadedRestaurants.models[i].view.remove;
        console.log(loadedRestaurants.models[i].view.remove);
      }

      view = new app.AdjustedRestaurantView({model: restaurant});
    }
  })

  app.mainView = new app.MainView(); //Instantiate the main view for the app.
}