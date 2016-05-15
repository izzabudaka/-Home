/*jslint node:true,vars:true,bitwise:true,unparam:true */

var temp      = require('./tempReader');
var delegates = ["temperature"];

this.run = function(parsedMessage, callback){
  var delegateId;
  console.log(parsedMessage);
  for(var serviceId = 0; delegateId < delegates.length; delegateId++)
    if(parsedMessage.intent.indexOf(delegates[delegateId]) > -1) break;
  switch(delegateId){
    case 0: temp.getTempReadout(callback); break;
  }
};