//Global Variables
var serverport = 80;
var myAddress = '0.0.0.0';

//Required Modules
var http = require("http");
var url = require("url");
var qs = require("querystring");
var userController = require("./controllers/userController.js");

//Starting the Server
var router = function () {
  var onRequest = function (request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    var params = url.parse(request.url).query;
    
    if (pathname == "/") {
      userController.index(request, response);
    }

  }
  
  var server = http.createServer(onRequest).listen(serverport, myAddress);
  console.log("Server is running on port " + serverport + ".");
  
};

exports.router = router;