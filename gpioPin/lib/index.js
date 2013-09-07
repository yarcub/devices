var gpio = require('gpio')
  , nitrogen = require('nitrogen');

function GPIOSwitch() {
    nitrogen.Device.apply(this, arguments);

    if (!this.config) this.config = {};

    this.capabilities = ['switchCommand'];

    this.config.pin = this.config.pin || 4;

    this.awaitingReady = [];

    var self = this;
    this.switchGPIO = gpio.export(this.config.pin, {
        direction: 'out',
        ready: function() {
            self.ready = true;
            self.signalReady();
        }
    });
}

GPIOSwitch.prototype = Object.create(nitrogen.Device.prototype);
GPIOSwitch.prototype.constructor = GPIOSwitch;

GPIOSwitch.prototype.whenReady = function (callback) {
    if (this.ready)
        callback();
    else
        this.awaitingReady.push(callback);
};

GPIOSwitch.prototype.set = function(value, callback) {
    var self = this;
    this.whenReady(function() {
        self.switchGPIO.set(value, callback);
    });
};

GPIOSwitch.prototype.signalReady = function() {
    this.awaitingReady.forEach(function(callback) {
        callback();
    });
};

GPIOSwitch.prototype.status = function(callback) {
    var self = this;
    this.whenReady(function() {
        callback(null, { value: self.switchGPIO.value });
    });
};

module.exports = GPIOSwitch;
