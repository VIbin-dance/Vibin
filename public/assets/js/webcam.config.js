
// Initialize WebCamera
(function () {
    'use strict';

    var webcamList = [];
    var webcamType = 0;
    var cam_geight = 480;

    var initWebcam = function () {
        
        switch (webcamType) {
            case 0:     //other wireless Camera
            cam_geight = 480;
                break;
            case 1:     //notebook Integrated Camera
            cam_geight = 480;
                break;
            case 2:     //usb webcam Camera
            cam_geight = 720;
                break;
        
            default:
                break;
        }
        Webcam.set({
            width: '50%',
            height: cam_geight,
        });
        Webcam.attach('#self_camera');
    };

    // deviceChanged() - Handle devicechange event
    var deviceChanged = function () {
        if (webcamList.length > 0) {
            // Start video with the first device on the list
            Webcam.reset();
            enumerateMediaDevices();
        } else {
            console.log('Webcam not found.');
        }
    };

    var getUserMediaError = function (e) {
        if (e.name.indexOf('NotFoundError') >= 0) {
            writeError('Webcam not found.');
        } else {
            console.log('The following error occurred: "' + e.name + '" Please check your webcam device(s) and try again.');
        }
    };

    var enumerateMediaDevices = function () {
        navigator.mediaDevices.enumerateDevices().then(devicesCallback).catch(getUserMediaError);
    };

    // devicesCallback() - Callback function for device enumeration
    var devicesCallback = function (devices) {
        // Identify all webcams
        webcamList = [];
        console.log("-----------");
        console.log(devices);
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].kind === 'videoinput' && (devices[i].label.search("Webcam") >= 0 || devices[i].label.search("Integrated Camera") >= 0)) {
                webcamList[webcamList.length] = devices[i].deviceId;
                if (devices[i].label.search("Integrated Camera") >= 0) {
                    webcamType = 1;
                } else if (devices[i].label.search("Webcam") >= 0) {
                    webcamType = 2;
                }
            }
        }

        initWebcam();
    };

    enumerateMediaDevices();

    Webcam.on('load', function () {
        // library is loaded
        console.log(' webcam loading ');
    });

    Webcam.on('live', function () {
        // camera is live, showing preview image
        console.log(' webcam live run ');
    });

    Webcam.on('error', function (err) {
        // an error occurred (see 'err')
        console.log(' webcam error :', err);
    });

    navigator.mediaDevices.addEventListener('devicechange', deviceChanged);

}());