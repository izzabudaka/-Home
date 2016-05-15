var http = require('http');
var delegateManager = require('./lib/delegateManager');

require("./lib/airReader");
require("./lib/tempReader");
require("./lib/lightReader_send");

console.log("Starting nodejs server.");

function handler (request, response) {
    'use strict';
    console.log("Server readout requested.");
    response.writeHead(200, {"Content-Type": "application/json"});
    delegateManager.run(request.body, function(result){
        response.end(JSON.stringify(result));
    });
}

http.createServer(handler).listen(8080);
