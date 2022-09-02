// const moment = require('moment');

// Possible configurations
const channelConfigs = [
  ["Basic: Landscape", window.IVSBroadcastClient.BASIC_LANDSCAPE],
  ["Basic: Portrait", window.IVSBroadcastClient.BASIC_PORTRAIT],
  ["Standard: Landscape", window.IVSBroadcastClient.STANDARD_LANDSCAPE],
  ["Standard: Portrait", window.IVSBroadcastClient.STANDARD_PORTRAIT]
];

// Set initial config for our broadcast
const config = {
  ingestEndpoint: "https://g.webrtc.live-video.net:4443",
  streamConfig: window.IVSBroadcastClient.BASIC_LANDSCAPE,
  logLevel: window.IVSBroadcastClient.LOG_LEVEL.DEBUG
};

// Error helpers
function clearError() {
  const errorEl = document.getElementById("error");
  errorEl.innerHTML = "";
}

function setError(message) {
  if (Array.isArray(message)) {
    message = message.join("<br/>");
  }
  const errorEl = document.getElementById("error");
  errorEl.innerHTML = message;
}

function getSupportedProperty(object, key) {
  if (key in object) {
    return object[key];
  }

  return "Unsupported";
}

// Get available audio/video inputs
async function initializeDeviceSelect() {
  const videoSelectEl = document.getElementById("video-devices");

  videoSelectEl.disabled = false;
  const { videoDevices, audioDevices } = await getDevices();
  videoDevices.forEach((device, index) => {
    videoSelectEl.options[index] = new Option(device.label, device.deviceId);
  });

  const audioSelectEl = document.getElementById("audio-devices");

  audioSelectEl.disabled = false;
  audioSelectEl.options[0] = new Option("None", "None");
  audioDevices.forEach((device, index) => {
    audioSelectEl.options[index + 1] = new Option(
      device.label,
      device.deviceId
    );
  });
}

async function getCamera(deviceId, maxWidth, maxHeight) {
  let media;
  const videoConstraints = {
    deviceId: deviceId ? { exact: deviceId } : null,
    width: {
      max: maxWidth
    },
    height: {
      max: maxHeight
    }
  };
  try {
    // Let's try with max width and height constraints
    media = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: true
    });
  } catch (e) {
    // and fallback to unconstrained result
    delete videoConstraints.width;
    delete videoConstraints.height;
    media = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints
    });
  }
  return media;
}

// Handle video device retrieval
async function handleVideoDeviceSelect() {
  const id = "camera";
  const videoSelectEl = document.getElementById("video-devices");
  const { videoDevices: devices } = await getDevices();
  if (window.client.getVideoInputDevice(id)) {
    window.client.removeVideoInputDevice(id);
  }

  // Get the option's video
  const selectedDevice = devices.find(
    (device) => device.deviceId === videoSelectEl.value
  );
  const deviceId = selectedDevice ? selectedDevice.deviceId : null;
  const { width, height } = config.streamConfig.maxResolution;
  const cameraStream = await getCamera(deviceId, width, height);

  // Add the camera to the top
  await window.client.addVideoInputDevice(cameraStream, id, {
    index: 0
  });
}

// Handle audio/video device enumeration
async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((d) => d.kind === "videoinput");
  if (!videoDevices.length) {
    setError("No video devices found.");
  }
  const audioDevices = devices.filter((d) => d.kind === "audioinput");
  if (!audioDevices.length) {
    setError("No audio devices found.");
  }

  return { videoDevices, audioDevices };
}

// Handle audio device retrieval
async function handleAudioDeviceSelect() {
  const id = "microphone";
  const audioSelectEl = document.getElementById("audio-devices");
  const { audioDevices: devices } = await getDevices();
  if (window.client.getAudioInputDevice(id)) {
    window.client.removeAudioInputDevice(id);
  }
  if (audioSelectEl.value.toLowerCase() === "none") return;
  const selectedDevice = devices.find(
    (device) => device.deviceId === audioSelectEl.value
  );
  // Unlike video, for audio we default to "None" instead of the first device
  if (selectedDevice) {
    const microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: selectedDevice.deviceId
      }
    });
    await window.client.addAudioInputDevice(microphoneStream, id);
  }
}

// Setup the stream configuration options
async function initializeStreamConfigSelect() {
  const streamConfigSelectEl = document.getElementById("stream-config");
  streamConfigSelectEl.disabled = false;

  channelConfigs.forEach(([configName], index) => {
    streamConfigSelectEl.options[index] = new Option(configName, index);
  });
}

// Handle setting the stream config
async function handleStreamConfigSelect() {
  const streamConfigSelectEl = document.getElementById("stream-config");
  const selectedConfig = streamConfigSelectEl.value;
  config.streamConfig = channelConfigs[selectedConfig][1];

  await createClient();
}

/**
 * Validates the form's input elements. Returns empty array if
 * valid else the list of errors.
 */
function validate() {
  const streamKey = document.getElementById("stream-key").value;
  const ingestUrl = document.getElementById("ingest-endpoint").value;
  const errors = [];

  if (!ingestUrl) {
    errors.push("Please provide an ingest endpoint");
  }

  if (!streamKey) {
    errors.push("Please provide a stream key");
  }

  return errors;
}

// make a function that puts both streamkey and ingesturl automatically. If not invoke a function to create a channel

async function handleIngestEndpointChange(e) {
  handleValidationErrors(validate());

  try {
    client.config.ingestEndpoint = e.target.value;
  } catch {
    handleValidationErrors(["Incorrect Ingest Url"]);
  }
}

function handleStreamKeyChange(e) {
  handleValidationErrors(validate());
}

function handleValidationErrors(errors, doNotDisplay) {
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");

  clearError();
  if (errors && errors.length) {
    // Display errors
    if (!doNotDisplay) {
      setError(errors);
    }

    // Disable start and stop buttons
    start.disabled = true;
    stop.disabled = true;
    return;
  }

  start.disabled = false;
}

// Start the broadcast
async function startBroadcast() {
  const streamKeyEl = document.getElementById("stream-key");
  const endpointEl = document.getElementById("ingest-endpoint");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");

  try {
    start.disabled = true;
    start.hidden = true;
    stop.hidden = false;
    await window.client.startBroadcast(streamKeyEl.value, endpointEl.value);
  } catch (err) {
    start.disabled = false;
    start.hidden = false;
    stop.hidden = true;
    setError(err.toString());
  }
}

// Stop the broadcast
async function stopBroadcast() {
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");

  try {
    start.hidden = false;
    stop.hidden = true;
    await window.client.stopBroadcast();
  } catch (err) {
    start.hidden = true;
    stop.hidden = false;
    setError(err.toString());
  }
}
// mute microphone
async function toggleAudio() {
  const toggleAudioIcon = document.getElementById("toggleAudioIcon");
  const toggleAudioBtn = document.getElementById("toggleAudioBtn");

  try {
    if (toggleAudioIcon.classList.contains("volume_up")) {
      await window.client.disableAudio()
      toggleAudioIcon.classList.replace('volume_up', 'volume_off');
      toggleAudioBtn.classList.add('bg-red');
    } else if (toggleAudioIcon.classList.contains("volume_off")) {
      await window.client.enableAudio()
      toggleAudioIcon.classList.replace('volume_off', 'volume_up');
      toggleAudioBtn.classList.remove('bg-red');
    }
  } catch (err) {
    setError(err.toString());
  }
}

// turn off camera
async function toggleVideo() {
  const toggleVideoIcon = document.getElementById("toggleVideoIcon");
  const toggleVideoBtn = document.getElementById("toggleVideoBtn");

  try {
    if (toggleVideoIcon.classList.contains("video_camera")) {
      await window.client.disableVideo()
      toggleVideoIcon.classList.replace('video_camera', 'video_camera_off');
      toggleVideoBtn.classList.replace('color-light', 'bg-red');
    } else if (toggleVideoIcon.classList.contains("video_camera_off")) {
      await window.client.enableVideo()
      toggleVideoIcon.classList.replace('video_camera_off', 'video_camera');
      toggleVideoBtn.classList.replace('bg-red', 'color-light');
    }
  } catch (err) {
    setError(err.toString());
  }
}

async function getSessionTime() {
  const currentTime = moment();

  try {
    console.log(currentTime)
  } catch (err) {
    setError(err.toString());
  }
}

// Handle the enabling/disabling of buttons
function onActiveStateChange(active) {
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const streamConfigSelectEl = document.getElementById("stream-config");
  const inputEl = document.getElementById("stream-key");
  inputEl.disabled = active;
  start.disabled = active;
  stop.disabled = !active;
  streamConfigSelectEl.disabled = active;
}

// Helper to create an instance of the AmazonIVSBroadcastClient
async function createClient() {
  if (window.client) {
    window.client.delete();
  }

  window.client = window.IVSBroadcastClient.create(config);

  window.client.on(
    window.IVSBroadcastClient.BroadcastClientEvents.ACTIVE_STATE_CHANGE,
    (active) => {
      onActiveStateChange(active);
    }
  );

  const previewEl = document.getElementById("preview");
  window.client.attachPreview(previewEl);

  await handleVideoDeviceSelect();
  await handleAudioDeviceSelect();
}

// Initialization function
async function init() {
  try {
    const videoSelectEl = document.getElementById("video-devices");
    const audioSelectEl = document.getElementById("audio-devices");
    const streamConfigSelectEl = document.getElementById("stream-config");
    const ingestEndpointInputEl = document.getElementById("ingest-endpoint");
    const streamKeyInputEl = document.getElementById("stream-key");

    await initializeStreamConfigSelect();

    videoSelectEl.addEventListener("change", handleVideoDeviceSelect, true);
    audioSelectEl.addEventListener("change", handleAudioDeviceSelect, true);
    streamConfigSelectEl.addEventListener(
      "change",
      handleStreamConfigSelect,
      true
    );
    ingestEndpointInputEl.addEventListener(
      "input",
      handleIngestEndpointChange,
      true
    );
    streamKeyInputEl.addEventListener("input", handleStreamKeyChange, true);

    // Get initial values from the text fields.  Changes to these will re-create the client.
    const selectedConfig = streamConfigSelectEl.value;
    config.streamConfig = channelConfigs[selectedConfig][1];
    config.ingestEndpoint = ingestEndpointInputEl.value;

    await createClient();

    await initializeDeviceSelect();

    handleValidationErrors(validate(), true);
  } catch (err) {
    setError(err.message);
  }
}

init();
