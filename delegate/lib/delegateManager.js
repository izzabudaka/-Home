/*jslint node:true,vars:true,bitwise:true,unparam:true */

var temp      = require('./tempReader');
var light     = require("./lightReader_send");
var delegates = ["temperature", "light"];

this.run = function(parsedMessage, callback) {
  var delegateId;
  console.log(parsedMessage);
  for(delegateId = 0; delegateId < delegates.length; delegateId++)
    if(parsedMessage.intent.indexOf(delegates[delegateId]) > -1) break;
  console.log(delegateId);
  switch(delegateId) {
    case 0: temp.getTempReadout(callback); break;
    case 1: light.getLight(callback); break;
  }
};