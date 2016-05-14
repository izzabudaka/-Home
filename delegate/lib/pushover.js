/*jslint node:true,vars:true,bitwise:true,unparam:true */

var request = require('request');

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};
 
// Configure the request


this.sendNotification = function(title, message) {
    console.log("Sending pushover notification: "  + title + " - " + message);
    var options = {
    url: 'https://api.pushover.net/1/messages.json',
    method: 'POST',
    headers: headers,
        form: {
            'token': 'au2rh94kforu73giwsdjk2kog2v941',
            'user': 'uKxS7xztCghmvANUiD1oerYwvpysXH',
            'message': message,
            'title': title,
        }
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
};