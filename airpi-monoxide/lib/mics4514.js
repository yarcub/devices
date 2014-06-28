var MCP3008 = require('mcp3008.js');

var adc = new MCP3008();


var MICS4514 = function(options){
	this.options = options;
}

MICS4514.prototype.read = function(cb){
	adc.read(options.channel, function (value) {
    	cb(value);
	});
}

module.exports = MICS4514;