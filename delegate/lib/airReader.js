var client = require("./serverMasterSender");
var threshold = 150;
var air = new (require("jsupm_gas").TP401)(0)
var prev = 0,
  half = 150 / 2;

setInterval(function() {
    var quality = air.getSample();
    if (prev <= 150 && quality > 150 && prev !== 0) { alert(quality); }
    prev = quality;
}, 1000);

function alert(message){
    server.sendNotification("The air quality dropped to " + message + "!");
}