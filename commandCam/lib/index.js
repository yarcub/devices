var exec = require('child_process').exec
  , fs = require('fs')
  , nitrogen = require('nitrogen');

function CommandCamCamera(config) {
    nitrogen.Device.apply(this, arguments);
    this.tags = ['executes:cameraCommand', 'sends:image'];

    if (!config) config = {};

    this.config = config;
}

CommandCamCamera.prototype = Object.create(nitrogen.Device.prototype);
CommandCamCamera.prototype.constructor = CommandCamCamera;

CommandCamCamera.prototype.snapshot = function(options, callback) {
    options.path = "image.bmp";

    var process = exec('commandCam', function(err) {
        if (err) return callback(null, options);

        var imageStream = fs.createReadStream(options.path);

        return callback(imageStream, options);
    });
};

CommandCamCamera.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = CommandCamCamera;