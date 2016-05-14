var request            = require('request');
var temperatureService = require('./temperatureService');
var services           = ["temperature"];

this.delegateMessage = function(parsedMessage, callback) {
  var serviceId;
  console.log(parsedMessage);
  for(serviceId = 0; serviceId < services.length; i++)
    if(parsedMessage["intent"].indexOf(services[serviceId]) > -1) break;
  switch(serviceId){
    case 0: temperatureService.run(parsedMessage, callback);
  }
}