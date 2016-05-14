var request = require('request');
var url = "http://172.16.41.9:8080/";

this.run = function(parsedMessage, callback){
  switch(parsedMessage["intent"]){
    case "get temperature": getTemperature(callback);
  }
}

var getTemperature = function(callback) {
  request({
      uri: url,
      method: "GET"
    }, function (err, res, body) {
      var temperatureInfo = JSON.parse(body);
      var temperature = temperatureInfo["Sensors"]["Temperature"]["Current"]["Celsius"];
      callback(temperature);
    });
}