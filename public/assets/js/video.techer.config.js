// const DEFAULT_STREAM_0 = "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8";
// const DEFAULT_STREAM_1 = "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.XFAcAcypUxQm.m3u8";
// const DEFAULT_STREAM_2 = "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.YtnrVcQbttF0.m3u8";
// const DEFAULT_STREAM_3 = "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8";
// const DEFAULT_STREAM_4 = "https://d6hwdeiig07o4.cloudfront.net/ivs/956482054022/cTo5UpKS07do/2020-07-13T22-54-42.188Z/OgRXMLtq8M11/media/hls/master.m3u8";

// ch_playURL
let STREAM_PLAY_URL = '';
// textarea autoresize
autosize(document.querySelector("#chat_msg"));

// Initialize IVS player
(function () {
    'use strict';
    // get playback channel url
    const temp = document.querySelector("#ch_playurl");
    STREAM_PLAY_URL = temp.value;
    console.log(STREAM_PLAY_URL);
    // STREAM_PLAY_URL = "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8";
    // STREAM_PLAY_URL = "";

    // Set up IVS playback tech and quality plugin
    registerIVSTech(videojs);
    registerIVSQualityPlugin(videojs);

    // Initialize video.js player
    const videoJSPlayer = videojs("amazon-ivs-videojs", {
        techOrder: ["AmazonIVS"],
        // liveui: true,
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
            console.log("Player State - PLAYING");
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

    document.querySelector(".vjs-volume-panel").classList.add("vjs-hover");
})();



