//Global Variables
var serverport = 80;
var myAddress = '0.0.0.0';

//Required Modules
var http = require("http");
var url = require("url");
var qs = require("querystring");
var mainController = require("./controllers/mainController.js");

//Routes
var router = function () {
  var onRequest = function (request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    var params = url.parse(request.url).query;
    
    if (pathname == "/") {
      mainController.functions.index(request, response);
    }


    //------
    //IMAGES
    //------
    if (pathname == "/doubler.jpg") {
      mainController.functions.doubler(request, response);
    }

    if (pathname == "/wilkinsons.jpg") {
      mainController.functions.wilkinson(request, response);
    }

    if (pathname == "/redStar.png") {
      mainController.functions.redStar(request, response);
    }

    //-----------
    //STYLESHEETS
    //-----------
    if (pathname == "/css/stylus.css") {
      mainController.functions.stylus(request, response);
    }

    //-------
    //SCRIPTS
    //-------

    if (pathname == "/scripts/handlebars-v3.0.0.js") {
      mainController.functions.handlebars(request, response);
    }

    if (pathname == "/scripts/test.js") {
      mainController.functions.testjs(request, response);
    }

    if (pathname == "/updateRestaurant") {
      console.log("Routing single restaurant.");
      request.on('data', function (chunk) {
        var data = chunk.toString();
        var dataJSON = JSON.parse(data);
        mainController.functions.updateRestaurant(request, response, dataJSON);
      })
    }

    if (pathname == "/getRestaurants") {
      mainController.functions.getRestaurants(request, response);
    }

  }
  
  //Starting the server.
  var server = http.createServer(onRequest).listen(serverport, myAddress);
  console.log("Server is running on port " + serverport + ".");
  
};

exports.router = router;