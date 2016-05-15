var request = require('request');
var url = "http://172.16.41.9:8080/";

this.run = function(parsedMessage, callback){
  switch(parsedMessage["intent"]){
    case "get light": getLight(parsedMessage, callback);
  }
}

var getLight = function(parsedMessage, callback) {
  console.log(parsedMessage);
  request({
      uri: url,
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedMessage)
    }, function (err, res, body) {
      callback(body);
    });
}