var client = require("./serverMasterSender");
var light  = new (require('jsupm_grove').GroveLight)(2);

var threshold = 300;
var prev = 0;

this.getLight = function(callback){
  var lightValue = light.raw_value();
  if(lightValue > 300){
    callback("The light is on.");
  } else {
    callback("The light is off.");
  }
};

setInterval(function() {
    var rawvalue = light.raw_value();
    if (rawvalue > 800 && prev !== 0) { alert(rawvalue); }
    prev = rawvalue;
    console.log(rawvalue);
}, 1000);


function alert(message){
    client.sendNotification("The " + light.name() + " senses bright light level! It is at " + message + " !");
}