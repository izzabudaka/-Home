var temp      = require('./tempReader');
var light     = require('./lightReader_send');
var delegates = ["temperature", "light"];

this.run = function(parsedMessage, callback){
  var delegateId;
  console.log(parsedMessage);
  for(serviceId = 0; delegateId < delegates.length; delegateId++)
    if(parsedMessage["intent"].indexOf(delegates[delegateId]) > -1) break;
  switch(delegateId){
    case 0: temp.getTempReadout(callback),
    case 1: light.getLight(callback),
  }
}