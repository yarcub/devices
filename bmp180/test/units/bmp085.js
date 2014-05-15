var assert = require('assert'),
    BMP085Device = require('../../lib');

describe('BMP085 device', function() {

    it('should be measure temperature and pressure.', function(done) {
        var bmp085device = new BMP085Device();
        bmp085device.measure(function(err, messages) {
           assert(!err);

           assert(messages.length === 2);
           assert(messages[0].type === 'temperature');
           assert(messages[1].type === 'pressure'); 

           done();
        }); 
    });

});
