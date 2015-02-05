//Global Variables

//Required Modules
var fs = require("fs");

var respond = function(request, response, write){
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(write);
  response.end();
}

var functions = {
  index: function (request, response) {
    fs.readFile("./views/statics/mainView.html", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      respond(request, response, data);
    });
  },


  //------
  //IMAGES
  //------
  doubler: function (request, response) {
    fs.readFile("./views/css/images/doubler.jpg", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      respond(request, response, data);
    })
  },

  wilkinson: function (request, response) {
    fs.readFile("./views/css/images/wilkinson.jpg", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      respond(request, response, data);
    })
  },

  fiveStar: function (request, response) {
    fs.readFile("./views/css/images/fiveStar.png", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      respond(request, response, data);
    })
  },

  //-----------
  //STYLESHEETS
  //-----------
  stylus: function (request, response) {
    fs.readFile("./views/css/stylus.css", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      response.setHeader('content-type', 'text/css');
      respond(request, response, data);
    })
  },

  //-------
  //SCRIPTS
  //-------
  testjs: function (request, response) {
    fs.readFile("./views/scripts/test.js", function (err, data) {
      if (err) {
        console.log("YO! WE HAVE AN ERROR OVER HERE!");
        console.log(err);
      }
      response.setHeader('content-type', 'text/javascript');
      respond(request, response, data);
    })
  },

}

exports.functions = functions;