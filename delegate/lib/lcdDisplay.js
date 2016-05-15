/*jslint node:true,vars:true,bitwise:true,unparam:true */

var mraa = require ('mraa');
var LCD  = require ('jsupm_i2clcd');

var light = new mraa.Aio(3);
var lightValue;
var lcdMessage="Welcome";
var myLcd = new LCD.Jhd1313m1(6, 0x3E, 0x62);

this.setMessage = function(message){
    lcdMessage = message;
};

var displayValue = function(callback){
    myLcd.setCursor(0,0);
    myLcd.setColor(255, 255, 255);
    myLcd.write("Message:");  
    myLcd.setCursor(1,1);
    myLcd.write(lcdMessage);
    if (typeof callback !== "undefined") {
        callback("Message set to: lcdMessage");
    }
};

this.displayValue = displayValue;

setInterval(displayValue, 500);