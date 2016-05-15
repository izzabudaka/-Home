var request = require('request');

var alert = function(quality){
    request({
      uri: "http://062d06e8.ngrok.io/delegate",
      method: "POST",
      data: "The quality has dropped to " + quality
    }, function (err, res, body) {
      console.log(body);
    });
}

var threshold = 150;
var prev = 0,
  half = threshold / 2;

setInterval(function() {
var quality = air.getSample();
if (prev <= threshold && quality > threshold && prev !== 0) { alert(quality); }
prev = quality;
}, 1000);