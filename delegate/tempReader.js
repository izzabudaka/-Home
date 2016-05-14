/*jslint node:true,vars:true,bitwise:true,unparam:true */

var B = 3975;
var mraa = require("mraa");

var tempSensorPort = 0;
var tempSensorAioPort = new mraa.Aio(tempSensorPort);

this.getTempReadout = function() {
        var tempSensorReadout = tempSensorAioPort.read();
        console.log("Reading Temp - Starting");
        var resistance = (1023 - tempSensorReadout) * 10000 / tempSensorReadout;
        console.log("Reading Temp - Resistance: "+resistance);
        var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;
        console.log("Reading Temp - Celsius Temperature "+celsius_temperature); 
        var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
        console.log("Reading Temp - Fahrenheit Temperature: " + fahrenheit_temperature);
        return {
            Celsius: celsius_temperature,
            Fahrenheit: fahrenheit_temperature
        };
};