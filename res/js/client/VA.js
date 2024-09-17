let live2dModel;
let mouthMotionData;
let animationIntervalId;
let audioParameterValues = {};
let isSpeaking = false; // Track if speech is active

// Variables to track dragging state
let isDragging = false;
let startPoint = { x: 0, y: 0 };
let dragThreshold = 10; // Minimum movement to qualify as a drag

// Create a PIXI application
const app = new PIXI.Application({
    view: document.getElementById('va-canvas'),
    autoStart: true,
    backgroundAlpha: 0, // Transparent background
});

// Load and display the Live2D model
PIXI.live2d.Live2DModel.from('./assets/VAmodel/VA Character.model3.json').then(model => {
    live2dModel = model;

    live2dModel.scale.set(0.15);
    live2dModel.anchor.set(0.5, 0.5);
    live2dModel.position.set(app.screen.width / 2, app.screen.height / 2);

    // Make the model interactive
    live2dModel.interactive = true;
    live2dModel.buttonMode = true; // Change cursor to pointer on hover

    app.stage.addChild(live2dModel);

    // Load mouth motion data
    PIXI.Loader.shared
        .add('mouthMotion', './assets/VAmodel/VA Character.motionsync3.json')
        .load((loader, resources) => {
            mouthMotionData = resources.mouthMotion ? resources.mouthMotion.data : null;
            applyMotionData();
        });

    // Event listeners for tap interaction
    live2dModel.on('pointerdown', onPointerDown);
    live2dModel.on('pointerup', onPointerUp);
    live2dModel.on('pointerupoutside', onPointerUp);
});

// Synchronize lip movement based on the motion data
function applyMotionData() {
    if (mouthMotionData) {
        const settings = mouthMotionData.Settings[0];
        const mappings = settings.Mappings;

        settings.AudioParameters.forEach(param => {
            audioParameterValues[param.Id] = 0;
        });

        function updateModelParameters() {
            for (let audioParamId in audioParameterValues) {
                const value = audioParameterValues[audioParamId];
                const mapping = mappings.find(m => m.Id === audioParamId);
                if (mapping) {
                    mapping.Targets.forEach(target => {
                        live2dModel.internalModel.coreModel.setParameterValueById(target.Id, target.Value * value);
                    });
                }
            }
        }

        // Update the mouth motion parameters at regular intervals
        setInterval(updateModelParameters, 150);
    }
}

// Simulate mouth movement based on random audio parameter values (for testing purposes)
function simulateAudioParameterChange() {
    audioParameterValues["A"] = Math.random();
    audioParameterValues["E"] = Math.random();
    audioParameterValues["I"] = Math.random();
    audioParameterValues["O"] = Math.random();
    audioParameterValues["U"] = Math.random();
}

// Track the starting point when the user taps
function onPointerDown(event) {
    startPoint = event.data.global;
    isDragging = false;
}

// Event handler for pointer up (tap detection)
function onPointerUp(event) {
    const currentPoint = event.data.global;
    const distance = Math.sqrt(
        Math.pow(currentPoint.x - startPoint.x, 2) + Math.pow(currentPoint.y - startPoint.y, 2)
    );

    // If the drag distance is less than the threshold, consider it a tap
    if (!isDragging && distance < dragThreshold) {
        handleTap(event);
    }

    // Reset dragging state
    isDragging = false;
}

// Handle tap interaction (trigger speech)
function handleTap(event) {
    event.stopPropagation(); // Prevent default behavior

    // If already speaking, ignore further taps
    if (isSpeaking) return;

    // Text the VA will say when tapped
    const text = "The sky is blue, the clouds are white, the leaves are green, the sun is bright";

    // Use speech synthesis directly, with Fred voice for iOS or male en-US for other phones
    speakWithNativeTTS(text);
}

// Function to speak using Speech Synthesis API, prioritize Fred for iOS and male en-US for other phones
function speakWithNativeTTS(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Get the list of available voices
    const voices = synth.getVoices();

    // Check if the device is running iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // Check if the device is a phone but not iOS
    const isPhoneNotIOS = /Mobile/.test(navigator.userAgent) && !isIOS;

    let selectedVoice;

    // If on iOS, attempt to use the 'Fred' voice
    if (isIOS) {
        selectedVoice = voices.find(voice => voice.name === 'Fred');
    }

    // If on other phones, attempt to use a male en-US voice by checking common male names
    if (isPhoneNotIOS) {
        selectedVoice = voices.find(voice =>
            (voice.lang === 'en-US') &&
            (voice.name.toLowerCase().includes('david') ||
                voice.name.toLowerCase().includes('daniel') ||
                voice.name.toLowerCase().includes('google us english') ||
                voice.name.toLowerCase().includes('microsoft guy') ||
                voice.name.toLowerCase().includes('Mark') ||
                voice.name.toLowerCase().includes('en-US-Wavenet-B'))
        );
    }

    // If Fred is not available, or not iOS, or no male voice found, fall back to default en-US voice
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang === 'en-US');
    }

    // Set the voice for the utterance
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // Set the isSpeaking flag to true when speech starts
    isSpeaking = true;

    // Reset the flag when speech ends
    utterance.onend = function () {
        isSpeaking = false;
    };

    synth.speak(utterance);
}

// Ensure voice list is populated after page load
window.onload = function () {
    window.speechSynthesis.onvoiceschanged = function () {
        window.speechSynthesis.getVoices();
    };
};
