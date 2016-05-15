var mraa = require ('mraa');
var LCD  = require ('jsupm_i2clcd');

var light = new mraa.Aio(3);
var lightValue;
var lcdMessage="Foobar";
var myLCD = new LCD.Jhd1313m1(6, 0x3E, 0x62);

this.setMessage = function(message){
    lcdMessage = message;
};

this.displayValue = function(){
    lightValue  = light.read();
    lightValue = Math.round( lightValue*.1);
    lcdMessage = lcdMessage;
    myLCD.setCursor(0,1);
    console.log("Writing to consile: " + lcdMessage); 
    myLCD.write(lcdMessage);
};

setInterval(displayValue(), 500);