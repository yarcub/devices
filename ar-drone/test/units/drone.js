var assert = require('assert'),
    ARDrone = require('../../lib');

describe('ARDrone', function() {

    it('should be able to takeoff.', function(done) {
    	var arDrone = new ARDrone();
    	arDrone.takeoff(0.0, function() {
    	    done();
        });	
    });
});
