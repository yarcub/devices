# nitrogen-gpio-pin

This module allows you to use a GPIO pin in Nitrogen as a device.

## How to use in your project

1. Add 'nitrogen-gpio-pin' to your packages.json.
2. Configure the pin you'd like to control:
```
var config = {
    pin: 4  
};
```

3. Create a GPIO pin device:
```
var GPIOPin = require('nitrogen-gpio-pin');
var gpioPin = new GPIOPin(config); 
gpioPin.set(0, function() {
    // success
});
```