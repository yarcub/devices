# nitrogen-foscam 

This driver module enables Foscam cameras to be connected to Nitrogen.  It has been tested with a model FI8904W but should work with modern Foscam outdoor wireless IP cameras.   

## How to use in your project

1. Clone the [camera](https://github.com/nitrogenjs/camera) project if you do not already have a camera project to start from.
2. Add 'nitrogen-foscam' to your packages.json.
3. Edit config.js to include your camera:

``` javascript
config.cameras = [
    new FoscamCamera({
        nickname: 'cameraComm',
         config: {
            host: '192.168.1.1',
            port: 80,
            user: 'admin',
            password: 'mypass'
         }
    })
];
``` 
