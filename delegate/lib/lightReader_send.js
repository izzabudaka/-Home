// Load Grove module
var client = require("./serverMasterSender");

// Create the light sensor object using AIO pin 0
var light = new (require('jsupm_grove').GroveLight)(0);

var threshold = 300;
var prev = 0;

// Read the input and print both the raw value and a rough lux value,
// waiting one second between readings
this.getLight = function(callback){
  var lightValue = light.raw_value();
  if(lightValue > 300){
    callback("The light is on.");
  } else{
    callback("The light is off.");
  }
};

setInterval(function() {
    var rawvalue = light.raw_value();
    if (rawvalue > 300 && prev !== 0) { alert(rawvalue); }
    prev = rawvalue;
}, 1000);


function alert(message){
    server.sendNotification("The " + light.name() + " senses bright light level! It is at " + message + " !");
}