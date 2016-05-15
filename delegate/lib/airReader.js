/*jslint node:true,vars:true,bitwise:true,unparam:true */

var client = require("./serverMasterSender");
var threshold = 150;
var air = new (require("jsupm_gas").TP401)(1);
var prev = 0,
  half = 150 / 2;

setInterval(function() {
    var quality = air.getSample();
    console.log(quality);
    if (prev <= 150 && quality > 150 && prev !== 0) { alert(quality); }
    prev = quality;
}, 1000);

function alert(message){
    client.sendNotification("The air quality dropped to " + message + "!");
}