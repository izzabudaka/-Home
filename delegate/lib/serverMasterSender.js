/*jslint node:true,vars:true,bitwise:true,unparam:true */

var request = require('request');

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};
 
// Configure the request


this.sendNotification = function( message) {
    console.log("Sending server notification: " + message);
    var options = {
        url: 'http://062d06e8.ngrok.io/delegate',
        method: 'POST',
        body: message
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
};

