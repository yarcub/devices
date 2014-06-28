var sensor = require('mics4514');

setInterval(function(){
	sensor.read(function(data){
		console.log(data);
	});
}, 1000);