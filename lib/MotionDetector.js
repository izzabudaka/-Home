/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var mraa = require('mraa'); 
console.log('MRAA Version: ' + mraa.getVersion());

var motionDetector = new mraa.Gpio(6); 
motionDetector.dir(mraa.DIR_IN); 

this.MonitorHomeForMotion = function (callback) {
	
	var motionSensorTriggered = motionDetector.read();
	
	if (motionSensorTriggered) {
		console.log('Intruder Detected');
		console.log(motionSensorTriggered);
	
		setTimeout(this.MonitorHomeForMotion, 3000);
		callback;		
	}
	else {
		setTimeout(this.MonitorHomeForMotion, 500);
	}
}