//GET RESTAURANTS THEN RUN THE REST OF THE APP
var restaurants;

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
        , ratingsCount: ''
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
      tagName: 'li'
    , template: _.template($("#restaurant-template").html())
    , initialize: function () {
        this.render();
      }
    , render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        $("#restaurantImg").attr("src", restaurants[i].image);
        return this;
      }
  });

  app.RestaurantViews = Backbone.View.extend({
      el: '#mainCan'
    , initialize: function () {
        for (i = 0; i < restaurants.length; i++) {
          this.addRestaurant();
        }
      }
    , addRestaurant: function () {
      var view = new app.RestaurantView({model: restaurant});
      $('#mainCan').append("<img src='"+restaurants[i].image+"' class='restaurantImg' alt='WTFM8'></img>")
      var thisStarCan = 'starCan' + i.toString();
      $('#mainCan').append("<div id='"+thisStarCan+"'></div>")
      $('#mainCan').append(view.render().el);
      for (d = 0; d < Math.round(restaurants[i].rating); d++) {
        $('#starCan'+i).append("<img class='rating' src='/redStar.png' alt='WTFM8'></img>")
      }
    }
  })

  app.restaurantView = new app.RestaurantViews();
}