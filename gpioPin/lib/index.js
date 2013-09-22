var gpio = require('gpio')
  , nitrogen = require('nitrogen');

function GPIOPin() {
    nitrogen.Device.apply(this, arguments);

    if (!this.config) this.config = {};

    this.capabilities = ['switchCommand'];

    this.config.pin = this.config.pin || 4;

    this.awaitingReady = [];

    var self = this;
    this.pin = gpio.export(this.config.pin, {
        direction: 'out',
        ready: function() {
            self.ready = true;
            self.signalReady();
        }
    });
}

GPIOPin.prototype = Object.create(nitrogen.Device.prototype);
GPIOPin.prototype.constructor = GPIOPin;

GPIOPin.prototype.whenReady = function (callback) {
    if (this.ready)
        callback();
    else
        this.awaitingReady.push(callback);
};

GPIOPin.prototype.set = function(value, callback) {
    var self = this;
    this.whenReady(function() {
        self.pin.set(value, callback);
    });
};

GPIOPin.prototype.signalReady = function() {
    this.awaitingReady.forEach(function(callback) {
        callback();
    });
};

GPIOPin.prototype.status = function(callback) {
    var self = this;
    this.whenReady(function() {
        callback(null, { value: self.pin.value });
    });
};

module.exports = GPIOPin;
