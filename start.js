//GLOBAL VARIABLES

//REQUIRED MODULES
var router = require("./router.js");

var startServer = function () {

  //Turn on the controllers.

  //Start the router.  Server technically starts inside the router via http.createServer(); ... don't ask.
  router.router();

}

startServer();

exports.startServer = startServer;