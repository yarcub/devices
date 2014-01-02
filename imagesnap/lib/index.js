var exec = require('child_process').exec
  , nitrogen = require('nitrogen');

function ImageSnapCamera(config) {
    nitrogen.Device.apply(this, arguments);
    this.capabilities = ['cameraCommand'];

    if (!config) config = {};

    this.config = config;

    this.config.width = this.config.width || 640;
    this.config.height = this.config.height || 480;
}

ImageSnapCamera.prototype = Object.create(nitrogen.Device.prototype);
ImageSnapCamera.prototype.constructor = ImageSnapCamera;

ImageSnapCamera.prototype.snapshot = function(options, callback) {
    options.path = options.path || new Date().getTime() + ".jpg";
    options.width = options.width || this.config.width;
    options.height = options.height || this.config.height;

    var command = 'imagesnap -w 1.0 ' + options.path;
    exec(command, function (err, stdout, stderr) {
        return callback(err, options);
    });
};

ImageSnapCamera.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = ImageSnapCamera;