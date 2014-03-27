var assert = require('assert'),
    ImageSnapCamera = require('../../lib');

describe('ImageSnapCamera', function() {

    it('should be able to take a photo.', function(done) {
    	var camera = new ImageSnapCamera();
    	camera.snapshot({}, function(process) {
            var gotData = false;
            process.stdout.on('data', function(data) {
                gotData = true;
            });

            process.stderr.on('data', function(data) {
                fail();
            });

            process.on('close', function(code) {
                assert.equal(code, 0);
                assert(gotData);

                done();
            })
        });	
    });

});
