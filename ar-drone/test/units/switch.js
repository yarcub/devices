var assert = require('assert'),
    ARDrone = require('../../lib');

describe('ARDrone', function() {
    it('should be able to takeoff and land a drone.', function(done) {
    	var arDrone = new ARDrone();
    	arDrone.takeoff(function() {
    	    arDrone.land(function() { 
                done();
            });
        });	
    });

    it('should be able to get a snapshot from the drone.', function(done) {
        var arDrone = new ARDrone();
        arDrone.snapshot(function(err, image) {
            assert.equal(err, undefined);
            assert.notEqual(image, undefined);

            done();
        }); 
    });

});
