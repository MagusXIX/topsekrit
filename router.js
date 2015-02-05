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

    if (pathname == "/wilkinson.jpg") {
      mainController.functions.wilkinson(request, response);
    }

    if (pathname == "/fiveStar.png") {
      mainController.functions.fiveStar(request, response);
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
    if (pathname == "/scripts/test.js") {
      mainController.functions.testjs(request, response);
    }

  }
  
  //Starting the server.
  var server = http.createServer(onRequest).listen(serverport, myAddress);
  console.log("Server is running on port " + serverport + ".");
  
};

exports.router = router;