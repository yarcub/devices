var async = require('async')
  , BMP085 = require('bmp085')
  , nitrogen = require('nitrogen');

function AirPiDevice(config) {
    nitrogen.Device.apply(this, arguments);

    this.config = config;

    if (!this.config) this.config = {};
    if (!this.config.mode) this.config.mode = 1;
    if (!this.config.address) this.config.address = 0x77;
    if (!this.config.devicePath) this.config.devicePath = "/dev/i2c-1";

    this.config = config;
    this.tags = ['executes:sensorCommand', 'sends:temperature', 'sends:pressure'];

    this.bmp085 = new BMP085({
        mode:       this.config.mode,
        address:    this.config.address,
        device:     this.config.device
    });
}

AirPiDevice.prototype = Object.create(nitrogen.Device.prototype);
AirPiDevice.prototype.constructor = AirPiDevice;

AirPiDevice.prototype.measureBmp085 = function(callback) {
    this.bmp085.read(function(data) {
        // the bmp085 / bmp180 returns presure in hPA
        var pascals = data.pressure * 100.0;

        var messages = [
            new nitrogen.Message({
                type: 'pressure',
                body: {
                    pressure: pascals
                }
            }),

            new nitrogen.Message({
                type: 'temperature',
                body: {
                    temperature: data.temperature
                }
            })
        ];

        return callback(null, messages);
    });
};

AirPiDevice.prototype.measureDht22 = function(callback) {
    // TODO
    return callback(null, []);
};

AirPiDevice.prototype.measure = function(callback) {
    var self = this;

    async.parallel([
        function(cb) { self.measureBmp085(cb); },
        function(cb) { self.measureDht22(cb);  }
    ], function(err, results) {
        if (err) return callback(err);

        var messages = [];
        results.forEach(function(result) {
            messages = messages.concat(result);
        });

        return callback(null, messages);
    });
};

AirPiDevice.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = AirPiDevice;
