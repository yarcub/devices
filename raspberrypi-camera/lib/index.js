var exec = require('child_process').exec;

function RaspberryPiCamera(config) {
    if (!config) config = {};

    this.config = config;

    this.config.width = this.config.width || 640;
    this.config.height = this.config.height || 480;
}

RaspberryPiCamera.prototype.snapshot = function(options, callback) {
    options.path = options.path || new Date().getTime() + ".jpg";
    options.width = options.width || this.config.width;
    options.height = options.height || this.config.height;

    var command = 'raspistill -t 0 -n -o ' + options.path + ' -w ' + options.width + ' -h ' + options.height;
    exec(command, function (err, stdout, stderr) {
        return callback(err);
    });
};

module.exports = RaspberryPiCamera;
