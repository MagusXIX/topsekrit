//Global Variables

//Required Modules
var fs = require("fs");

var respond = function(request, response, write){
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(write);
  response.end();
}

var index = function (request, response) {
  fs.readFile("./views/statics/mainView.html", function (err, data) {
  	if (err) {
      console.log("YO! WE HAVE AN ERROR OVER HERE!");
      console.log(err);
  	}
    respond(request, response, data);
  });
}

exports.index = index;