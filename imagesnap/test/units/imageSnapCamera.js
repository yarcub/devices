var assert = require('assert'),
    ImageSnapCamera = require('../../lib');

describe('ImageSnapCamera', function() {

    it('should be able to take a photo.', function(done) {
	var camera = new ImageSnapCamera();
	camera.snapshot({ path: "test.jpg" }, function(err) {
	    assert.ifError(err);
	    done();
        });	
    });

});
