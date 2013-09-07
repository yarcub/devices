# raspberrypi-camera

This module allows you to use the Raspberry PI camera as a Nitrogen device.

## How to use in your project

1. Configure the Raspberry Pi to enable using the onboard camera:
```
sudo raspi-config
```

2. Clone the [camera](https://github.com/nitrogenjs/camera) project if you do not already have a camera project to start from.

3. Add 'raspberrypi-camera' to your packages.json.
4. Add a RaspberryPiCamera to your cameras in config.js:

```
var config = {
    cameras: [
        new RaspberryPiCamera({
            width: 1024,
            height: 768
        })
    ]
};
```
