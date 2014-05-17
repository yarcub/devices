var BMP085 = require('bmp085')
  , nitrogen = require('nitrogen');

function BMP085Device() {
    nitrogen.Device.apply(this, arguments);

    if (!this.config) this.config = {};
    if (!this.config.mode) this.config.mode = 1;
    if (!this.config.address) this.config.address = 0x77;
    if (!this.config.devicePath) this.config.devicePath = "/dev/i2c-1";

    this.tags = ['sends:temperature', 'sends:pressure'];

    this.bmp085 = new BMP085({
        mode: this.config.mode,
        address: this.config.address,
        device: this.config.device
    });
}

BMP085Device.prototype = Object.create(nitrogen.Device.prototype);
BMP085Device.prototype.constructor = BMP085Device;

BMP085Device.prototype.measure = function(callback) {
    this.bmp085.read(function(data) {
	// the bmp085 / bmp180 returns presure in hPA 
        var pascals = data.pressure * 100.0;

        var messages = [
            new nitrogen.Message({
                type: 'temperature',
                body: {
                    temperature: data.temperature
                }
            }),

            new nitrogen.Message({
                type: 'pressure',
                body: {
                    pressure: pascals
                }
            })
        ];

        return callback(null, messages);
    });
};

module.exports = BMP085Device;
