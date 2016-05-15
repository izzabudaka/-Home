/*jslint node:true,vars:true,bitwise:true,unparam:true */

var http = require('http');
var delegateManager = require('./lib/delegateManager');

require("./lib/lightReader_send");
require("./lib/airReader");
require("./lib/tempReader");

console.log("Starting nodejs server.");

function handler (request, response) {
    'use strict';
    console.log("Server readout requested.");
    var message = JSON.parse(request.body);
    response.writeHead(200, {"Content-Type": "application/json"});
    delegateManager.run(message, function(result){
        response.end(JSON.stringify(result));
    });
}

http.createServer(handler).listen(8080);
