// textarea autoresize
autosize(document.querySelector("#chat_msg"));

// Initialize IVS player
(function () {
    'use strict';
    // get playback channel url
    const temp = document.querySelector("#ch_playurl");
    let STREAM_PLAY_URL = temp.value;
    STREAM_PLAY_URL = "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8";
    
    // Set up IVS playback tech and quality plugin
    registerIVSTech(videojs);
    registerIVSQualityPlugin(videojs);

    // Initialize video.js player
    const videoJSPlayer = videojs("amazon-ivs-videojs", {
        techOrder: ["AmazonIVS"],
        controlBar: {
            playToggle: {
                replay: false
            }, // Hides the replay button for VOD
            pictureInPictureToggle: false, // Hides the PiP button
        }
    });

    // Use the player API once the player instance's ready callback is fired
    const readyCallback = function () {
        // This executes after video.js is initialized and ready
        window.videoJSPlayer = videoJSPlayer;

        // Get reference to Amazon IVS player
        const ivsPlayer = videoJSPlayer.getIVSPlayer();

        // Show the "big play" button when the stream is paused
        const videoContainerEl = document.querySelector("#amazon-ivs-videojs");
        videoContainerEl.addEventListener("click", () => {
            if (videoJSPlayer.paused()) {
                videoContainerEl.classList.remove("vjs-has-started");
            } else {
                videoContainerEl.classList.add("vjs-has-started");
            }
        });

        // Logs low latency setting and latency value 5s after playback starts
        const PlayerState = videoJSPlayer.getIVSEvents().PlayerState;
        ivsPlayer.addEventListener(PlayerState.PLAYING, () => {
            // console.log("Player State - PLAYING");
            setTimeout(() => {
                console.log(
                    `This stream is ${ivsPlayer.isLiveLowLatency() ? "" : "not "
                    }playing in ultra low latency mode`
                );
                console.log(`Stream Latency: ${ivsPlayer.getLiveLatency()}s`);
            }, 5000);
        });

        // Log errors
        const PlayerEventType = videoJSPlayer.getIVSEvents().PlayerEventType;
        ivsPlayer.addEventListener(PlayerEventType.ERROR, (type, source) => {
            console.warn("Player Event - ERROR: ", type, source);
        });

        // Log and display timed metadata
        ivsPlayer.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
            const metadataText = cue.text;
            const position = ivsPlayer.getPosition().toFixed(2);
            console.log(
                `Player Event - TEXT_METADATA_CUE: "${metadataText}". Observed ${position}s after playback started.`
            );
        });

        // Enables manual quality selection plugin
        videoJSPlayer.enableIVSQualityPlugin();

        // Set volume and play default stream
        videoJSPlayer.volume(0.5);
        videoJSPlayer.src(STREAM_PLAY_URL);
    };

    // Register ready callback
    videoJSPlayer.ready(readyCallback);

    var button = videoJSPlayer.controlBar.addChild('button', {
        text: '',
        buttonChildExample: {
            buttonChildOption: true
        }
    });
    button.addClass('togglePeer');

    document.querySelector(".vjs-volume-panel").classList.add("vjs-hover");
})();



// Initialize WebCamera
(function () {
    'use strict';

    var mediaStream = null;
    var webcamList;
    var currentCam = null;
    var video = document.getElementById('self_camera');

    // writeError(string) - Provides a way to display errors to the user
    var writeError = function (string) {
        // console.log( "1. currentCam number : ", currentCam );
        // console.log( "2. webcamList length : ",  webcamList.length );
        // console.log( "3. webcamList content : ",  webcamList );
        console.log(string);
    };

    // initializeVideoStream() - Callback function when getUserMedia() returns successfully with a mediaStream object,
    // set the mediaStream on the video tag
    var initializeVideoStream = function (stream) {
        mediaStream = stream;
        video.srcObject = mediaStream;

        if (video.paused) video.play();

        if (webcamList.length > 1) {
            // writeError('----' + e.name + '----');
        }
    };

    // getUserMediaError() - Callback function when getUserMedia() returns error
    // 1. Show the error message with the error.name
    var getUserMediaError = function (e) {
        if (e.name.indexOf('NotFoundError') >= 0) {
            writeError('Webcam not found.');
        } else {
            // writeError('----' + e.name + '----');
            writeError('The following error occurred: "' + e.name + '" Please check your webcam device(s) and try again.');
        }
    };

    var isEnterKey = function (evt) {
        var charCode = (typeof evt.which === 'number') ? evt.which : evt.keyCode;

        if (charCode !== 13 && charCode !== 32) {
            return false;
        }

        return true;
    }

    // nextWebCam() - Function to rotate through the webcam device list
    // 1. Release the current webcam (if there is one in use)
    // 2. Call getUserMedia() to access the next webcam
    var nextWebCam = function () {
        writeError('nextWebCam 1 ----' + currentCam + '----');

        if (currentCam !== null) {
            currentCam++;
            if (currentCam >= webcamList.length) {
                currentCam = 0;
            }

            if (typeof video.srcObject !== 'undefined') video.srcObject = null;
            video.src = null;
            if (mediaStream) {
                var videoTracks = mediaStream.getVideoTracks();
                videoTracks[0].stop();
                mediaStream = null;
            }
        }
        else {
            currentCam = 0;
        }

        // front camera
        // { audio: true, video: { facingMode: "user" } }
        // rear camera
        // { audio: true, video: { facingMode: { exact: "environment" } } }

        // var front = false;
        // document.getElementById('flip-button').onclick = function() { front = !front; };
        // var constraints = { video: { facingMode: (front? "user" : "environment") } };

        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
            video: {
                width: 800,
                height: 600,
                deviceId: { exact: webcamList[currentCam] }
            }
        }).then( stream => {
            initializeVideoStream(stream);
        }).catch(getUserMediaError);
    };


    // enumerateMediaDevices() - function to start enumerateDevices() and define the callback functions
    var enumerateMediaDevices = function () {
        /*eslint-disable*/
        navigator.mediaDevices.enumerateDevices().then(devicesCallback).catch(getUserMediaError);
        /*eslint-enable*/
    };

    // deviceChanged() - Handle devicechange event
    // 1. Reset webcamList
    // 2. Re-enumerate webcam devices
    var deviceChanged = function () {
        // navigator.mediaDevices.removeEventListener('devicechange', deviceChanged);
        // Reset the webcam list and re-enumerate

        // webcamList = [];
        enumerateMediaDevices();

        Webcam.set({
            width: '30rem',
            height: '100%',
        });
        Webcam.attach('#self_camera');
    };

    // devicesCallback() - Callback function for device enumeration
    // 1. Identify all webcam devices and store the info in the webcamList
    // 2. Start the demo with the first webcam on the list
    // 3. Show the webcam 'switch' button when there are multiple webcams
    // 4. Show error message when there is no webcam
    // 5. Register event listener (devicechange) to respond to device plugin or unplug
    var devicesCallback = function (devices) {
        // Identify all webcams
        webcamList = [];
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].kind === 'videoinput' && devices[i].label.search("Webcam") >= 0 ) {
                webcamList[webcamList.length] = devices[i].deviceId;
            }
        }

        if (webcamList.length > 0) {
            // Start video with the first device on the list
            nextWebCam();
        }
        else {
            writeError('Webcam not found.');
        }

    };

    // APISetup() - function to start the Media Capture API
    // 1. Enumerate the webcam devices
    // 2. Set up event listner for the webcam 'switch' button
    var APISetup = function () {
        enumerateMediaDevices();
        deviceChanged();
    };

    // init() - The entry point to the demo code
    // 1. Detect whether getUserMedia() is supported, show an error if not
    var init = function () {
        if (navigator.getUserMedia) {
            APISetup();
        }
        else {
            writeError('You are using a browser that does not support the Media Capture API');
        }
    };

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

    init();

}());

