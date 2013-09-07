var assert = require('assert'),
    RaspberryPiCamera = require('../../lib');

describe('RaspberryPiCamera', function() {

    it('should be able to take a photo.', function(done) {
	var camera = new RaspberryPiCamera();
	camera.snapshot({ path: "test.jpg" }, function(err) {
	    assert.ifError(err);
	    done();
        });	
    });

});
