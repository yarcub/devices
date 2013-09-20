var exec = require('child_process').exec
  , nitrogen = require('nitrogen');

function RaspberryPiCamera(config) {
    nitrogen.Device.apply(this, arguments);

    if (!config) config = {};

    this.config = config;

    this.config.width = this.config.width || 640;
    this.config.height = this.config.height || 480;
}

RaspberryPiCamera.prototype = Object.create(nitrogen.Device.prototype);
RaspberryPiCamera.prototype.constructor = RaspberryPiCamera;

RaspberryPiCamera.prototype.snapshot = function(options, callback) {
    options.path = options.path || new Date().getTime() + ".jpg";
    options.width = options.width || this.config.width;
    options.height = options.height || this.config.height;

    var command = 'raspistill -t 0 -n -o ' + options.path + ' -w ' + options.width + ' -h ' + options.height;
    exec(command, function (err, stdout, stderr) {
        return callback(err);
    });
};

FoscamCamera.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = RaspberryPiCamera;