/*jslint node:true,vars:true,bitwise:true,unparam:true */

var http = require('http');
var delegateManager = require('./lib/delegateManager');

require("./lib/lightReader_send");
require("./lib/airReader");
require("./lib/tempReader");

console.log("Starting nodejs server.");

function getPostBody(req, callback) {
    if (req.method == 'POST') {
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            callback(JSON.parse(jsonString));
        });
    }
}

function handler (request, response) {
    'use strict';
    console.log(request);
    getPostBody(request, function(message){
        response.writeHead(200, {"Content-Type": "application/json"});
        delegateManager.run(message, function(result){
            console.log(result);
            response.end(JSON.stringify(result));
        });
    });
}

http.createServer(handler).listen(8080);
