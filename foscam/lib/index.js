var foscam = require('foscam')
  , nitrogen = require('nitrogen');

function FoscamCamera() {
    nitrogen.Device.apply(this, arguments);

    if (!this.config || !this.config.host || !this.config.user || !this.config.password) return console.log('Incomplete configuration for Foscam device, unable to connect.');

    this.tags = ['executes:cameraCommand', 'sends:image'];

    this.config.port = this.config.port || 80;
    this.config.width = this.config.width || 640;

    var self = this;
    foscam.setup({
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        pass: this.config.password
    }, function(status) {
        if (!status) return console.error("foscam driver: couldn't connect to camera.");
        foscam.control.camera('resolution', self.config.width);
    });
}

FoscamCamera.prototype = Object.create(nitrogen.Device.prototype);
FoscamCamera.prototype.constructor = FoscamCamera;

FoscamCamera.prototype.snapshot = function(shot, callback) {
    shot.path = shot.path || new Date().getTime() + ".jpg";

    var calledBack = false;

    setTimeout(function() {
        if (!calledBack) {
          calledBack = true;
          return callback(new Error('foscan snapshot timed out.'));
        }
    }, 5000);

    foscam.snapshot(shot.path, function(path) {
      if (!path) return callback(new Error('foscam snapshot failed.'));

      if (!calledBack) {
        calledBack = true;
        return callback(null, shot);
      }
    });
};

FoscamCamera.prototype.status = function(callback) {
    foscam.status(function(status) {
        callback(!status, status);
    });
};

module.exports = FoscamCamera;
