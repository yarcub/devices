var nitrogen = require('nitrogen');

function PhilipsHueLight(config) {
    nitrogen.Device.apply(this, arguments);

    this.tags = ['executes:lightCommand', 'sends:lightState'];

    if (!config) config = {};

    this.config = config;
}

PhilipsHueLight.prototype = Object.create(nitrogen.Device.prototype);
PhilipsHueLight.prototype.constructor = PhilipsHueLight;

PhilipsHueLight.prototype.set = function(options, callback) {
    if (!this.config.hue_api) return callback(new Error("PhilipsHueLight: no hue_api configured on device."));

    this.config.hue_api.setLightState(this.config.philips_id, options, callback);
};

PhilipsHueLight.prototype.status = function(callback) {
    this.config.hue_api.lightStatus(this.config.philips_id, callback);
};

module.exports = PhilipsHueLight;
