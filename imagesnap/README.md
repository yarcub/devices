# nitrogen-imagesnap 

This module allows you to use the Mac command line utility imagesnap as a Nitrogen camera device.

## How to use in your project

1. Clone the [camera](https://github.com/nitrogenjs/camera) project if you do not already have a camera project to start from.

2. Add 'nitrogen-imagesnap' to your packages.json.
3. Add a ImageSnapCamera to your cameras in config.js:

```
var config = {
    cameras: [
        new ImageSnapCamera({
            name: 'Mac Camera'
        })
    ]
};
```
