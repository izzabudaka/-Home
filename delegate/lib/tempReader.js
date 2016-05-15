/*jslint node:true,vars:true,bitwise:true,unparam:true */

var B = 3975;
var mraa = require("mraa");

var tempSensorPort = 0;
var tempSensorAioPort = new mraa.Aio(tempSensorPort);

var getTempReadout = function(callback) {
    var tempSensorReadout = tempSensorAioPort.read();
    var resistance = (1023 - tempSensorReadout) * 10000 / tempSensorReadout;
    var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;
    console.log("Reading Temp - Celsius Temperature " + celsius_temperature); 
    var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;

    var json = JSON.stringify({ 
        SystemInfo : {
            CurrentTime: new Date().toISOString(),
        },
        Sensors: {
            Temperature: {
                Current: {
                    Celsius: celsius_temperature,
                    Fahrenheit: fahrenheit_temperature
                }
            }
        }
    }, null, '\t');
    callback(json);
};

setInterval(function(){
    var currentTemperature = getTempReadout();
    if(currentTemperature.Celsius > 30)  {
        server.sendNotification("Temperature is " + currentTemperature.Celsius + "C.");
    }
}, 1000);