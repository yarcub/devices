# nitrogen-bmp180

This module provides support for the bmp085 (discontinued) and bmp180 (pin compatible replacement) temperature and pressure sensor.

## How to use in your project

1. Add 'nitrogen-bmp180' to your package.json for the device application you are building.
2. 
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