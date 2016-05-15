function run_cmd(cmd, args, callBack) {
	var spawn = require('child_process').spawn;
	var child = spawn(cmd, args);
	var resp = "";
	
	child.stdout.on('data', function (buffer) { resp += buffer.toString() });
	child.stdout.on('end', function () { callBack(resp) });
}

this.TakePicture = function (caption) {
	var picturePath = '//media/imageSif.jpeg';
	console.log('Picture: ' + picturePath);
	run_cmd("rm", ['-f', picturePath], function (caption) { console.log(caption) });
	run_cmd("/home/root/bin/ffmpeg/ffmpeg", ['-s', '1280x720', '-f', 'video4linux2', '-i', '/dev/video0', '-vframes', '1', picturePath], function (caption) { console.log(caption) });
}