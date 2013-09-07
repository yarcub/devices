var nitrogen = require('nitrogen')
  , arDrone = require('ar-drone');

function ARDrone() {
    nitrogen.Device.apply(this, arguments);

    if (!this.config) this.config = {};

    this.capabilities = ['droneCommand cameraCommand'];

    this.config.width = this.config.width || 640;
    this.config.height = this.config.height || 480;

    this.client = arDrone.createClient();
    this.pngStream = this.client.getPngStream();
}

ARDrone.prototype = Object.create(nitrogen.Device.prototype);
ARDrone.prototype.constructor = MockDrone;

// droneManager device interface

ARDrone.prototype.up = function(speed) {
    console.log('set up speed to ' + speed);
    this.client.up(speed);
};

ARDrone.prototype.down = function(speed) {
    console.log('set down speed to ' + speed);
    this.client.down(speed);
};

ARDrone.prototype.left = function(speed) {
    console.log('set left speed to ' + speed);
    this.client.left(speed);
};

ARDrone.prototype.right = function(speed) {
    console.log('set right speed to ' + speed);
    this.client.right(speed);
};

ARDrone.prototype.clockwise = function(speed) {
    console.log('set clockwise speed to ' + speed);
    this.client.clockwise(speed);
};

ARDrone.prototype.counterClockwise = function(speed) {
    console.log('set counterClockwise speed to ' + speed);
    this.client.counterClockwise(speed);
};

ARDrone.prototype.forward = function(speed) {
    console.log('set forward speed to ' + speed);
    this.client.forward(speed);
};

ARDrone.prototype.back = function(speed) {
    console.log('set back speed to ' + speed);
    this.client.back(speed);
};

ARDrone.prototype.stop = function() {
    console.log('stopped drone');
    this.client.stop();
};

ARDrone.prototype.takeoff = function(callback) {
    console.log('takeoff drone');
    this.client.takeoff(callback);
};

ARDrone.prototype.land = function(callback) {
    console.log('land drone');
    this.client.land(callback);
};

ARDrone.prototype.status = function(callback) {
    callback(null, { } );
};

// cameraManager device interface

ARDrone.prototype.snapshot = function(options, callback) {
    this.pngStream.once('data', function(image) {
        callback(null, image);
    });
};

module.exports = ARDrone;
