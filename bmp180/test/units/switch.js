var assert = require('assert'),
    GPIOSwitch = require('../../lib');

describe('RaspberryPiCamera', function() {

    it('should be able to set a pin.', function(done) {
        var switchDevice = new GPIOSwitch();
        switchDevice.set(0.0, function() {
           done();
        }); 
    });

});
