var nitrogen = require('nitrogen')
  , spawn = require('child_process').spawn;

function ImageSnapCamera(config) {
    nitrogen.Device.apply(this, arguments);
    this.tags = ['executes:cameraCommand'];

    if (!config) config = {};

    this.config = config;

    this.config.width = this.config.width || 640;
    this.config.height = this.config.height || 480;
}

ImageSnapCamera.prototype = Object.create(nitrogen.Device.prototype);
ImageSnapCamera.prototype.constructor = ImageSnapCamera;

ImageSnapCamera.prototype.snapshot = function(options, callback) {
    options.width = options.width || this.config.width;
    options.height = options.height || this.config.height;
    options.content_type = 'image/jpeg';

    var process = spawn('imagesnap', ['-w', '1.0', '-']);

    return callback(process.stdout, options);
};

ImageSnapCamera.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = ImageSnapCamera;