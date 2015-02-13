//Global Variables
var serverport = 80;
var myAddress = '0.0.0.0';

//Required Modules
var http = require("http");
var url = require("url");
var qs = require("querystring");
var st = require("st");
var mount = st({path: __dirname + '/static', url: 'static'});
var mainController = require("./controllers/mainController.js");

//Routes
var router = function () {
  var onRequest = function (request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    var params = url.parse(request.url).query;
    var stHandled = mount(request, response);

    if (stHandled) {
      return;
    } else if (pathname == "/") {
      mainController.functions.index(request, response);
    } else if (pathname == "/updateRestaurant") {
      console.log("Routing single restaurant.");
      request.on('data', function (chunk) {
        var data = chunk.toString();
        var dataJSON = JSON.parse(data);
        mainController.functions.updateRestaurant(request, response, dataJSON);
      })
    } else if (pathname == "/getRestaurants") {
      console.log("Routing get request.");
      mainController.functions.getRestaurants(request, response);
    } else if (pathname == "/bundle.js") {
      console.log("Routing bundle!");
      mainController.functions.bundle(request, response);
    }

  }
  
  //Starting the server.
  var server = http.createServer(onRequest).listen(serverport, myAddress);
  console.log("Server is running on port " + serverport + ".");
  
};

exports.router = router;