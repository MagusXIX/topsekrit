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