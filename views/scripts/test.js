//MODELS
var app = {};

app.Restaurant = Backbone.Model.extend({
    defaults: {
        name: 'Wilkinsons Family Restaurant'
      , imagePath: '/wilkinson.jpg'
      , rating: '4.88'
      , ratingsCount: '13'
    }
  , url: "/restaurantModel"
});

var restaurant = new app.Restaurant();

//COLLECTIONS
app.Restaurants = Backbone.Collection.extend({
    model: app.Restaurant
  , url: "/restaurantCollection"
  , 
});

app.Restaurants = new app.Restaurants();

//VIEWS
app.RestaurantView = Backbone.View.extend({
    el: '#container'
  , template: _.template($("#restaurant-template").html())
  , initialize: function () {
      this.render();
    }
  , render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }
});

var appView = new app.RestaurantView({model: restaurant});