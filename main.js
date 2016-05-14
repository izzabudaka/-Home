/*jslint node:true,vars:true,bitwise:true,unparam:true */
/*jshint unused:true */

var http = require('http');
var app = http.createServer(handler);
var io = require('socket.io')(app);
var temp = require('./lib/tempReader');
var airQuality = require("./lib/airReader");
//var pushover = require('./lib/pushover');
var server = require('./lib/serverMasterSender');
var cameraEngine = require('./lib/CameraEngine.js');
var motionDetector = require('./lib/MotionDetector.js');

console.log("Starting nodejs server.");
addSocketEvent(temp.getTempReadout, 4);
app.listen(8080);

//Create Socket.io server
function handler (request, response) {
    'use strict';
    console.log("Server readout requested.");
    
    response.writeHead(200, {"Content-Type": "application/json"});
    
    var json = JSON.stringify({ 
        SystemInfo : {
            CurrentTime: new Date().toISOString(),
        },
        Sensors: {
            Temperature: {
                Current: temp.getTempReadout(),
                Avg5minCelsius: {
                    "Celsius": 0,
                    "Fahrenheit": 32
                },
                Avg15minCelsius: {
                    "Celsius": 0,
                    "Fahrenheit": 32
                },
            }
        }
    }, null, '\t');
  response.end(json);
}

function addSocketEvent(getEvent, seconds) {
    'use strict';
    setInterval(function () {
        io.emit("message", getEvent());
    }, seconds * 1000);
}

function motionDetectionCallback() {
	var picturePath = cameraEngine.TakePicture('Intruder Detected');
	console.log('callback executed');
	/*server.sendNotification("Temperature is " + currentTemperature.Celsius + "C.");*/
}

function MonitorHouseforBurglars() {
	motionDetector.MonitorHomeForMotion(motionDetectionCallback());
}

MonitorHouseforBurglars();

setInterval(function(){
    var currentTemperature = temp.getTempReadout();
    if(currentTemperature.Celsius > 30)  {
        server.sendNotification("Temperature is " + currentTemperature.Celsius + "C.");
    }
}, 1000);

