var assert = require('assert'),
    CommandCamCamera = require('../../lib');

describe('CommandCamCamera', function() {

    it('should be able to take a photo.', function(done) {
	var camera = new CommandCamCamera();
	camera.snapshot({ }, function(stream, options) {
	    assert(stream);
	    assert(options);
	    done();
        });	
    });

});
