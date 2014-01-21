var assert = require('assert')
  , hue = require("node-hue-api")
  , PhilipsHueLight = require('../../lib');

describe('PhilipsHueLight', function() {

    var light;

    before(function(done) {
        hue.locateBridges(function(err, bridges) {
            assert.ifError(err);

            bridges.forEach(function(bridge) {
                var hueApi = new hue.HueApi(bridge.ipaddress, "5bdeb8c11a332cf33cc9f64b7b1267");

                hueApi.lights(function(err, result) {
                    assert.ifError(err);
                    assert(result.lights.length > 0);

                    var firstLight = result.lights[1];
                    light = new PhilipsHueLight({
                        hue_api: hueApi,
                        name: firstLight.name,
                        nickname: bridge.id + "_" + firstLight.id,
                        philips_id: firstLight.id
                    });

                    done();
                });
            });
        });
    });

    it('should be able to switch light state.', function(done) {
        light.set({ on: true }, function(err, results) {
            assert.ifError(err);
            done();
        }); 
    });

    it('should be able to get the light status.', function(done) {
        light.status(function(err, status) {
            assert.ifError(err);
            assert(status);

            console.log(JSON.stringify(status));
            done();
        }); 
    });
});