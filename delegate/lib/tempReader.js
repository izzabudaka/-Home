/*jslint node:true,vars:true,bitwise:true,unparam:true */

var B      = 3975;
var mraa   = require("mraa");
var server = require("./serverMasterSender");

var tempSensorPort    = 0;
var tempSensorAioPort = new mraa.Aio(tempSensorPort);

var getTempReadout = function(callback) {
    var tempSensorReadout = tempSensorAioPort.read();
    var resistance = (1023 - tempSensorReadout) * 10000 / tempSensorReadout;
    var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;
    console.log("Reading Temp - Celsius Temperature " + celsius_temperature); 
    var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;

    var json = { 
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
    };
    callback(json);
};

this.getTempReadout = getTempReadout;

setInterval(function(){
        getTempReadout( function(currentTemp){
            if(currentTemp.Sensors.Temperature.Current.Celsius > 30)  {
                server.sendNotification("Temperature is " + currentTemp.Sensors.Temperature.Current.Celsius + "C.");
            }
        });
}, 1000);