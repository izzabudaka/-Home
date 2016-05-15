var request            = require('request');
var temperatureService = require('./temperatureService');
var lightService       = require('./lightService');
var lcdService         = require('./lcdService');
var services           = ["temperature", "light", "message"];

this.delegateMessage = function(parsedMessage, callback) {
  var serviceId;
  console.log(parsedMessage);
  for(serviceId = 0; serviceId < services.length; serviceId++)
    if(parsedMessage["intent"].indexOf(services[serviceId]) > -1) break;
  switch(serviceId){
    case 0: temperatureService.run(parsedMessage, callback);
    case 1: lightService.run(parsedMessage, callback);
    case 2: lcdService.run(parsedMessage, callback);
  }
}