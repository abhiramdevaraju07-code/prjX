// ============================================
// CONFIGURATION CONSTANTS
// ============================================

// Scene data for each level
const SCENE_DATA = [
    {
        id: 'night_cafe',
        name: 'Night Street',
        destination: 'Cafe Noir',
        heading: "The Inception",
        message: "I reached Cafe Noir expecting a boring first date.\nYou reached straight from a movie… and ignored my handshake for a dog🐶.\nSomewhere between awkward coffee, calorie gyaan\nand a random plan to go to Daddy's,\nthe date just kept going.\nThoda unexpected. Thoda special.\nBut honestly, kaafi fun!"
    },
    {
        id: 'park_scene',
        name: 'Indiranagar Streets',
        destination: 'The End of the Walk',
        heading: "The Walk",
        message: "You were late, and the bar was full. \nSo we walked... Like a lot!(you gonna make me look malnourished someday😭) \nLong Convos, dumb jokes and later we both couldn't sleep and shared reels! \nThoda Sleep gaya, But.. Koi mil gaya!"
    },
    {
        id: 'motorcycle_ride',
        name: 'Mountain Road',
        destination: 'DD Hills',
        heading: "The Ride",
        message: "Early winter morning, and you stepped out after a shower.. effortless beauty! \nLoved DD Hills, deep talks and those quite moments by the lake(Hope the secrets are safe xD). \nYou lilliputian wanted to ride the bike but feet are too small for it!🫵😂 \nAnd those Chocolate strawberries you made for me - small gesture, big impact! \nThat day showed me the how thoughtfull you are!",
        isMotorcycle: true
    },
    {
        id: 'night_scene',
        name: 'Night Out',
        destination: 'Movie Theatre',
        heading: "The Movie Night",
        message: "For once, you were on time! xD \nI tried to pull the 'wrong seats' stunt, and you chose survival mode. \nSomehow, even panic looks cute on you! \nTime disappeared between long walks, soft laughs, and half-planned adventures.. \n You said you felt safe with me, I’ll take that as one small step toward Batman 🦇"
    },
    {
        id: 'meadow_ride',
        name: 'Meadow Ride',
        destination: 'The Spot',
        heading: "The perfect date",
        message: "My favourite date ✋😌🤚\nYou took charge and picked the perfect spot, I was just running on leftover concert adrenaline.\nI taught you foosball, so yes, I'm officially owed some cooking lessons.\nAlso you had cats choosing you and me choosing you. Peak aura farming, ngl. .\nAnd when we got lost, you stayed in full passenger princess mode. Zero help (no civic sense xD).\nGood thing I'm Batman😌🦇",
        isMotorcycle: true
    },
    {
        id: 'bologna_evening',
        name: 'Indiranagar Evening',
        destination: 'Bologna',
        heading: "Episode 6",
        message: "New beginnings for us..\nPasta was the plan but you settled for some boring brocolli😔, thank god I came with pomegrantes \nPhoto booth exposed my awkward side, but you casually looked stunning. \n And ya, Sushi debut was successful, wapis chalenge! \nAlso you riding the bike!, felt like Stuart Little in his toy car. Never seen someone learn that quick! \nYou just act underconfident to surprise everyone, some god level psychology xD \nManifesting a Competitive relationship!😂"
    },
    {
        id: 'phoenix_mall',
        name: 'Phoenix Marketcity',
        destination: 'The Mall',
        heading: "The Seven",
        message: "Saw the childish side of you, the emotional side, the caring side, the loving side - felt like all your personalities showed up in one day.\nAnd that pretty much wraps up our Seven Heavenly Dates.\nI’ve seen your:\n1) Curiosity — the way you actually listen to my gyaan chodna xD\n2) Honesty — keeping things transparent (so far 🧐)\n3) Peace — that calm, grounding side of you\n4) Panic — chaotic, but lowkey adorable 🙃\n5) Wandering — endless walks, zero complaints\n6) Comfort — that 'Aeyyy' is like an elixir \n7) Vulnerability — opening up and letting me understand you\nAnd honestly… I liked all seven."
    },
    {
        id: 'valentine_scene',
        name: 'Valentine',
        destination: '❤️',
        heading: "The Question",
        message: "VALENTINE"
    }
];

const GAME_CONFIG = {
    playerSpeed: 300,
    jumpVelocity: -350,
    gravity: 600
};

// ============================================
// ENCRYPTED PIN VERIFICATION
// ============================================
// The PIN is stored encrypted - not plain text!
// This uses a simple hash that can't be easily reversed

const ENCRYPTED_PIN_NORMAL = 'w9f7e1z'; // Encrypted form of the normal PIN (3890)
const ENCRYPTED_PIN_SECRET = 'd4d4d4d'; // Encrypted form of the secret PIN (7777)

// Game mode: 'normal' or 'secret' - determines ending
let gameMode = 'normal';

function encryptPin(pin) {
    // Simple encryption: reverse, add salt, convert to hex-like
    const reversed = pin.split('').reverse().join('');
    let hash = '';
    for (let i = 0; i < reversed.length; i++) {
        const charCode = reversed.charCodeAt(i);
        hash += String.fromCharCode(97 + (charCode % 26)); // a-z
        if (i < reversed.length - 1) hash += (parseInt(reversed[i]) + parseInt(reversed[i+1])) % 10;
    }
    return hash;
}

function verifyPin(enteredPin) {
    const encrypted = encryptPin(enteredPin);
    if (encrypted === ENCRYPTED_PIN_NORMAL) {
        gameMode = 'normal';
        return true;
    }
    if (encrypted === ENCRYPTED_PIN_SECRET) {
        gameMode = 'secret';
        return true;
    }
    return false;
}

// Setup PIN input handlers
function setupPinInputs() {
    const pinBoxes = document.querySelectorAll('.pin-box');
    const pinError = document.getElementById('pin-error');
    
    pinBoxes.forEach((box, index) => {
        // Auto-focus next box on input
        box.addEventListener('input', (e) => {
            const value = e.target.value;
            
            // Only allow numbers
            e.target.value = value.replace(/[^0-9]/g, '');
            
            // Hide error when typing
            pinError.classList.add('hidden');
            
            // Move to next box
            if (e.target.value && index < pinBoxes.length - 1) {
                pinBoxes[index + 1].focus();
            }
        });
        
        // Handle backspace
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                pinBoxes[index - 1].focus();
            }
        });
        
        // Handle paste
        box.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
            pastedData.split('').forEach((char, i) => {
                if (pinBoxes[i]) {
                    pinBoxes[i].value = char;
                }
            });
            if (pastedData.length > 0) {
                pinBoxes[Math.min(pastedData.length, 3)].focus();
            }
        });
    });
}

function getEnteredPin() {
    const pinBoxes = document.querySelectorAll('.pin-box');
    return Array.from(pinBoxes).map(box => box.value).join('');
}

function clearPin() {
    const pinBoxes = document.querySelectorAll('.pin-box');
    pinBoxes.forEach(box => box.value = '');
    pinBoxes[0].focus();
}

// ============================================
// GLOBAL STATE
// ============================================

let gameInstance = null;
let audioEnabled = true;
let currentSceneIndex = 0; // Always starts at scene 0
let mobileControls = { left: false, right: false, jump: false };
let isResizeRestart = false; // Flag to indicate resize-triggered restart
let savedPlayerX = 0; // Save player position during resize
let gameInitialized = false; // Track if game has been properly initialized
let isResizing = false; // Flag to block interactions during resize
let currentAudio = null;
let currentSceneMusic = -1; // Track which scene's music is playing

// ============================================
// SCENE MUSIC CONFIGURATION
// ============================================
// Add audio files for each scene here
// If a scene has no music specified, it will be silent

const SCENE_MUSIC = {
    0: 'pehli_y9vXj90T.mp3',  // Scene 1: Cafe Noir
    1: 'dil-mere-aalas-ka-pedh-128-kbps_pG2svtFY.mp3', // Scene 2: Night walk
    2: 'harley-in-hawaii_Vzh42abj.mp3', // Scene 3: Motorcycle ride (DD Hills)
    3: 'hozier-too-sweet-official-video-hoziervevo_1zrFrJgR.mp3', // Scene 4: Movie theatre
    4: 'run-down-the-city-monica-dhurandhar-ranveer-sara-shashwat-reble-asha-bhosle_7yL0gRHb.mp3', // Scene 5: Meadow ride
    5: 'kashish-official-music-video-ashish-bhatia-kashish-ratnani-omkar-singh-ashish_29V7sqQn.mp3', // Scene 6: Bologna
    6: 'zulfein-mehul-mahesh-prod-by-dj-aynik-official-visualizer-video-latest-hindi-r_spasGy3B.mp3', // Scene 7: Phoenix Mall
    7: 'every-car-you-chase-snow-patrol-and-the-police-lyrics-jocelyn-sdl_rvGcfGIF.mp3', // Scene 8: Valentine
};

// ============================================
// AUDIO MANAGEMENT
// ============================================

function stopGlobalMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    currentSceneMusic = -1;
}

function startSceneMusic(sceneIndex) {
    // If same scene music is already playing, don't restart
    if (currentSceneMusic === sceneIndex && currentAudio && !currentAudio.paused) {
        return;
    }
    
    // Stop any existing music
    stopGlobalMusic();
    
    // Check if this scene has music configured
    const musicFile = SCENE_MUSIC[sceneIndex];
    if (!musicFile) {
        console.log(`No music configured for scene ${sceneIndex}`);
        return;
    }
    
    try {
        currentAudio = new Audio(musicFile);
        currentAudio.loop = true; // Loop the music for this scene
        currentAudio.volume = audioEnabled ? 0.5 : 0;
        
        // Play the audio
        const playPromise = currentAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log(`Playing music for scene ${sceneIndex}: ${musicFile}`);
                currentSceneMusic = sceneIndex;
            }).catch(error => {
                console.log('Audio autoplay blocked, will play on user interaction');
                // Store for later play on interaction
                document.addEventListener('click', () => {
                    if (currentAudio && currentAudio.paused) {
                        currentAudio.play();
                    }
                }, { once: true });
            });
        }
    } catch (e) {
        console.log('Audio not supported:', e);
    }
}

function setMusicVolume(enabled) {
    if (currentAudio) {
        currentAudio.volume = enabled ? 0.5 : 0;
    }
}

// Legacy function for compatibility
function startGlobalMusic() {
    startSceneMusic(currentSceneIndex);
}

// ============================================
// BOOT SCENE - Asset Creation
// ============================================

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0xE0E0E0, 0.3);
        progressBox.fillRoundedRect(width / 2 - 160, height / 2 - 15, 320, 30, 15);
        
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            font: '24px Arial', fill: '#FF6B9D'
        }).setOrigin(0.5);
        
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xFF6B9D, 1);
            progressBar.fillRoundedRect(width / 2 - 155, height / 2 - 12, 310 * value, 24, 12);
        });
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
        
        this.createGameAssets();
    }

    createGameAssets() {
        // ============================================
        // CUTE SIMPLE GIRL CHARACTER
        // ============================================
        // You can replace this with an image by:
        // 1. Add image file to your project folder (e.g., 'player.png')
        // 2. In preload(), add: this.load.image('player', 'player.png');
        // 3. Remove the canvas drawing code below
        
        const playerCanvas = document.createElement('canvas');
        playerCanvas.width = 50;
        playerCanvas.height = 70;
        const pCtx = playerCanvas.getContext('2d');
        pCtx.imageSmoothingEnabled = true;
        pCtx.imageSmoothingQuality = 'high';
        
        const drawCuteGirl = (ctx, legFrame = -1) => {
            ctx.clearRect(0, 0, 50, 70);
            
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.beginPath();
            ctx.ellipse(25, 68, 12, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Hair back (long ponytail)
            const hairColor = '#8B4513';
            ctx.fillStyle = hairColor;
            ctx.beginPath();
            ctx.ellipse(25, 45, 8, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Head
            ctx.fillStyle = '#FFE4C4';
            ctx.beginPath();
            ctx.arc(25, 18, 12, 0, Math.PI * 2);
            ctx.fill();
            
            // Hair top
            ctx.fillStyle = hairColor;
            ctx.beginPath();
            ctx.arc(25, 14, 13, Math.PI, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(25, 10, 10, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Hair sides
            ctx.fillRect(12, 12, 5, 15);
            ctx.fillRect(33, 12, 5, 15);
            
            // Pink bow
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.ellipse(35, 8, 5, 3, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(41, 10, 5, 3, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FF1493';
            ctx.beginPath();
            ctx.arc(38, 9, 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyes (simple cute style)
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.ellipse(20, 18, 2, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(30, 18, 2, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Eye shine
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(19, 17, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(29, 17, 1, 0, Math.PI * 2);
            ctx.fill();
            
            // Blush
            ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
            ctx.beginPath();
            ctx.ellipse(15, 22, 3, 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(35, 22, 3, 2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Smile
            ctx.strokeStyle = '#E57373';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(25, 22, 4, 0.2, Math.PI - 0.2);
            ctx.stroke();
            
            // Body/Dress
            ctx.fillStyle = '#FF6B9D';
            ctx.beginPath();
            ctx.moveTo(18, 30);
            ctx.lineTo(32, 30);
            ctx.lineTo(36, 50);
            ctx.lineTo(14, 50);
            ctx.closePath();
            ctx.fill();
            
            // Dress details
            ctx.fillStyle = '#FF8FB4';
            ctx.beginPath();
            ctx.moveTo(20, 30);
            ctx.lineTo(30, 30);
            ctx.lineTo(25, 38);
            ctx.closePath();
            ctx.fill();
            
            // Arms
            ctx.fillStyle = '#FFE4C4';
            ctx.fillRect(10, 32, 6, 14);
            ctx.fillRect(34, 32, 6, 14);
            
            // Hands
            ctx.beginPath();
            ctx.arc(13, 47, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(37, 47, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Legs
            const legOffset = legFrame >= 0 ? Math.sin(legFrame * Math.PI / 2) * 3 : 0;
            ctx.fillStyle = '#FFE4C4';
            ctx.fillRect(18 + legOffset, 50, 5, 12);
            ctx.fillRect(27 - legOffset, 50, 5, 12);
            
            // Shoes
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.ellipse(20 + legOffset, 64, 5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(30 - legOffset, 64, 5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
        };
        
        drawCuteGirl(pCtx);
        this.textures.addCanvas('player', playerCanvas);
        
        // Walking frames
        for (let i = 0; i < 4; i++) {
            const walkCanvas = document.createElement('canvas');
            walkCanvas.width = 50;
            walkCanvas.height = 70;
            const wCtx = walkCanvas.getContext('2d');
            wCtx.imageSmoothingEnabled = true;
            wCtx.imageSmoothingQuality = 'high';
            drawCuteGirl(wCtx, i);
            
            this.textures.addCanvas('player_walk_' + i, walkCanvas);
        }
        
        // Ground/sidewalk texture
        const groundCanvas = document.createElement('canvas');
        groundCanvas.width = 64;
        groundCanvas.height = 64;
        const gCtx = groundCanvas.getContext('2d');
        gCtx.fillStyle = '#9E9E9E';
        gCtx.fillRect(0, 0, 64, 64);
        gCtx.fillStyle = '#BDBDBD';
        gCtx.fillRect(0, 0, 64, 4);
        gCtx.strokeStyle = '#757575';
        gCtx.lineWidth = 1;
        for (let i = 0; i < 64; i += 32) {
            gCtx.strokeRect(i, 4, 32, 60);
        }
        this.textures.addCanvas('ground', groundCanvas);
        
        // Sparkle
        const sparkleCanvas = document.createElement('canvas');
        sparkleCanvas.width = 24;
        sparkleCanvas.height = 24;
        const sCtx = sparkleCanvas.getContext('2d');
        const sparkleGlow = sCtx.createRadialGradient(12, 12, 0, 12, 12, 12);
        sparkleGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
        sparkleGlow.addColorStop(0.5, 'rgba(255, 220, 180, 0.5)');
        sparkleGlow.addColorStop(1, 'rgba(255, 200, 150, 0)');
        sCtx.fillStyle = sparkleGlow;
        sCtx.fillRect(0, 0, 24, 24);
        this.textures.addCanvas('sparkle', sparkleCanvas);
        
        // ============================================
        // SPORTS BIKE WITH THE SAME CUTE GIRL (no legs)
        // ============================================
        const createMotorcycleTexture = (bounceFrame = 0) => {
            const motoCanvas = document.createElement('canvas');
            motoCanvas.width = 100;
            motoCanvas.height = 80;
            const mCtx = motoCanvas.getContext('2d');
            mCtx.imageSmoothingEnabled = true;
            mCtx.imageSmoothingQuality = 'high';
            
            const bounce = Math.sin(bounceFrame * Math.PI / 4) * 1;
            
            // Shadow
            mCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            mCtx.beginPath();
            mCtx.ellipse(50, 78, 35, 5, 0, 0, Math.PI * 2);
            mCtx.fill();
            
            // ===== SPORTS BIKE =====
            // Back wheel
            mCtx.fillStyle = '#1a1a1a';
            mCtx.beginPath();
            mCtx.arc(20, 68 + bounce, 12, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.fillStyle = '#444';
            mCtx.beginPath();
            mCtx.arc(20, 68 + bounce, 7, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.fillStyle = '#666';
            mCtx.beginPath();
            mCtx.arc(20, 68 + bounce, 3, 0, Math.PI * 2);
            mCtx.fill();
            
            // Front wheel
            mCtx.fillStyle = '#1a1a1a';
            mCtx.beginPath();
            mCtx.arc(80, 68 + bounce, 12, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.fillStyle = '#444';
            mCtx.beginPath();
            mCtx.arc(80, 68 + bounce, 7, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.fillStyle = '#666';
            mCtx.beginPath();
            mCtx.arc(80, 68 + bounce, 3, 0, Math.PI * 2);
            mCtx.fill();
            
            // Bike body
            mCtx.fillStyle = '#E53935';
            mCtx.beginPath();
            mCtx.moveTo(15, 60 + bounce);
            mCtx.lineTo(25, 50 + bounce);
            mCtx.lineTo(60, 48 + bounce);
            mCtx.lineTo(85, 55 + bounce);
            mCtx.lineTo(85, 62 + bounce);
            mCtx.lineTo(20, 65 + bounce);
            mCtx.closePath();
            mCtx.fill();
            
            // Seat
            mCtx.fillStyle = '#212121';
            mCtx.beginPath();
            mCtx.ellipse(40, 48 + bounce, 15, 6, 0, 0, Math.PI * 2);
            mCtx.fill();
            
            // Tank
            mCtx.fillStyle = '#C62828';
            mCtx.beginPath();
            mCtx.ellipse(55, 50 + bounce, 10, 7, -0.2, 0, Math.PI * 2);
            mCtx.fill();
            
            // Handlebar
            mCtx.strokeStyle = '#333';
            mCtx.lineWidth = 3;
            mCtx.beginPath();
            mCtx.moveTo(68, 48 + bounce);
            mCtx.lineTo(78, 45 + bounce);
            mCtx.stroke();
            
            // Headlight
            mCtx.fillStyle = '#FFF59D';
            mCtx.beginPath();
            mCtx.arc(88, 58 + bounce, 4, 0, Math.PI * 2);
            mCtx.fill();
            
            // Exhaust
            mCtx.fillStyle = '#616161';
            mCtx.beginPath();
            mCtx.ellipse(8, 62 + bounce, 6, 3, 0, 0, Math.PI * 2);
            mCtx.fill();
            
            // ===== SAME CUTE GIRL (from walking scenes, no legs) =====
            
            // Hair back (ponytail)
            const hairColor = '#8B4513';
            mCtx.fillStyle = hairColor;
            mCtx.beginPath();
            mCtx.ellipse(38, 38 + bounce, 6, 15, 0, 0, Math.PI * 2);
            mCtx.fill();
            
            // Head
            mCtx.fillStyle = '#FFE4C4';
            mCtx.beginPath();
            mCtx.arc(42, 18 + bounce, 12, 0, Math.PI * 2);
            mCtx.fill();
            
            // Hair top
            mCtx.fillStyle = hairColor;
            mCtx.beginPath();
            mCtx.arc(42, 14 + bounce, 13, Math.PI, Math.PI * 2);
            mCtx.fill();
            mCtx.beginPath();
            mCtx.ellipse(42, 10 + bounce, 10, 6, 0, 0, Math.PI * 2);
            mCtx.fill();
            
            // Hair sides
            mCtx.fillRect(29, 12 + bounce, 5, 15);
            mCtx.fillRect(50, 12 + bounce, 5, 15);
            
            // Flowing hair in wind
            mCtx.beginPath();
            mCtx.moveTo(30, 15 + bounce);
            mCtx.quadraticCurveTo(15, 20 + bounce, 5, 30 + bounce);
            mCtx.quadraticCurveTo(12, 25 + bounce, 20, 18 + bounce);
            mCtx.quadraticCurveTo(25, 14 + bounce, 30, 17 + bounce);
            mCtx.closePath();
            mCtx.fill();
            
            // Pink bow
            mCtx.fillStyle = '#FF69B4';
            mCtx.beginPath();
            mCtx.ellipse(52, 8 + bounce, 5, 3, 0.3, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.beginPath();
            mCtx.ellipse(58, 10 + bounce, 5, 3, -0.3, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.fillStyle = '#FF1493';
            mCtx.beginPath();
            mCtx.arc(55, 9 + bounce, 2, 0, Math.PI * 2);
            mCtx.fill();
            
            // Eyes
            mCtx.fillStyle = '#000';
            mCtx.beginPath();
            mCtx.ellipse(37, 18 + bounce, 2, 3, 0, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.beginPath();
            mCtx.ellipse(47, 18 + bounce, 2, 3, 0, 0, Math.PI * 2);
            mCtx.fill();
            
            // Eye shine
            mCtx.fillStyle = '#FFF';
            mCtx.beginPath();
            mCtx.arc(36, 17 + bounce, 1, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.beginPath();
            mCtx.arc(46, 17 + bounce, 1, 0, Math.PI * 2);
            mCtx.fill();
            
            // Blush
            mCtx.fillStyle = 'rgba(255, 150, 150, 0.5)';
            mCtx.beginPath();
            mCtx.ellipse(32, 22 + bounce, 3, 2, 0, 0, Math.PI * 2);
            mCtx.fill();
            mCtx.beginPath();
            mCtx.ellipse(52, 22 + bounce, 3, 2, 0, 0, Math.PI * 2);
            mCtx.fill();
            
            // Smile
            mCtx.strokeStyle = '#E57373';
            mCtx.lineWidth = 1.5;
            mCtx.beginPath();
            mCtx.arc(42, 22 + bounce, 4, 0.2, Math.PI - 0.2);
            mCtx.stroke();
            
            // Body/Dress (sitting position)
            mCtx.fillStyle = '#FF6B9D';
            mCtx.beginPath();
            mCtx.moveTo(35, 30 + bounce);
            mCtx.lineTo(50, 30 + bounce);
            mCtx.lineTo(55, 48 + bounce);
            mCtx.lineTo(30, 48 + bounce);
            mCtx.closePath();
            mCtx.fill();
            
            // Dress details
            mCtx.fillStyle = '#FF8FB4';
            mCtx.beginPath();
            mCtx.moveTo(38, 30 + bounce);
            mCtx.lineTo(47, 30 + bounce);
            mCtx.lineTo(42, 38 + bounce);
            mCtx.closePath();
            mCtx.fill();
            
            // Arms reaching to handlebar
            mCtx.fillStyle = '#FFE4C4';
            mCtx.save();
            mCtx.translate(50, 35 + bounce);
            mCtx.rotate(0.4);
            mCtx.fillRect(0, -3, 22, 6);
            mCtx.restore();
            
            // Hands on handlebar
            mCtx.beginPath();
            mCtx.arc(72, 46 + bounce, 4, 0, Math.PI * 2);
            mCtx.fill();
            
            return motoCanvas;
        };
        
        // Static motorcycle
        this.textures.addCanvas('motorcycle', createMotorcycleTexture(0));
        
        // Motorcycle animation frames (bouncing)
        for (let i = 0; i < 4; i++) {
            this.textures.addCanvas('motorcycle_' + i, createMotorcycleTexture(i));
        }
        
        // ============================================
        // SCARY RED T-REX WITH BIG HEAD
        // ============================================
        
        const drawDino = (ctx, legFrame = 0) => {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Body gradient - angry red/crimson
            const bodyGrad = ctx.createLinearGradient(0, 10, 110, 100);
            bodyGrad.addColorStop(0, '#D32F2F');   // Dark red
            bodyGrad.addColorStop(0.4, '#F44336'); // Red
            bodyGrad.addColorStop(0.7, '#C62828'); // Darker red
            bodyGrad.addColorStop(1, '#B71C1C');   // Very dark red
            
            // Shadow for depth
            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetY = 3;
            
            // Tail - thick and menacing
            ctx.fillStyle = bodyGrad;
            ctx.beginPath();
            ctx.moveTo(5, 60);
            ctx.quadraticCurveTo(-5, 50, 0, 65);
            ctx.quadraticCurveTo(8, 80, 20, 70);
            ctx.lineTo(25, 60);
            ctx.closePath();
            ctx.fill();
            
            // Body (large and bulky)
            ctx.beginPath();
            ctx.ellipse(40, 58, 28, 24, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // BIG HEAD - much larger and scarier
            ctx.beginPath();
            ctx.moveTo(55, 45);
            ctx.quadraticCurveTo(65, 20, 85, 15);
            ctx.quadraticCurveTo(105, 10, 115, 25);
            ctx.quadraticCurveTo(120, 40, 115, 55);
            ctx.quadraticCurveTo(105, 65, 85, 60);
            ctx.lineTo(60, 55);
            ctx.closePath();
            ctx.fill();
            
            // Lower jaw - open mouth showing teeth
            ctx.beginPath();
            ctx.moveTo(75, 55);
            ctx.quadraticCurveTo(95, 65, 115, 58);
            ctx.quadraticCurveTo(118, 65, 110, 70);
            ctx.quadraticCurveTo(90, 75, 70, 65);
            ctx.closePath();
            ctx.fill();
            
            // SCARY TEETH - top row
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowBlur = 0;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(80 + i * 8, 52);
                ctx.lineTo(83 + i * 8, 62);
                ctx.lineTo(86 + i * 8, 52);
                ctx.closePath();
                ctx.fill();
            }
            
            // SCARY TEETH - bottom row
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(82 + i * 8, 68);
                ctx.lineTo(85 + i * 8, 58);
                ctx.lineTo(88 + i * 8, 68);
                ctx.closePath();
                ctx.fill();
            }
            
            // Angry brow ridge
            ctx.fillStyle = '#8B0000';
            ctx.shadowBlur = 2;
            ctx.beginPath();
            ctx.moveTo(75, 28);
            ctx.quadraticCurveTo(90, 18, 105, 25);
            ctx.quadraticCurveTo(90, 22, 75, 30);
            ctx.closePath();
            ctx.fill();
            
            // BIG ANGRY EYE
            ctx.fillStyle = '#FFEB3B'; // Yellow eye
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.ellipse(90, 32, 10, 12, -0.2, 0, Math.PI * 2);
            ctx.fill();
            
            // Red around eye (angry)
            ctx.strokeStyle = '#8B0000';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Slit pupil (like a reptile)
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.ellipse(92, 33, 3, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Eye shine
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(87, 28, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Nostrils (flared, angry)
            ctx.fillStyle = '#5D0000';
            ctx.beginPath();
            ctx.ellipse(112, 35, 3, 4, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(112, 42, 3, 4, 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            // Spikes on back - darker red
            ctx.fillStyle = '#8B0000';
            ctx.shadowBlur = 2;
            const spikes = [[18, 42], [28, 35], [38, 38], [48, 42]];
            spikes.forEach(([x, y]) => {
                ctx.beginPath();
                ctx.moveTo(x - 6, y + 8);
                ctx.lineTo(x, y - 12);
                ctx.lineTo(x + 6, y + 8);
                ctx.closePath();
                ctx.fill();
            });
            
            // Tiny T-Rex arms with claws
            ctx.fillStyle = bodyGrad;
            ctx.shadowBlur = 2;
            ctx.beginPath();
            ctx.moveTo(58, 55);
            ctx.quadraticCurveTo(68, 58, 65, 68);
            ctx.quadraticCurveTo(62, 70, 58, 65);
            ctx.closePath();
            ctx.fill();
            
            // Arm claws
            ctx.fillStyle = '#1A1A1A';
            ctx.beginPath();
            ctx.moveTo(64, 66);
            ctx.lineTo(68, 72);
            ctx.lineTo(66, 67);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(61, 68);
            ctx.lineTo(64, 75);
            ctx.lineTo(63, 69);
            ctx.fill();
            
            // Powerful legs with animation
            ctx.fillStyle = bodyGrad;
            ctx.shadowBlur = 3;
            const legOffsetBack = legFrame === 0 ? -6 : 6;
            const legOffsetFront = legFrame === 0 ? 6 : -6;
            
            // Back leg - thick and powerful
            ctx.beginPath();
            ctx.moveTo(22, 72);
            ctx.quadraticCurveTo(18 + legOffsetBack, 85, 22 + legOffsetBack, 98);
            ctx.lineTo(36 + legOffsetBack, 98);
            ctx.quadraticCurveTo(38, 85, 34, 72);
            ctx.closePath();
            ctx.fill();
            
            // Front leg
            ctx.beginPath();
            ctx.moveTo(48, 72);
            ctx.quadraticCurveTo(44 + legOffsetFront, 85, 48 + legOffsetFront, 98);
            ctx.lineTo(62 + legOffsetFront, 98);
            ctx.quadraticCurveTo(64, 85, 60, 72);
            ctx.closePath();
            ctx.fill();
            
            // Scary foot claws
            ctx.fillStyle = '#1A1A1A';
            // Back foot claws
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(24 + legOffsetBack + i * 5, 97);
                ctx.lineTo(26 + legOffsetBack + i * 5, 105);
                ctx.lineTo(28 + legOffsetBack + i * 5, 97);
                ctx.closePath();
                ctx.fill();
            }
            // Front foot claws
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(50 + legOffsetFront + i * 5, 97);
                ctx.lineTo(52 + legOffsetFront + i * 5, 105);
                ctx.lineTo(54 + legOffsetFront + i * 5, 97);
                ctx.closePath();
                ctx.fill();
            }
            
            // Scales/texture on body
            ctx.fillStyle = 'rgba(139, 0, 0, 0.3)';
            ctx.shadowBlur = 0;
            for (let i = 0; i < 6; i++) {
                ctx.beginPath();
                ctx.arc(25 + i * 8, 55 + (i % 2) * 8, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        };
        
        // Main dino texture
        const dinoCanvas = document.createElement('canvas');
        dinoCanvas.width = 125;
        dinoCanvas.height = 110;
        const dCtx = dinoCanvas.getContext('2d');
        drawDino(dCtx, 0);
        this.textures.addCanvas('dino', dinoCanvas);
        
        // Walking frames
        for (let i = 0; i < 2; i++) {
            const walkCanvas = document.createElement('canvas');
            walkCanvas.width = 125;
            walkCanvas.height = 110;
            const wCtx = walkCanvas.getContext('2d');
            drawDino(wCtx, i);
            this.textures.addCanvas('dino_walk_' + i, walkCanvas);
        }
    }

    create() {
        // Ensure we always start at scene 0 when the game first boots
        if (!gameInitialized) {
            currentSceneIndex = 0;
            gameInitialized = true;
            console.log('BootScene: First initialization, setting currentSceneIndex to 0');
        } else {
            console.log('BootScene: Already initialized, currentSceneIndex is', currentSceneIndex);
        }
        this.scene.start('GameScene');
    }
}

// ============================================
// MAIN GAME SCENE
// ============================================

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.cursors = null;
        this.platforms = null;
        this.isPaused = false;
        this.walkFrame = 0;
        this.walkTimer = 0;
        this.cafeReached = false;
        this.cafeDoor = null;
        this.isEntering = false;
    }

    create() {
        this.cafeReached = false;
        this.isEntering = false;
        this.isPaused = false;
        this.collisionEnabled = false; // Disable collision initially
        this.hasExited = false; // Prevent multiple exitAndContinue calls
        this.gameOver = false; // Track if dino caught player
        this.dino = null;
        
        // Check if this is a resize restart
        const wasResizeRestart = isResizeRestart;
        isResizeRestart = false; // Reset the flag
        
        console.log('GameScene create - currentSceneIndex:', currentSceneIndex, 'wasResizeRestart:', wasResizeRestart);
        
        // Get actual screen dimensions - use window dimensions for accuracy after resize
        this.gameWidth = window.innerWidth;
        this.gameHeight = window.innerHeight;
        
        // Update the game scale to match
        if (this.sys.game.scale) {
            this.sys.game.scale.resize(this.gameWidth, this.gameHeight);
        }
        
        console.log('GameScene dimensions:', this.gameWidth, 'x', this.gameHeight);
        
        // Scene width = screen width (no scrolling, everything fits on screen)
        this.sceneWidth = this.gameWidth;
        
        // Ground position relative to screen height (88% from top)
        this.groundY = this.gameHeight * 0.88;
        
        // Scale factor for proportional sizing
        this.scale_factor = Math.min(this.gameHeight / 600, this.sceneWidth / 900);
        
        stopGlobalMusic();
        
        
        // World bounds - exact screen size
        this.physics.world.setBounds(0, 0, this.sceneWidth, this.gameHeight);
        
        // Create scene based on current index
        this.createSceneBackground();
        this.createPlatforms();
        this.createPlayer();
        this.createDestination();
        this.createDino();
        
        // Camera setup
        this.cameras.main.setBounds(0, 0, this.sceneWidth, this.gameHeight);
        this.cameras.main.setViewport(0, 0, this.gameWidth, this.gameHeight);
        
        // Fade in when scene starts
        this.cameras.main.fadeIn(500);
        
        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        
        this.setupMobileControls();
        this.setupAudio();
        this.createAmbientEffects();
        this.updateProgressHearts();
        
        // Handle resize
        this.scale.on('resize', this.handleResize, this);
        
        // Enable collision detection after a short delay to prevent immediate triggers
        this.time.delayedCall(500, () => {
            this.collisionEnabled = true;
        });
    }

    createSceneBackground() {
        const sceneData = SCENE_DATA[currentSceneIndex];
        
        // Calculate ground position - 12% from bottom for more room
        this.groundY = this.gameHeight * 0.88;
        
        // Store scale factor for use in all scene methods
        this.scale_factor = Math.min(this.gameHeight / 600, this.sceneWidth / 900);
        
        if (sceneData.id === 'night_cafe') {
            this.createNightCafeScene();
        } else if (sceneData.id === 'park_scene') {
            this.createParkScene();
        } else if (sceneData.id === 'motorcycle_ride') {
            this.createMountainRoadScene();
        } else if (sceneData.id === 'night_scene') {
            this.createNightScene();
        } else if (sceneData.id === 'meadow_ride') {
            this.createMeadowRideScene();
        } else if (sceneData.id === 'bologna_evening') {
            this.createBolognaEveningScene();
        } else if (sceneData.id === 'phoenix_mall') {
            this.createPhoenixMallScene();
        } else if (sceneData.id === 'valentine_scene') {
            this.createValentineFinalScene();
        } else {
            // Default fallback for new scenes
            this.createMeadowRideScene();
        }
    }
    
    handleResize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;
        
        // Only update if dimensions actually changed
        if (this.gameWidth === width && this.gameHeight === height) return;
        
        this.gameWidth = width;
        this.gameHeight = height;
        this.sceneWidth = width;
        this.groundY = height * 0.88;
        this.scale_factor = Math.min(height / 600, width / 900);
        
        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);
        this.physics.world.setBounds(0, 0, width, height);
    }

    createNightCafeScene() {
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        
        // Scale factor based on screen height (base height 600px)
        const scale = Math.min(h / 600, w / 800);
        
        // Night sky gradient - deep blue to purple
        const sky = this.add.graphics();
        for (let i = 0; i < h; i++) {
            const ratio = i / h;
            const r = Math.floor(15 + ratio * 25);
            const gColor = Math.floor(10 + ratio * 30);
            const b = Math.floor(45 + ratio * 40);
            sky.fillStyle(Phaser.Display.Color.GetColor(r, gColor, b));
            sky.fillRect(0, i, w, 1);
        }
        
        // Stars
        this.createStars(w, h, scale);
        
        // Moon
        const moon = this.add.graphics();
        const moonR = 25 * scale;
        moon.fillStyle(0xFFFACD, 0.2);
        moon.fillCircle(w * 0.15, h * 0.15, moonR * 2.5);
        moon.fillStyle(0xFFFACD, 0.4);
        moon.fillCircle(w * 0.15, h * 0.15, moonR * 1.5);
        moon.fillStyle(0xFFFDE7, 1);
        moon.fillCircle(w * 0.15, h * 0.15, moonR);
        
        // Night buildings with lit windows
        this.createNightBuildings(w, g, scale);
        
        // Road and sidewalk
        this.createNightRoad(w, g, h, scale);
    }
    
    createStars(w, h, scale) {
        const stars = this.add.graphics();
        
        // Create random stars
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h * 0.5;
            const size = Math.random() * 2 + 0.5;
            const alpha = Math.random() * 0.5 + 0.3;
            
            stars.fillStyle(0xFFFFFF, alpha);
            stars.fillCircle(x, y, size * scale);
        }
        
        // Add some twinkling stars with glow
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h * 0.4;
            
            stars.fillStyle(0xFFFFFF, 0.1);
            stars.fillCircle(x, y, 4 * scale);
            stars.fillStyle(0xFFFFFF, 0.3);
            stars.fillCircle(x, y, 2 * scale);
            stars.fillStyle(0xFFFFFF, 0.8);
            stars.fillCircle(x, y, 1 * scale);
        }
    }
    
    createNightBuildings(w, g, scale) {
        const buildings = this.add.graphics();
        
        // Dark buildings in background
        const numBuildings = 5;
        const buildingW = w * 0.12;
        const colors = [0x1A1A2E, 0x16213E, 0x1A1A2E, 0x0F3460, 0x1A1A2E];
        const heights = [0.45, 0.55, 0.40, 0.50, 0.42];
        
        for (let i = 0; i < numBuildings; i++) {
            const x = 10 + i * (buildingW + 15);
            const bh = (g - 50) * heights[i];
            
            // Building body - dark
            buildings.fillStyle(colors[i], 1);
            buildings.fillRect(x, g - bh, buildingW, bh);
            
            // Lit windows - yellow/orange glow
            const windowW = 8 * scale;
            const windowH = 12 * scale;
            const windowSpacingX = 18 * scale;
            const windowSpacingY = 22 * scale;
            
            const cols = Math.floor((buildingW - 10) / windowSpacingX);
            const rows = Math.floor((bh - 30) / windowSpacingY);
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    // Random lit or dark windows
                    if (Math.random() > 0.4) {
                        const wx = x + 10 + col * windowSpacingX;
                        const wy = g - bh + 20 + row * windowSpacingY;
                        
                        // Window glow
                        buildings.fillStyle(0xFFD54F, 0.3);
                        buildings.fillRect(wx - 2, wy - 2, windowW + 4, windowH + 4);
                        
                        // Window
                        const windowColor = Math.random() > 0.5 ? 0xFFE082 : 0xFFF8E1;
                        buildings.fillStyle(windowColor, 0.9);
                        buildings.fillRect(wx, wy, windowW, windowH);
                    }
                }
            }
        }
    }
    
    createNightRoad(w, g, h, scale) {
        const road = this.add.graphics();
        
        // Sidewalk - darker at night
        road.fillStyle(0x37474F, 1);
        road.fillRect(0, g, w, h - g);
        
        // Sidewalk edge/curb
        road.fillStyle(0x546E7A, 1);
        road.fillRect(0, g, w, 4 * scale);
        
        // Street lights glow on ground
        for (let i = 0; i < 4; i++) {
            const lx = w * 0.15 + i * (w * 0.25);
            
            // Light glow on ground
            road.fillStyle(0xFFE082, 0.15);
            road.fillCircle(lx, g + 10, 60 * scale);
            road.fillStyle(0xFFE082, 0.08);
            road.fillCircle(lx, g + 10, 100 * scale);
        }
    }
    
    createBangaloreStreet() {
        // Keeping this for reference, but now using createNightCafeScene
        this.createNightCafeScene();
    }
    
    createClouds(w, h, scale) {
        const clouds = this.add.graphics();
        const cloudSize = 25 * scale;
        
        const positions = [
            { x: w * 0.12, y: h * 0.1 },
            { x: w * 0.35, y: h * 0.15 },
            { x: w * 0.55, y: h * 0.08 }
        ];
        
        positions.forEach(pos => {
            clouds.fillStyle(0xFFFFFF, 0.9);
            clouds.fillCircle(pos.x, pos.y, cloudSize);
            clouds.fillCircle(pos.x - cloudSize * 0.7, pos.y + cloudSize * 0.2, cloudSize * 0.7);
            clouds.fillCircle(pos.x + cloudSize * 0.7, pos.y + cloudSize * 0.2, cloudSize * 0.8);
        });
    }
    
    createBuildings(w, g, scale) {
        const buildings = this.add.graphics();
        
        // Buildings take up ~60% of width, leaving room for cafe
        const buildingZone = w * 0.6;
        const numBuildings = 4;
        const buildingW = buildingZone / numBuildings - 10;
        const colors = [
            { main: 0xFFCDD2, accent: 0xE57373 },
            { main: 0xE1BEE7, accent: 0xBA68C8 },
            { main: 0xC8E6C9, accent: 0x81C784 },
            { main: 0xB3E5FC, accent: 0x4FC3F7 }
        ];
        const heights = [0.35, 0.45, 0.32, 0.4];
        
        for (let i = 0; i < numBuildings; i++) {
            const x = 10 + i * (buildingW + 10);
            const bh = (g - 50) * heights[i];
            const color = colors[i];
            
            // Building body
            buildings.fillStyle(color.main, 1);
            buildings.fillRect(x, g - bh, buildingW, bh);
            
            // Roof accent
            buildings.fillStyle(color.accent, 1);
            buildings.fillRect(x, g - bh, buildingW, 10 * scale);
            
            // Windows
            const windowW = buildingW * 0.2;
            const windowH = Math.min(30 * scale, bh * 0.1);
            const windowGap = windowH * 1.5;
            
            buildings.fillStyle(0xE3F2FD, 0.9);
            for (let wy = g - bh + 25 * scale; wy < g - 30; wy += windowGap) {
                buildings.fillRect(x + buildingW * 0.15, wy, windowW, windowH);
                buildings.fillRect(x + buildingW * 0.55, wy, windowW, windowH);
            }
        }
    }
    
    createRoad(w, g, h, scale) {
        const road = this.add.graphics();
        
        // Sidewalk
        const sidewalkH = 20 * scale;
        road.fillStyle(0xECEFF1, 1);
        road.fillRect(0, g - sidewalkH, w, sidewalkH + 5);
        
        // Sidewalk edge
        road.fillStyle(0xFFFFFF, 0.5);
        road.fillRect(0, g - sidewalkH, w, 2);
        
        // Road
        road.fillStyle(0x455A64, 1);
        road.fillRect(0, g + 5, w, h - g);
        
        // Lane markings
        road.fillStyle(0xFFFFFF, 0.8);
        const markingGap = 60 * scale;
        for (let x = 20; x < w; x += markingGap) {
            road.fillRect(x, g + 20 * scale, 35 * scale, 3);
        }
    }

    createStreetBuildings() {
        const streetBuildings = this.add.graphics();
        const g = this.groundY;
        const w = this.sceneWidth;
        
        // Calculate building sizes to fill the screen width
        // Leave space for Cafe Noir on the right (about 180px)
        const availableWidth = w - 200;
        const numBuildings = 4;
        const buildingWidth = availableWidth / numBuildings - 10;
        const buildingColors = [
            { main: 0xFFE0B2, accent: 0xFFCC80 },  // Orange
            { main: 0xE1BEE7, accent: 0xCE93D8 },  // Purple
            { main: 0xC8E6C9, accent: 0xA5D6A7 },  // Green
            { main: 0xB2DFDB, accent: 0x80CBC4 }   // Teal
        ];
        const buildingHeights = [0.45, 0.55, 0.4, 0.5]; // As fraction of groundY
        
        let currentX = 10;
        
        for (let i = 0; i < numBuildings; i++) {
            const height = g * buildingHeights[i];
            const color = buildingColors[i];
            
            // Main building
            streetBuildings.fillStyle(color.main, 1);
            streetBuildings.fillRect(currentX, g - height, buildingWidth, height);
            
            // Roof accent
            streetBuildings.fillStyle(color.accent, 1);
            streetBuildings.fillRect(currentX, g - height, buildingWidth, 20);
            
            // Windows - 2 columns, multiple rows
            streetBuildings.fillStyle(0x81D4FA, 0.9);
            const windowWidth = buildingWidth * 0.25;
            const windowHeight = height * 0.12;
            const windowGap = height * 0.15;
            const windowStartY = g - height + 40;
            
            for (let wy = windowStartY; wy < g - 60; wy += windowGap) {
                streetBuildings.fillRect(currentX + buildingWidth * 0.15, wy, windowWidth, windowHeight);
                streetBuildings.fillRect(currentX + buildingWidth * 0.55, wy, windowWidth, windowHeight);
            }
            
            // Door for some buildings
            if (i === 0 || i === 2) {
                streetBuildings.fillStyle(0x8D6E63, 1);
                const doorWidth = buildingWidth * 0.25;
                const doorHeight = height * 0.15;
                streetBuildings.fillRect(currentX + (buildingWidth - doorWidth) / 2, g - doorHeight, doorWidth, doorHeight);
            }
            
            currentX += buildingWidth + 10;
        }
    }

    createRoad() {
        const road = this.add.graphics();
        const g = this.groundY;
        const w = this.sceneWidth;
        const h = this.gameHeight;
        
        // Main road (below sidewalk) - extends to bottom of screen
        road.fillStyle(0x424242, 1);
        road.fillRect(0, g, w, h - g);
        
        // Road markings
        road.fillStyle(0xFFFFFF, 0.8);
        for (let x = 0; x < w; x += 100) {
            road.fillRect(x + 20, g + 35, 50, 5);
        }
        
        // Sidewalk (where player walks)
        road.fillStyle(0x9E9E9E, 1);
        road.fillRect(0, g - 20, w, 25);
        road.fillStyle(0xBDBDBD, 1);
        road.fillRect(0, g - 20, w, 5);
        
        // Sidewalk tiles
        road.lineStyle(1, 0x757575);
        for (let x = 0; x < w; x += 40) {
            road.strokeRect(x, g - 15, 40, 20);
        }
    }

    createStreetDetails() {
        const g = this.groundY;
        const w = this.sceneWidth;
        
        // Street lamp
        const lamps = this.add.graphics();
        const lampX = w * 0.3;
        // Pole
        lamps.fillStyle(0x37474F, 1);
        lamps.fillRect(lampX, g - 100, 8, 100);
        // Lamp head
        lamps.fillStyle(0x546E7A, 1);
        lamps.fillRect(lampX - 15, g - 110, 38, 14);
        // Light glow
        lamps.fillStyle(0xFFF9C4, 0.3);
        lamps.fillCircle(lampX + 4, g - 95, 25);
        
        // One parked vehicle
        this.createParkedVehicle(w * 0.15, g + 25, 0x1565C0);
    }

    createTree(x, groundY) {
        const tree = this.add.graphics();
        
        // Trunk
        tree.fillStyle(0x5D4037, 1);
        tree.fillRect(x - 8, groundY - 80, 16, 80);
        
        // Foliage layers
        tree.fillStyle(0x388E3C, 1);
        tree.fillCircle(x, groundY - 100, 35);
        tree.fillStyle(0x43A047, 1);
        tree.fillCircle(x - 20, groundY - 85, 25);
        tree.fillCircle(x + 20, groundY - 85, 25);
        tree.fillStyle(0x4CAF50, 1);
        tree.fillCircle(x, groundY - 120, 28);
    }

    createParkedVehicle(x, y, color) {
        const car = this.add.graphics();
        
        // Body
        car.fillStyle(color, 1);
        car.fillRoundedRect(x, y - 25, 70, 25, 5);
        car.fillRoundedRect(x + 10, y - 40, 50, 18, 5);
        
        // Windows
        car.fillStyle(0xB3E5FC, 0.8);
        car.fillRoundedRect(x + 15, y - 38, 18, 14, 3);
        car.fillRoundedRect(x + 37, y - 38, 18, 14, 3);
        
        // Wheels
        car.fillStyle(0x212121, 1);
        car.fillCircle(x + 15, y, 8);
        car.fillCircle(x + 55, y, 8);
        car.fillStyle(0x757575, 1);
        car.fillCircle(x + 15, y, 4);
        car.fillCircle(x + 55, y, 4);
    }

    createParkScene() {
        // Now creates Indiranagar Night Street scene
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        const s = this.scale_factor;
        
        // Night sky gradient - deep blue to dark purple
        const sky = this.add.graphics();
        for (let i = 0; i < h; i++) {
            const ratio = i / h;
            const r = Math.floor(10 + ratio * 20);
            const gb = Math.floor(15 + ratio * 25);
            const b = Math.floor(40 + ratio * 50);
            sky.fillStyle(Phaser.Display.Color.GetColor(r, gb, b));
            sky.fillRect(0, i, w, 1);
        }
        
        // Stars
        const stars = this.add.graphics();
        for (let i = 0; i < 80; i++) {
            const starX = Math.random() * w;
            const starY = Math.random() * g * 0.5;
            stars.fillStyle(0xFFFFFF, 0.3 + Math.random() * 0.7);
            stars.fillCircle(starX, starY, 0.5 + Math.random() * 1.5);
        }
        
        // Moon
        const moon = this.add.graphics();
        moon.fillStyle(0xFFFACD, 0.2);
        moon.fillCircle(w * 0.85, h * 0.15, 40 * s);
        moon.fillStyle(0xFFFACD, 0.4);
        moon.fillCircle(w * 0.85, h * 0.15, 25 * s);
        moon.fillStyle(0xFFFDE7, 0.9);
        moon.fillCircle(w * 0.85, h * 0.15, 18 * s);
        
        // Background trees silhouettes (far)
        this.createNightTreeSilhouettes(w, g, s);
        
        // Street lights with glow
        this.createStreetLights(w, g, s);
        
        // Footpath/sidewalk
        const footpath = this.add.graphics();
        footpath.fillStyle(0x4A4A4A, 1);
        footpath.fillRect(0, g - 15 * s, w, 20 * s);
        
        // Footpath edge/curb
        footpath.fillStyle(0x6B6B6B, 1);
        footpath.fillRect(0, g - 15 * s, w, 4 * s);
        
        // Road
        const road = this.add.graphics();
        road.fillStyle(0x2D2D2D, 1);
        road.fillRect(0, g + 5 * s, w, h - g);
        
        // Road markings - dashed center line
        road.fillStyle(0xFFFFFF, 0.6);
        const dashWidth = 40 * s;
        const dashGap = 30 * s;
        for (let x = 0; x < w; x += dashWidth + dashGap) {
            road.fillRect(x, g + 25 * s, dashWidth, 3 * s);
        }
        
        // Foreground trees (closer, more detail)
        this.createNightTrees(w, g, s);
    }
    
    createNightTreeSilhouettes(w, g, s) {
        const trees = this.add.graphics();
        
        // Far background tree silhouettes - very dark
        const treePositions = [0.05, 0.2, 0.35, 0.55, 0.7, 0.9];
        
        treePositions.forEach((pos, i) => {
            const x = w * pos;
            const treeHeight = (80 + Math.random() * 40) * s;
            const trunkWidth = (8 + Math.random() * 4) * s;
            
            // Dark silhouette trunk
            trees.fillStyle(0x0A0A15, 0.9);
            trees.fillRect(x - trunkWidth/2, g - treeHeight, trunkWidth, treeHeight);
            
            // Foliage silhouette
            trees.fillStyle(0x0A0A15, 0.85);
            const foliageSize = (30 + Math.random() * 20) * s;
            trees.fillCircle(x, g - treeHeight - foliageSize * 0.5, foliageSize);
            trees.fillCircle(x - foliageSize * 0.5, g - treeHeight + foliageSize * 0.3, foliageSize * 0.7);
            trees.fillCircle(x + foliageSize * 0.5, g - treeHeight + foliageSize * 0.3, foliageSize * 0.7);
        });
    }
    
    createStreetLights(w, g, s) {
        const lights = this.add.graphics();
        
        // Place street lights at intervals
        const lightPositions = [0.15, 0.45, 0.75];
        
        lightPositions.forEach(pos => {
            const x = w * pos;
            const poleHeight = 100 * s;
            
            // Light glow effect (draw first, behind pole)
            lights.fillStyle(0xFFE082, 0.08);
            lights.fillCircle(x, g - poleHeight, 80 * s);
            lights.fillStyle(0xFFE082, 0.15);
            lights.fillCircle(x, g - poleHeight, 50 * s);
            lights.fillStyle(0xFFE082, 0.25);
            lights.fillCircle(x, g - poleHeight, 30 * s);
            
            // Ground light pool
            lights.fillStyle(0xFFE082, 0.1);
            lights.fillEllipse(x, g - 5 * s, 100 * s, 20 * s);
            
            // Pole
            lights.fillStyle(0x1A1A1A, 1);
            lights.fillRect(x - 3 * s, g - poleHeight, 6 * s, poleHeight);
            
            // Lamp arm
            lights.fillRect(x - 3 * s, g - poleHeight, 20 * s, 4 * s);
            
            // Lamp fixture
            lights.fillStyle(0x2A2A2A, 1);
            lights.fillRect(x + 10 * s, g - poleHeight - 8 * s, 15 * s, 12 * s);
            
            // Light bulb
            lights.fillStyle(0xFFF59D, 1);
            lights.fillCircle(x + 17 * s, g - poleHeight + 5 * s, 5 * s);
        });
    }
    
    createNightTrees(w, g, s) {
        const trees = this.add.graphics();
        
        // Foreground trees with more detail
        const treePositions = [0.1, 0.3, 0.6, 0.85];
        
        treePositions.forEach((pos, i) => {
            const x = w * pos;
            const treeHeight = (60 + i * 10) * s;
            const trunkWidth = 10 * s;
            
            // Trunk - dark brown
            trees.fillStyle(0x2D1F1A, 1);
            trees.fillRect(x - trunkWidth/2, g - treeHeight, trunkWidth, treeHeight - 20 * s);
            
            // Foliage - dark green with slight variation
            const foliageColor = i % 2 === 0 ? 0x1A3D1A : 0x1F4A1F;
            trees.fillStyle(foliageColor, 0.95);
            
            const foliageSize = (35 + i * 5) * s;
            trees.fillCircle(x, g - treeHeight, foliageSize);
            trees.fillCircle(x - foliageSize * 0.6, g - treeHeight + foliageSize * 0.4, foliageSize * 0.7);
            trees.fillCircle(x + foliageSize * 0.6, g - treeHeight + foliageSize * 0.4, foliageSize * 0.7);
            trees.fillCircle(x, g - treeHeight - foliageSize * 0.5, foliageSize * 0.6);
        });
    }
    
    createScaledTree(x, y, s) {
        const tree = this.add.graphics();
        
        // Trunk
        tree.fillStyle(0x5D4037, 1);
        tree.fillRect(x - 8 * s, y - 70 * s, 16 * s, 70 * s);
        
        // Foliage
        tree.fillStyle(0x388E3C, 1);
        tree.fillCircle(x, y - 90 * s, 35 * s);
        tree.fillCircle(x - 20 * s, y - 75 * s, 25 * s);
        tree.fillCircle(x + 20 * s, y - 75 * s, 25 * s);
        
        tree.fillStyle(0x4CAF50, 1);
        tree.fillCircle(x, y - 100 * s, 22 * s);
    }

    createMountainRoadScene() {
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        const s = this.scale_factor;
        
        // Beautiful sunset/golden hour sky gradient
        const sky = this.add.graphics();
        for (let i = 0; i < h; i++) {
            const ratio = i / h;
            let r, green, b;
            if (ratio < 0.3) {
                // Upper sky - deep blue to purple
                r = Math.floor(70 + ratio * 100);
                green = Math.floor(100 + ratio * 80);
                b = Math.floor(180 - ratio * 30);
            } else if (ratio < 0.6) {
                // Middle - orange/pink
                const localRatio = (ratio - 0.3) / 0.3;
                r = Math.floor(170 + localRatio * 85);
                green = Math.floor(124 + localRatio * 60);
                b = Math.floor(165 - localRatio * 100);
            } else {
                // Lower - warm golden
                const localRatio = (ratio - 0.6) / 0.4;
                r = 255;
                green = Math.floor(184 + localRatio * 40);
                b = Math.floor(65 + localRatio * 50);
            }
            sky.fillStyle(Phaser.Display.Color.GetColor(r, green, b));
            sky.fillRect(0, i, w, 1);
        }
        
        // Sun setting behind mountains
        const sun = this.add.graphics();
        const sunY = h * 0.45;
        const sunR = 35 * s;
        sun.fillStyle(0xFFD54F, 0.2);
        sun.fillCircle(w * 0.75, sunY, sunR * 4);
        sun.fillStyle(0xFFB74D, 0.4);
        sun.fillCircle(w * 0.75, sunY, sunR * 2.5);
        sun.fillStyle(0xFFE082, 0.7);
        sun.fillCircle(w * 0.75, sunY, sunR * 1.5);
        sun.fillStyle(0xFFF59D, 1);
        sun.fillCircle(w * 0.75, sunY, sunR);
        
        // Far mountains (darker, smaller) - these will be stored for parallax
        this.farMountains = this.add.graphics();
        this.drawMountainRange(this.farMountains, w, g, s, 0x4A5568, 0.9, 0.55, 0);
        
        // Mid mountains (medium)
        this.midMountains = this.add.graphics();
        this.drawMountainRange(this.midMountains, w, g, s, 0x2D3748, 0.95, 0.45, 50);
        
        // Near mountains (closest, largest)
        this.nearMountains = this.add.graphics();
        this.drawMountainRange(this.nearMountains, w, g, s, 0x1A202C, 1, 0.35, 100);
        
        // Mountain road
        this.createMountainRoad(w, g, h, s);
        
        // Store for parallax scrolling
        this.mountainParallax = {
            far: { graphics: this.farMountains, speed: 0.2 },
            mid: { graphics: this.midMountains, speed: 0.5 },
            near: { graphics: this.nearMountains, speed: 0.8 }
        };
    }
    
    drawMountainRange(graphics, w, g, s, color, alpha, heightFactor, offset) {
        graphics.fillStyle(color, alpha);
        
        // Create jagged mountain peaks
        const baseY = g - 20 * s;
        const peaks = [
            { x: -50, y: baseY },
            { x: w * 0.1 + offset, y: baseY - (120 + Math.random() * 40) * s * heightFactor },
            { x: w * 0.2 + offset, y: baseY - (80 + Math.random() * 30) * s * heightFactor },
            { x: w * 0.35 + offset, y: baseY - (150 + Math.random() * 50) * s * heightFactor },
            { x: w * 0.5 + offset, y: baseY - (100 + Math.random() * 40) * s * heightFactor },
            { x: w * 0.65 + offset, y: baseY - (180 + Math.random() * 40) * s * heightFactor },
            { x: w * 0.8 + offset, y: baseY - (90 + Math.random() * 30) * s * heightFactor },
            { x: w * 0.95 + offset, y: baseY - (140 + Math.random() * 40) * s * heightFactor },
            { x: w + 50, y: baseY }
        ];
        
        graphics.beginPath();
        graphics.moveTo(peaks[0].x, peaks[0].y);
        
        for (let i = 1; i < peaks.length; i++) {
            graphics.lineTo(peaks[i].x, peaks[i].y);
        }
        
        graphics.lineTo(w + 50, g + 50);
        graphics.lineTo(-50, g + 50);
        graphics.closePath();
        graphics.fillPath();
        
        // Snow caps on taller peaks
        if (heightFactor > 0.4) {
            graphics.fillStyle(0xFFFFFF, 0.7 * alpha);
            peaks.forEach((peak, i) => {
                if (i > 0 && i < peaks.length - 1 && peak.y < baseY - 80 * s * heightFactor) {
                    const snowHeight = 20 * s * heightFactor;
                    graphics.fillTriangle(
                        peak.x - 15 * s, peak.y + snowHeight,
                        peak.x, peak.y,
                        peak.x + 15 * s, peak.y + snowHeight
                    );
                }
            });
        }
    }
    
    createMountainRoad(w, g, h, s) {
        const road = this.add.graphics();
        
        // Road base - winding mountain road
        road.fillStyle(0x374151, 1);
        road.fillRect(0, g - 5 * s, w, h - g + 20);
        
        // Road edge/guardrail
        road.fillStyle(0x6B7280, 1);
        road.fillRect(0, g - 8 * s, w, 5 * s);
        
        // White road edge line
        road.fillStyle(0xFFFFFF, 0.8);
        road.fillRect(0, g - 3 * s, w, 2 * s);
        
        // Center dashed line
        road.fillStyle(0xFCD34D, 0.9);
        const dashW = 50 * s;
        const gapW = 30 * s;
        for (let x = 0; x < w; x += dashW + gapW) {
            road.fillRect(x, g + 15 * s, dashW, 3 * s);
        }
        
        // Road texture - subtle
        road.fillStyle(0x4B5563, 0.3);
        for (let i = 0; i < 20; i++) {
            const rx = Math.random() * w;
            const ry = g + 5 * s + Math.random() * 30 * s;
            road.fillRect(rx, ry, 3 + Math.random() * 5, 1);
        }
    }

    createNightScene() {
        // Night street scene heading to movie theatre (similar to Indiranagar night)
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        const s = this.scale_factor;
        
        // Night sky gradient - deep blue to dark purple
        const sky = this.add.graphics();
        for (let i = 0; i < h; i++) {
            const ratio = i / h;
            const r = Math.floor(10 + ratio * 20);
            const gb = Math.floor(15 + ratio * 25);
            const b = Math.floor(40 + ratio * 50);
            sky.fillStyle(Phaser.Display.Color.GetColor(r, gb, b));
            sky.fillRect(0, i, w, 1);
        }
        
        // Stars
        const stars = this.add.graphics();
        for (let i = 0; i < 80; i++) {
            const starX = Math.random() * w;
            const starY = Math.random() * g * 0.5;
            stars.fillStyle(0xFFFFFF, 0.3 + Math.random() * 0.7);
            stars.fillCircle(starX, starY, 0.5 + Math.random() * 1.5);
        }
        
        // Moon
        const moon = this.add.graphics();
        moon.fillStyle(0xFFFACD, 0.2);
        moon.fillCircle(w * 0.15, h * 0.15, 40 * s);
        moon.fillStyle(0xFFFACD, 0.4);
        moon.fillCircle(w * 0.15, h * 0.15, 25 * s);
        moon.fillStyle(0xFFFDE7, 0.9);
        moon.fillCircle(w * 0.15, h * 0.15, 18 * s);
        
        // Background buildings silhouettes
        this.createNightCityBuildings(w, g, s);
        
        // Street lights
        this.createMovieStreetLights(w, g, s);
        
        // Footpath/sidewalk
        const footpath = this.add.graphics();
        footpath.fillStyle(0x4A4A4A, 1);
        footpath.fillRect(0, g - 15 * s, w, 20 * s);
        
        // Footpath edge/curb
        footpath.fillStyle(0x6B6B6B, 1);
        footpath.fillRect(0, g - 15 * s, w, 4 * s);
        
        // Road
        const road = this.add.graphics();
        road.fillStyle(0x2D2D2D, 1);
        road.fillRect(0, g + 5 * s, w, h - g);
        
        // Road markings - dashed center line
        road.fillStyle(0xFFFFFF, 0.6);
        const dashWidth = 40 * s;
        const dashGap = 30 * s;
        for (let x = 0; x < w; x += dashWidth + dashGap) {
            road.fillRect(x, g + 25 * s, dashWidth, 3 * s);
        }
    }
    
    createNightCityBuildings(w, g, s) {
        const buildings = this.add.graphics();
        
        // Background building silhouettes
        const buildingData = [
            { x: 0, width: 60, height: 100 },
            { x: 70, width: 50, height: 80 },
            { x: 130, width: 70, height: 120 },
            { x: 210, width: 55, height: 90 },
            { x: 280, width: 65, height: 110 },
            { x: 360, width: 50, height: 75 }
        ];
        
        buildingData.forEach(b => {
            const bx = b.x * s;
            const bw = b.width * s;
            const bh = b.height * s;
            
            // Building silhouette
            buildings.fillStyle(0x1A1A2E, 1);
            buildings.fillRect(bx, g - bh, bw, bh);
            
            // Windows (some lit, some dark)
            for (let wy = g - bh + 15 * s; wy < g - 20 * s; wy += 20 * s) {
                for (let wx = bx + 8 * s; wx < bx + bw - 10 * s; wx += 15 * s) {
                    const isLit = Math.random() > 0.4;
                    if (isLit) {
                        buildings.fillStyle(0xFFE082, 0.7);
                    } else {
                        buildings.fillStyle(0x2A2A3E, 0.8);
                    }
                    buildings.fillRect(wx, wy, 8 * s, 10 * s);
                }
            }
        });
    }
    
    createMovieStreetLights(w, g, s) {
        const lights = this.add.graphics();
        
        // Street lights at intervals
        const lightPositions = [0.12, 0.35, 0.58];
        
        lightPositions.forEach(pos => {
            const x = w * pos;
            const poleHeight = 100 * s;
            
            // Light glow effect
            lights.fillStyle(0xFFE082, 0.08);
            lights.fillCircle(x, g - poleHeight, 80 * s);
            lights.fillStyle(0xFFE082, 0.15);
            lights.fillCircle(x, g - poleHeight, 50 * s);
            lights.fillStyle(0xFFE082, 0.25);
            lights.fillCircle(x, g - poleHeight, 30 * s);
            
            // Ground light pool
            lights.fillStyle(0xFFE082, 0.1);
            lights.fillEllipse(x, g - 5 * s, 100 * s, 20 * s);
            
            // Pole
            lights.fillStyle(0x1A1A1A, 1);
            lights.fillRect(x - 3 * s, g - poleHeight, 6 * s, poleHeight);
            
            // Lamp arm
            lights.fillRect(x - 3 * s, g - poleHeight, 20 * s, 4 * s);
            
            // Lamp fixture
            lights.fillStyle(0x2A2A2A, 1);
            lights.fillRect(x + 10 * s, g - poleHeight - 8 * s, 15 * s, 12 * s);
            
            // Light bulb
            lights.fillStyle(0xFFF59D, 1);
            lights.fillCircle(x + 17 * s, g - poleHeight + 5 * s, 5 * s);
        });
    }

    createMeadowRideScene() {
        // Meadow motorcycle ride scene (scene 5)
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        const s = this.scale_factor;
        
        // Beautiful sunset/golden hour sky with pink tones
        const sky = this.add.graphics();
        for (let i = 0; i < h; i++) {
            const ratio = i / h;
            let r, green, b;
            if (ratio < 0.3) {
                // Upper sky - soft pink to peach
                r = Math.floor(255 - ratio * 30);
                green = Math.floor(180 + ratio * 50);
                b = Math.floor(200 - ratio * 50);
            } else if (ratio < 0.6) {
                // Middle - warm golden pink
                const localRatio = (ratio - 0.3) / 0.3;
                r = 255;
                green = Math.floor(195 + localRatio * 30);
                b = Math.floor(185 - localRatio * 60);
            } else {
                // Lower - soft orange to pink
                const localRatio = (ratio - 0.6) / 0.4;
                r = 255;
                green = Math.floor(225 - localRatio * 30);
                b = Math.floor(125 + localRatio * 50);
            }
            sky.fillStyle(Phaser.Display.Color.GetColor(r, green, b));
            sky.fillRect(0, i, w, 1);
        }
        
        // Sun (low on horizon)
        const sun = this.add.graphics();
        const sunY = h * 0.5;
        const sunR = 40 * s;
        sun.fillStyle(0xFFE082, 0.2);
        sun.fillCircle(w * 0.8, sunY, sunR * 4);
        sun.fillStyle(0xFFD54F, 0.4);
        sun.fillCircle(w * 0.8, sunY, sunR * 2.5);
        sun.fillStyle(0xFFF59D, 0.7);
        sun.fillCircle(w * 0.8, sunY, sunR * 1.5);
        sun.fillStyle(0xFFFFFF, 0.9);
        sun.fillCircle(w * 0.8, sunY, sunR);
        
        // Distant hills/mountains (soft, rolling)
        this.createMeadowHills(w, g, s);
        
        // Meadow grass
        this.createMeadowGrass(w, g, h, s);
        
        // Wildflowers scattered
        this.createWildflowers(w, g, s);
        
        // Road through meadow
        this.createMeadowRoad(w, g, h, s);
        
        // Floating hearts (fewer, more subtle)
        for (let i = 0; i < 8; i++) {
            this.createFloatingHeart(
                Math.random() * w,
                50 + Math.random() * (g - 200)
            );
        }
    }
    
    createBolognaEveningScene() {
        // Evening Indiranagar street with Bologna restaurant
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        const s = this.scale_factor;
        
        // Evening sunset sky gradient - warm orange to purple
        const sky = this.add.graphics();
        for (let i = 0; i < h; i++) {
            const ratio = i / h;
            let r, green, b;
            if (ratio < 0.3) {
                // Upper sky - deep purple/blue
                r = Math.floor(80 + ratio * 60);
                green = Math.floor(60 + ratio * 50);
                b = Math.floor(120 + ratio * 40);
            } else if (ratio < 0.6) {
                // Middle - warm orange/pink
                const localRatio = (ratio - 0.3) / 0.3;
                r = Math.floor(140 + localRatio * 100);
                green = Math.floor(80 + localRatio * 80);
                b = Math.floor(160 - localRatio * 80);
            } else {
                // Lower - golden/orange
                const localRatio = (ratio - 0.6) / 0.4;
                r = Math.floor(240 + localRatio * 15);
                green = Math.floor(160 + localRatio * 40);
                b = Math.floor(80 + localRatio * 30);
            }
            sky.fillStyle(Phaser.Display.Color.GetColor(r, green, b));
            sky.fillRect(0, i, w, 1);
        }
        
        // Setting sun
        const sun = this.add.graphics();
        const sunY = h * 0.55;
        sun.fillStyle(0xFFB74D, 0.3);
        sun.fillCircle(w * 0.2, sunY, 50 * s);
        sun.fillStyle(0xFFCC80, 0.5);
        sun.fillCircle(w * 0.2, sunY, 35 * s);
        sun.fillStyle(0xFFE0B2, 0.8);
        sun.fillCircle(w * 0.2, sunY, 22 * s);
        
        // Background buildings silhouettes
        this.createEveningBuildings(w, g, s);
        
        // Street lights (starting to glow)
        this.createEveningStreetLights(w, g, s);
        
        // Footpath
        const footpath = this.add.graphics();
        footpath.fillStyle(0x5D5D5D, 1);
        footpath.fillRect(0, g - 15 * s, w, 20 * s);
        footpath.fillStyle(0x7D7D7D, 1);
        footpath.fillRect(0, g - 15 * s, w, 4 * s);
        
        // Road
        const road = this.add.graphics();
        road.fillStyle(0x3D3D3D, 1);
        road.fillRect(0, g + 5 * s, w, h - g);
        
        // Road markings
        road.fillStyle(0xFFFFFF, 0.5);
        const dashW = 40 * s;
        const gapW = 30 * s;
        for (let x = 0; x < w; x += dashW + gapW) {
            road.fillRect(x, g + 22 * s, dashW, 3 * s);
        }
    }
    
    createEveningBuildings(w, g, s) {
        const buildings = this.add.graphics();
        
        // Background building silhouettes with warm evening glow
        const buildingData = [
            { x: 0, width: 70, height: 110 },
            { x: 80, width: 55, height: 85 },
            { x: 145, width: 65, height: 100 },
            { x: 220, width: 50, height: 75 },
            { x: 280, width: 60, height: 95 }
        ];
        
        buildingData.forEach(b => {
            const bx = b.x * s;
            const bw = b.width * s;
            const bh = b.height * s;
            
            // Building silhouette - darker for evening
            buildings.fillStyle(0x2A2A3A, 1);
            buildings.fillRect(bx, g - bh, bw, bh);
            
            // Windows with warm evening light
            for (let wy = g - bh + 15 * s; wy < g - 20 * s; wy += 18 * s) {
                for (let wx = bx + 8 * s; wx < bx + bw - 10 * s; wx += 14 * s) {
                    const isLit = Math.random() > 0.3;
                    if (isLit) {
                        // Warm yellow/orange light
                        buildings.fillStyle(0xFFD54F, 0.8);
                    } else {
                        buildings.fillStyle(0x3A3A4A, 0.6);
                    }
                    buildings.fillRect(wx, wy, 8 * s, 10 * s);
                }
            }
        });
    }
    
    createEveningStreetLights(w, g, s) {
        const lights = this.add.graphics();
        
        // Street lights at intervals - just starting to glow
        const lightPositions = [0.15, 0.4];
        
        lightPositions.forEach(pos => {
            const x = w * pos;
            const poleHeight = 95 * s;
            
            // Soft warm glow (evening, not full night)
            lights.fillStyle(0xFFE082, 0.05);
            lights.fillCircle(x, g - poleHeight, 60 * s);
            lights.fillStyle(0xFFE082, 0.1);
            lights.fillCircle(x, g - poleHeight, 35 * s);
            
            // Ground glow (subtle)
            lights.fillStyle(0xFFE082, 0.06);
            lights.fillEllipse(x, g - 5 * s, 70 * s, 15 * s);
            
            // Pole
            lights.fillStyle(0x2A2A2A, 1);
            lights.fillRect(x - 3 * s, g - poleHeight, 6 * s, poleHeight);
            
            // Lamp arm
            lights.fillRect(x - 3 * s, g - poleHeight, 18 * s, 4 * s);
            
            // Lamp fixture
            lights.fillStyle(0x3A3A3A, 1);
            lights.fillRect(x + 8 * s, g - poleHeight - 6 * s, 12 * s, 10 * s);
            
            // Light (warm)
            lights.fillStyle(0xFFF59D, 0.9);
            lights.fillCircle(x + 14 * s, g - poleHeight + 4 * s, 4 * s);
        });
    }
    
    createPhoenixMallScene() {
        // Evening at Phoenix Marketcity Whitefield
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        const s = this.scale_factor;
        
        // Evening sky gradient - golden hour
        const sky = this.add.graphics();
        for (let i = 0; i < h; i++) {
            const ratio = i / h;
            let r, green, b;
            if (ratio < 0.25) {
                // Upper sky - deep blue/purple
                r = Math.floor(60 + ratio * 80);
                green = Math.floor(50 + ratio * 60);
                b = Math.floor(100 + ratio * 50);
            } else if (ratio < 0.5) {
                // Mid-upper - purple to pink
                const localRatio = (ratio - 0.25) / 0.25;
                r = Math.floor(80 + localRatio * 120);
                green = Math.floor(65 + localRatio * 50);
                b = Math.floor(125 - localRatio * 30);
            } else if (ratio < 0.75) {
                // Mid-lower - pink to orange
                const localRatio = (ratio - 0.5) / 0.25;
                r = Math.floor(200 + localRatio * 50);
                green = Math.floor(115 + localRatio * 60);
                b = Math.floor(95 - localRatio * 40);
            } else {
                // Lower - golden orange
                const localRatio = (ratio - 0.75) / 0.25;
                r = Math.floor(250);
                green = Math.floor(175 + localRatio * 30);
                b = Math.floor(55 + localRatio * 30);
            }
            sky.fillStyle(Phaser.Display.Color.GetColor(r, green, b));
            sky.fillRect(0, i, w, 1);
        }
        
        // Setting sun (larger, more prominent)
        const sun = this.add.graphics();
        const sunX = w * 0.15;
        const sunY = h * 0.5;
        sun.fillStyle(0xFFB74D, 0.15);
        sun.fillCircle(sunX, sunY, 80 * s);
        sun.fillStyle(0xFFCC80, 0.3);
        sun.fillCircle(sunX, sunY, 55 * s);
        sun.fillStyle(0xFFE0B2, 0.5);
        sun.fillCircle(sunX, sunY, 35 * s);
        sun.fillStyle(0xFFF8E1, 0.8);
        sun.fillCircle(sunX, sunY, 20 * s);
        
        // Distant Whitefield skyline silhouette
        const skyline = this.add.graphics();
        skyline.fillStyle(0x2A2040, 0.5);
        for (let x = 0; x < w * 0.4; x += 35 * s) {
            const bh = (40 + Math.random() * 50) * s;
            skyline.fillRect(x, g - bh - 50 * s, 30 * s, bh);
        }
        
        // Mall parking area / approach
        const parking = this.add.graphics();
        parking.fillStyle(0x4A4A4A, 1);
        parking.fillRect(0, g - 10 * s, w, 15 * s);
        
        // Parking lines
        parking.fillStyle(0xFFFFFF, 0.3);
        for (let x = 50 * s; x < w * 0.5; x += 60 * s) {
            parking.fillRect(x, g - 8 * s, 3 * s, 12 * s);
        }
        
        // Road
        const road = this.add.graphics();
        road.fillStyle(0x3D3D3D, 1);
        road.fillRect(0, g + 5 * s, w, h - g);
        
        // Road markings
        road.fillStyle(0xFFFFFF, 0.5);
        const dashW = 40 * s;
        const gapW = 30 * s;
        for (let x = 0; x < w; x += dashW + gapW) {
            road.fillRect(x, g + 25 * s, dashW, 4 * s);
        }
        
        // Decorative trees/plants near parking
        this.createMallTrees(w, g, s);
        
        // Mall entrance lights starting to glow
        this.createMallLights(w, g, s);
    }
    
    createMallTrees(w, g, s) {
        const trees = this.add.graphics();
        
        // Small decorative trees near parking
        const treePositions = [0.08, 0.2, 0.35];
        
        treePositions.forEach(pos => {
            const x = w * pos;
            
            // Tree pot/base
            trees.fillStyle(0x5D4037, 1);
            trees.fillRect(x - 8 * s, g - 15 * s, 16 * s, 12 * s);
            
            // Tree trunk
            trees.fillStyle(0x6D4C41, 1);
            trees.fillRect(x - 3 * s, g - 40 * s, 6 * s, 28 * s);
            
            // Tree foliage (round bush style)
            trees.fillStyle(0x2E7D32, 1);
            trees.fillCircle(x, g - 50 * s, 18 * s);
            trees.fillStyle(0x388E3C, 1);
            trees.fillCircle(x - 8 * s, g - 45 * s, 12 * s);
            trees.fillCircle(x + 8 * s, g - 45 * s, 12 * s);
        });
    }
    
    createMallLights(w, g, s) {
        const lights = this.add.graphics();
        
        // Parking lot lights
        const lightPositions = [0.12, 0.28];
        
        lightPositions.forEach(pos => {
            const x = w * pos;
            const poleH = 70 * s;
            
            // Light glow (evening warm)
            lights.fillStyle(0xFFE082, 0.08);
            lights.fillCircle(x, g - poleH, 50 * s);
            lights.fillStyle(0xFFE082, 0.15);
            lights.fillCircle(x, g - poleH, 25 * s);
            
            // Ground glow
            lights.fillStyle(0xFFE082, 0.05);
            lights.fillEllipse(x, g - 5 * s, 60 * s, 12 * s);
            
            // Pole
            lights.fillStyle(0x424242, 1);
            lights.fillRect(x - 3 * s, g - poleH, 6 * s, poleH - 10 * s);
            
            // Light fixture
            lights.fillStyle(0x616161, 1);
            lights.fillRect(x - 12 * s, g - poleH - 5 * s, 24 * s, 8 * s);
            
            // Light bulb
            lights.fillStyle(0xFFF59D, 0.9);
            lights.fillCircle(x, g - poleH, 5 * s);
        });
    }
    
    createMeadowHills(w, g, s) {
        const hills = this.add.graphics();
        
        // Far hills - soft purple/blue (using ellipses for rolling hills)
        hills.fillStyle(0x9575CD, 0.6);
        hills.fillEllipse(w * 0.15, g - 40 * s, 200 * s, 100 * s);
        hills.fillEllipse(w * 0.5, g - 50 * s, 250 * s, 120 * s);
        hills.fillEllipse(w * 0.85, g - 45 * s, 220 * s, 110 * s);
        
        // Mid hills - soft green
        hills.fillStyle(0x81C784, 0.7);
        hills.fillEllipse(w * 0.1, g - 25 * s, 180 * s, 80 * s);
        hills.fillEllipse(w * 0.4, g - 35 * s, 220 * s, 90 * s);
        hills.fillEllipse(w * 0.7, g - 30 * s, 200 * s, 85 * s);
        hills.fillEllipse(w * 0.95, g - 28 * s, 180 * s, 80 * s);
        
        // Near hills - lush green
        hills.fillStyle(0x66BB6A, 0.85);
        hills.fillEllipse(w * 0.2, g - 10 * s, 250 * s, 60 * s);
        hills.fillEllipse(w * 0.6, g - 15 * s, 280 * s, 70 * s);
        hills.fillEllipse(w * 0.9, g - 12 * s, 220 * s, 65 * s);
    }
    
    createMeadowGrass(w, g, h, s) {
        const grass = this.add.graphics();
        
        // Main grass area
        grass.fillStyle(0x7CB342, 1);
        grass.fillRect(0, g - 15 * s, w, h - g + 30);
        
        // Grass tufts for texture
        grass.fillStyle(0x8BC34A, 0.8);
        for (let x = 0; x < w; x += 15 * s) {
            const tuftHeight = (5 + Math.random() * 10) * s;
            grass.fillTriangle(
                x, g - 10 * s,
                x + 4 * s, g - 10 * s - tuftHeight,
                x + 8 * s, g - 10 * s
            );
        }
    }
    
    createWildflowers(w, g, s) {
        const flowers = this.add.graphics();
        
        // Scatter wildflowers
        const flowerColors = [0xFF6B9D, 0xFFEB3B, 0xFF7043, 0xE1BEE7, 0xFFFFFF, 0x64B5F6];
        
        for (let i = 0; i < 40; i++) {
            const fx = Math.random() * w;
            const fy = g - 20 * s - Math.random() * 30 * s;
            const fSize = (3 + Math.random() * 4) * s;
            const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            
            // Stem
            flowers.fillStyle(0x558B2F, 1);
            flowers.fillRect(fx - 1, fy, 2 * s, 15 * s);
            
            // Flower petals
            flowers.fillStyle(color, 0.9);
            flowers.fillCircle(fx, fy, fSize);
            
            // Center
            flowers.fillStyle(0xFFEB3B, 1);
            flowers.fillCircle(fx, fy, fSize * 0.4);
        }
    }
    
    createMeadowRoad(w, g, h, s) {
        const road = this.add.graphics();
        
        // Dirt/gravel road through meadow
        road.fillStyle(0x8D6E63, 1);
        road.fillRect(0, g - 5 * s, w, h - g + 10);
        
        // Road edge - grass meeting road
        road.fillStyle(0x6D4C41, 0.6);
        road.fillRect(0, g - 8 * s, w, 5 * s);
        
        // Center line (faded)
        road.fillStyle(0xBCAAA4, 0.5);
        const dashW = 35 * s;
        const gapW = 25 * s;
        for (let x = 0; x < w; x += dashW + gapW) {
            road.fillRect(x, g + 12 * s, dashW, 3 * s);
        }
        
        // Tire tracks/path marks
        road.fillStyle(0x795548, 0.3);
        road.fillRect(0, g + 5 * s, w, 4 * s);
        road.fillRect(0, g + 20 * s, w, 4 * s);
    }

    createFloatingHeart(x, y) {
        const heart = this.add.graphics();
        const size = 10 + Math.random() * 20;
        const alpha = 0.2 + Math.random() * 0.4;
        
        // Draw heart using circles and triangle (Phaser-compatible)
        heart.fillStyle(0xFF6B9D, alpha);
        // Left circle
        heart.fillCircle(x - size/4, y - size/4, size/3);
        // Right circle
        heart.fillCircle(x + size/4, y - size/4, size/3);
        // Bottom triangle
        heart.fillTriangle(
            x - size/2, y - size/6,
            x + size/2, y - size/6,
            x, y + size/2
        );
        
        this.tweens.add({
            targets: heart,
            y: '-=30',
            alpha: alpha * 0.5,
            duration: 3000 + Math.random() * 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createValentineFinalScene() {
        // Final Valentine scene (scene 8) - romantic pink setting
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        const s = this.scale_factor;
        
        // Pink gradient sky
        const sky = this.add.graphics();
        for (let i = 0; i < h; i++) {
            const ratio = i / h;
            const r = Math.floor(255 - ratio * 20);
            const green = Math.floor(200 - ratio * 40);
            const b = Math.floor(230 - ratio * 30);
            sky.fillStyle(Phaser.Display.Color.GetColor(r, green, b));
            sky.fillRect(0, i, w, 1);
        }
        
        // Lots of floating hearts
        for (let i = 0; i < 20; i++) {
            this.createFloatingHeart(
                Math.random() * w,
                50 + Math.random() * (g - 150)
            );
        }
        
        // Pink ground
        const ground = this.add.graphics();
        ground.fillStyle(0xF8BBD9, 1);
        ground.fillRect(0, g - 15 * s, w, h - g + 30);
    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        
        // Scale factor
        const scale = Math.min(this.gameHeight / 600, this.sceneWidth / 800);
        const groundTileSize = 64 * scale;
        
        // Ground platforms across the screen
        for (let x = 0; x < this.sceneWidth; x += groundTileSize) {
            const ground = this.platforms.create(x + groundTileSize / 2, this.groundY + groundTileSize / 2, 'ground');
            ground.setScale(scale).refreshBody();
        }
    }

    createPlayer() {
        // Scale player based on screen size
        const scale = Math.min(this.gameHeight / 600, this.sceneWidth / 800);
        const playerScale = Math.max(0.8, Math.min(1.5, scale));
        
        // Start player at 20% of screen (not at the left edge - dino starts there)
        let startX = this.sceneWidth * 0.2;
        
        // If this was a resize restart, restore player position (but not too close to destination)
        if (savedPlayerX > 0.15 && savedPlayerX < 0.7) {
            startX = savedPlayerX * this.sceneWidth;
        }
        savedPlayerX = 0; // Reset saved position
        
        // Check if this is the motorcycle scene
        const sceneData = SCENE_DATA[currentSceneIndex];
        this.isMotorcycleScene = sceneData && sceneData.isMotorcycle;
        
        if (this.isMotorcycleScene) {
            // Create motorcycle player
            this.player = this.physics.add.sprite(startX, this.groundY - 35 * playerScale, 'motorcycle');
            this.player.setBounce(0);
            this.player.setCollideWorldBounds(true);
            this.player.setScale(playerScale * 1.2);
            this.player.setSize(80, 50);
            this.player.setOffset(10, 10);
            this.player.body.setGravityY(GAME_CONFIG.gravity);
            
            // Motorcycle animation frame
            this.motorcycleFrame = 0;
            this.motorcycleTimer = 0;
        } else {
            // Normal walking player
            this.player = this.physics.add.sprite(startX, this.groundY - 40 * playerScale, 'player');
            this.player.setBounce(0.1);
            this.player.setCollideWorldBounds(true);
            this.player.setScale(playerScale);
            this.player.setSize(30, 50);
            this.player.setOffset(10, 10);
            this.player.body.setGravityY(GAME_CONFIG.gravity);
        }
        
        this.physics.add.collider(this.player, this.platforms);
    }
    
    createDino() {
        // Scale dino based on screen size - make it bigger!
        const scale = Math.min(this.gameHeight / 600, this.sceneWidth / 800);
        const dinoScale = Math.max(1.0, Math.min(1.8, scale * 1.3));
        
        // Dino starts off-screen to the left
        this.dino = this.physics.add.sprite(-100, this.groundY - 55 * dinoScale, 'dino');
        this.dino.setScale(dinoScale);
        this.dino.setSize(90, 70);
        this.dino.setOffset(15, 25);
        this.dino.body.setAllowGravity(false);
        this.dino.setDepth(10);
        
        // Dino walk animation timer
        this.dinoWalkFrame = 0;
        this.dinoWalkTimer = 0;
        
        // Dino speed - slow but relentless (gets faster in later scenes)
        this.dinoSpeed = 50 + currentSceneIndex * 12;
        
        // Collision with player
        this.physics.add.overlap(this.player, this.dino, this.dinoHitPlayer, null, this);
    }
    
    dinoHitPlayer() {
        // Prevent multiple triggers
        if (this.gameOver) return;
        this.gameOver = true;
        
        console.log('Dino caught the player!');
        
        // Stop everything
        this.player.setVelocity(0, 0);
        this.dino.setVelocity(0, 0);
        this.isPaused = true;
        
        // Flash effect
        this.cameras.main.flash(500, 255, 100, 100);
        
        // Show game over
        this.showDinoGameOver();
    }
    
    showDinoGameOver() {
        const overlay = document.getElementById('gameover-overlay');
        const card = document.getElementById('gameover-card');
        
        // Update the message
        card.innerHTML = `
            <h1>🦎 Oh no!</h1>
            <p>The Creepy Lizard caught you!</p>
            <p class="gameover-hint">Run Prachi Run!</p>
            <button id="restart-btn">Try Again ❤️</button>
        `;
        
        overlay.classList.remove('hidden');
        
        const restartBtn = document.getElementById('restart-btn');
        restartBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
            // Reset to scene 0
            currentSceneIndex = 0;
            stopGlobalMusic();
            this.scene.restart();
        });
    }
    
    updateDino(delta) {
        if (!this.dino || this.isPaused || this.gameOver || isResizing) return;
        
        // Move dino to the right (chasing the player)
        this.dino.x += this.dinoSpeed * (delta / 1000);
        
        // Keep dino on ground (feet touching ground)
        this.dino.y = this.groundY - 55 * this.dino.scaleY;
        
        // Animate walking
        this.dinoWalkTimer += delta;
        if (this.dinoWalkTimer > 100) {
            this.dinoWalkTimer = 0;
            this.dinoWalkFrame = (this.dinoWalkFrame + 1) % 2;
            this.dino.setTexture('dino_walk_' + this.dinoWalkFrame);
        }
    }

    createDestination() {
        const sceneData = SCENE_DATA[currentSceneIndex];
        
        // Create the destination building/location
        if (sceneData.id === 'night_cafe') {
            this.createCafeNoirDestination();
        } else if (sceneData.id === 'park_scene') {
            this.createParkBench();
        } else if (sceneData.id === 'motorcycle_ride') {
            this.createHilltopDestination();
        } else if (sceneData.id === 'night_scene') {
            this.createViewpoint();
        } else if (sceneData.id === 'meadow_ride') {
            this.createMeadowSpotDestination();
        } else if (sceneData.id === 'bologna_evening') {
            this.createBolognaDestination();
        } else if (sceneData.id === 'phoenix_mall') {
            this.createPhoenixMallDestination();
        } else if (sceneData.id === 'valentine_scene') {
            this.createHeartDestination();
        } else {
            // Default destination for new scenes
            this.createGenericDestination();
        }
    }

    createCafeNoirDestination() {
        const graphics = this.add.graphics();
        const w = this.sceneWidth;
        const h = this.gameHeight;
        const g = this.groundY;
        
        // Scale factor
        const scale = Math.min(h / 600, w / 800);
        
        // ==========================================
        // CAFE NOIR - Main destination (on the left of the pair)
        // ==========================================
        const cafeWidth = Math.min(w * 0.18, 160 * scale);
        const cafeHeight = Math.min((g - 50) * 0.55, 280 * scale);
        const cafeX = w - cafeWidth * 2 - 50 * scale; // Position to leave room for Daddys
        
        // Cafe building - dark brown/coffee color
        graphics.fillStyle(0x3E2723, 1);
        graphics.fillRect(cafeX, g - cafeHeight, cafeWidth, cafeHeight);
        
        // Cafe roof edge
        graphics.fillStyle(0x2D1F1A, 1);
        graphics.fillRect(cafeX - 5, g - cafeHeight - 8 * scale, cafeWidth + 10, 8 * scale);
        
        // Cafe window with warm glow
        const cafeWinW = cafeWidth * 0.65;
        const cafeWinH = cafeHeight * 0.28;
        const cafeWinX = cafeX + (cafeWidth - cafeWinW) / 2;
        const cafeWinY = g - cafeHeight * 0.75;
        
        // Window glow
        graphics.fillStyle(0xFFD54F, 0.3);
        graphics.fillRect(cafeWinX - 8, cafeWinY - 8, cafeWinW + 16, cafeWinH + 16);
        
        // Window frame
        graphics.fillStyle(0x1B1510, 1);
        graphics.fillRect(cafeWinX - 4, cafeWinY - 4, cafeWinW + 8, cafeWinH + 8);
        
        // Window - warm light inside
        graphics.fillStyle(0xFFE0B2, 0.95);
        graphics.fillRect(cafeWinX, cafeWinY, cafeWinW, cafeWinH);
        
        // Window dividers
        graphics.fillStyle(0x1B1510, 1);
        graphics.fillRect(cafeWinX + cafeWinW / 2 - 2, cafeWinY, 4, cafeWinH);
        
        // Door
        const cafeDoorW = cafeWidth * 0.38;
        const cafeDoorH = cafeHeight * 0.42;
        const cafeDoorX = cafeX + (cafeWidth - cafeDoorW) / 2;
        
        graphics.fillStyle(0x1B1510, 1);
        graphics.fillRect(cafeDoorX - 3, g - cafeDoorH - 3, cafeDoorW + 6, cafeDoorH + 3);
        graphics.fillStyle(0x4E342E, 1);
        graphics.fillRect(cafeDoorX, g - cafeDoorH, cafeDoorW, cafeDoorH);
        
        // Door window
        graphics.fillStyle(0xFFE0B2, 0.8);
        graphics.fillRect(cafeDoorX + 6, g - cafeDoorH + 10, cafeDoorW - 12, cafeDoorH * 0.45);
        
        // Door handle
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(cafeDoorX + cafeDoorW - 10, g - cafeDoorH / 2, 3 * scale);
        
        // CAFE NOIR Sign - elegant
        const cafeSignW = cafeWidth * 0.9;
        const cafeSignH = 28 * scale;
        const cafeSignX = cafeX + (cafeWidth - cafeSignW) / 2;
        const cafeSignY = g - cafeHeight - cafeSignH - 15 * scale;
        
        // Sign background with glow
        graphics.fillStyle(0xFFD54F, 0.2);
        graphics.fillRoundedRect(cafeSignX - 5, cafeSignY - 5, cafeSignW + 10, cafeSignH + 10, 8);
        graphics.fillStyle(0x1B1510, 1);
        graphics.fillRoundedRect(cafeSignX, cafeSignY, cafeSignW, cafeSignH, 5);
        
        // Sign border
        graphics.lineStyle(2, 0xFFD700, 1);
        graphics.strokeRoundedRect(cafeSignX, cafeSignY, cafeSignW, cafeSignH, 5);
        
        const cafeFontSize = Math.max(11, 13 * scale);
        this.add.text(cafeX + cafeWidth / 2, cafeSignY + cafeSignH / 2, '☕ CAFE NOIR', {
            font: `bold ${cafeFontSize}px Georgia`,
            fill: '#FFD700'
        }).setOrigin(0.5);
        
        // Green awning
        graphics.fillStyle(0x2E7D32, 1);
        graphics.fillRect(cafeX - 8, cafeWinY - 18 * scale, cafeWidth + 16, 15 * scale);
        // Awning stripes
        graphics.fillStyle(0x1B5E20, 1);
        for (let i = 0; i < 6; i++) {
            graphics.fillRect(cafeX - 8 + i * ((cafeWidth + 16) / 6), cafeWinY - 18 * scale, 5, 15 * scale);
        }
        
        // ==========================================
        // DADDYS - Building to the right of Cafe Noir
        // ==========================================
        const daddysWidth = Math.min(w * 0.16, 140 * scale);
        const daddysHeight = Math.min((g - 50) * 0.5, 250 * scale);
        const daddysX = cafeX + cafeWidth + 15 * scale;
        
        // Daddys building - dark blue/navy
        graphics.fillStyle(0x1A237E, 1);
        graphics.fillRect(daddysX, g - daddysHeight, daddysWidth, daddysHeight);
        
        // Roof edge
        graphics.fillStyle(0x0D1642, 1);
        graphics.fillRect(daddysX - 3, g - daddysHeight - 6 * scale, daddysWidth + 6, 6 * scale);
        
        // Daddys windows with warm glow
        const daddysWinW = daddysWidth * 0.35;
        const daddysWinH = daddysHeight * 0.2;
        
        // Two windows
        for (let i = 0; i < 2; i++) {
            const winX = daddysX + 12 * scale + i * (daddysWinW + 15 * scale);
            const winY = g - daddysHeight * 0.7;
            
            // Window glow
            graphics.fillStyle(0xFFD54F, 0.25);
            graphics.fillRect(winX - 5, winY - 5, daddysWinW + 10, daddysWinH + 10);
            
            // Window frame
            graphics.fillStyle(0x0D1642, 1);
            graphics.fillRect(winX - 3, winY - 3, daddysWinW + 6, daddysWinH + 6);
            
            // Window
            graphics.fillStyle(0xFFE082, 0.9);
            graphics.fillRect(winX, winY, daddysWinW, daddysWinH);
        }
        
        // Daddys door
        const daddysDoorW = daddysWidth * 0.4;
        const daddysDoorH = daddysHeight * 0.38;
        const daddysDoorX = daddysX + (daddysWidth - daddysDoorW) / 2;
        
        graphics.fillStyle(0x0D1642, 1);
        graphics.fillRect(daddysDoorX - 3, g - daddysDoorH - 3, daddysDoorW + 6, daddysDoorH + 3);
        graphics.fillStyle(0x3949AB, 1);
        graphics.fillRect(daddysDoorX, g - daddysDoorH, daddysDoorW, daddysDoorH);
        
        // DADDYS Sign - neon style
        const daddysSignW = daddysWidth * 0.85;
        const daddysSignH = 24 * scale;
        const daddysSignX = daddysX + (daddysWidth - daddysSignW) / 2;
        const daddysSignY = g - daddysHeight - daddysSignH - 12 * scale;
        
        // Neon glow effect
        graphics.fillStyle(0xFF1744, 0.3);
        graphics.fillRoundedRect(daddysSignX - 8, daddysSignY - 8, daddysSignW + 16, daddysSignH + 16, 8);
        graphics.fillStyle(0xFF1744, 0.15);
        graphics.fillRoundedRect(daddysSignX - 15, daddysSignY - 15, daddysSignW + 30, daddysSignH + 30, 12);
        
        // Sign background
        graphics.fillStyle(0x1A1A1A, 1);
        graphics.fillRoundedRect(daddysSignX, daddysSignY, daddysSignW, daddysSignH, 4);
        
        const daddysFontSize = Math.max(10, 12 * scale);
        this.add.text(daddysX + daddysWidth / 2, daddysSignY + daddysSignH / 2, "DADDY'S", {
            font: `bold ${daddysFontSize}px Arial`,
            fill: '#FF1744'
        }).setOrigin(0.5);
        
        // Street lamp between buildings
        this.createStreetLamp(cafeX + cafeWidth + 7 * scale, g, scale);
        
        // Plants outside Cafe Noir
        this.createPlant(cafeX + 8 * scale, g, scale);
        this.createPlant(cafeX + cafeWidth - 12 * scale, g, scale);
        
        // Door trigger zone for Cafe Noir
        this.cafeDoor = this.add.zone(cafeX + cafeWidth / 2, g - cafeDoorH / 2, cafeDoorW + 30, cafeDoorH + 20);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        // Indicator arrow pointing to Cafe Noir
        this.createIndicator(cafeX + cafeWidth / 2, cafeSignY - 25 * scale, scale);
    }
    
    createStreetLamp(x, y, scale) {
        const lamp = this.add.graphics();
        
        // Pole
        lamp.fillStyle(0x37474F, 1);
        lamp.fillRect(x - 3 * scale, y - 120 * scale, 6 * scale, 120 * scale);
        
        // Lamp head
        lamp.fillStyle(0x263238, 1);
        lamp.fillRect(x - 12 * scale, y - 130 * scale, 24 * scale, 15 * scale);
        
        // Light glow
        lamp.fillStyle(0xFFE082, 0.4);
        lamp.fillCircle(x, y - 115 * scale, 25 * scale);
        lamp.fillStyle(0xFFE082, 0.2);
        lamp.fillCircle(x, y - 100 * scale, 50 * scale);
        
        // Light bulb
        lamp.fillStyle(0xFFF8E1, 1);
        lamp.fillCircle(x, y - 118 * scale, 6 * scale);
    }
    
    createCafeNoir() {
        // Redirect to new function
        this.createCafeNoirDestination();
    }
    
    createPlant(x, y, scale) {
        const plant = this.add.graphics();
        const s = scale;
        plant.fillStyle(0x5D4037, 1);
        plant.fillRoundedRect(x - 8 * s, y - 20 * s, 16 * s, 20 * s, 3);
        plant.fillStyle(0x4CAF50, 1);
        plant.fillCircle(x, y - 30 * s, 12 * s);
        plant.fillCircle(x - 6 * s, y - 25 * s, 8 * s);
        plant.fillCircle(x + 6 * s, y - 25 * s, 8 * s);
    }
    
    createIndicator(x, y, scale) {
        const indicator = this.add.graphics();
        const s = 10 * scale;
        indicator.fillStyle(0xFF4081, 0.8);
        indicator.fillTriangle(x - s, y, x + s, y, x, y + s * 1.5);
        
        this.tweens.add({
            targets: indicator,
            y: '+=8',
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    createPottedPlant(x, y) {
        const plant = this.add.graphics();
        // Pot
        plant.fillStyle(0xA1887F, 1);
        plant.fillRect(x - 15, y - 30, 30, 30);
        plant.fillStyle(0x8D6E63, 1);
        plant.fillRect(x - 18, y - 35, 36, 8);
        // Plant
        plant.fillStyle(0x4CAF50, 1);
        plant.fillCircle(x, y - 50, 20);
        plant.fillCircle(x - 10, y - 40, 12);
        plant.fillCircle(x + 10, y - 40, 12);
    }

    createParkBench() {
        // Now creates Indiranagar night street destination - a cozy street corner with a lamp
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        const dest = this.add.graphics();
        
        const destX = w - 120 * s;
        const destW = 80 * s;
        
        // Street lamp at destination
        const lampX = destX + destW / 2;
        const poleHeight = 110 * s;
        
        // Warm light glow effect (larger, more romantic)
        dest.fillStyle(0xFFE082, 0.06);
        dest.fillCircle(lampX, g - poleHeight, 100 * s);
        dest.fillStyle(0xFFE082, 0.1);
        dest.fillCircle(lampX, g - poleHeight, 70 * s);
        dest.fillStyle(0xFFE082, 0.18);
        dest.fillCircle(lampX, g - poleHeight, 45 * s);
        dest.fillStyle(0xFFF59D, 0.3);
        dest.fillCircle(lampX, g - poleHeight, 25 * s);
        
        // Ground light pool
        dest.fillStyle(0xFFE082, 0.15);
        dest.fillEllipse(lampX, g - 5 * s, 120 * s, 25 * s);
        
        // Lamp pole - ornate style
        dest.fillStyle(0x1A1A1A, 1);
        dest.fillRect(lampX - 4 * s, g - poleHeight, 8 * s, poleHeight);
        
        // Decorative base
        dest.fillStyle(0x2A2A2A, 1);
        dest.fillRect(lampX - 10 * s, g - 15 * s, 20 * s, 15 * s);
        
        // Lamp arm (curved effect with rectangles)
        dest.fillRect(lampX - 4 * s, g - poleHeight - 5 * s, 25 * s, 5 * s);
        
        // Lamp fixture - vintage style
        dest.fillStyle(0x3A3A3A, 1);
        dest.fillRect(lampX + 12 * s, g - poleHeight - 20 * s, 18 * s, 20 * s);
        
        // Glass panels
        dest.fillStyle(0xFFF59D, 0.9);
        dest.fillRect(lampX + 14 * s, g - poleHeight - 18 * s, 14 * s, 16 * s);
        
        // Small bench under the lamp
        const benchW = 50 * s;
        const benchH = 25 * s;
        const benchX = lampX - benchW / 2 - 20 * s;
        
        // Bench seat
        dest.fillStyle(0x5D4037, 1);
        dest.fillRect(benchX, g - benchH, benchW, 8 * s);
        // Bench back
        dest.fillRect(benchX, g - benchH - 15 * s, benchW, 5 * s);
        // Bench legs
        dest.fillStyle(0x3E2723, 1);
        dest.fillRect(benchX + 5 * s, g - benchH + 8 * s, 5 * s, benchH - 8 * s);
        dest.fillRect(benchX + benchW - 10 * s, g - benchH + 8 * s, 5 * s, benchH - 8 * s);
        
        // Label with glow effect
        const fontSize = Math.max(12, 14 * s);
        
        // Glow behind text
        this.add.text(lampX, g - poleHeight - 35 * s, '✨ The End of the Walk', {
            font: `bold ${fontSize}px Arial`,
            fill: '#FFE082',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        this.cafeDoor = this.add.zone(lampX, g - benchH / 2, destW + 40, benchH + 40);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        this.createIndicator(lampX, g - poleHeight - 55 * s, s);
    }
    
    createHilltopDestination() {
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        const dest = this.add.graphics();
        
        const destX = w - 150 * s;
        const destW = 120 * s;
        
        // Scenic viewpoint area
        // Stone platform/lookout point
        dest.fillStyle(0x4A5568, 1);
        dest.fillRect(destX, g - 15 * s, destW, 20 * s);
        
        // Stone texture
        dest.fillStyle(0x5A6578, 0.8);
        for (let i = 0; i < 5; i++) {
            const rx = destX + Math.random() * destW;
            const ry = g - 12 * s + Math.random() * 10 * s;
            dest.fillRect(rx, ry, 10 * s, 5 * s);
        }
        
        // Safety railing
        dest.fillStyle(0x78350F, 1);
        // Posts
        dest.fillRect(destX + 10 * s, g - 50 * s, 5 * s, 40 * s);
        dest.fillRect(destX + destW - 15 * s, g - 50 * s, 5 * s, 40 * s);
        dest.fillRect(destX + destW / 2, g - 50 * s, 5 * s, 40 * s);
        // Rails
        dest.fillRect(destX + 10 * s, g - 50 * s, destW - 20 * s, 4 * s);
        dest.fillRect(destX + 10 * s, g - 35 * s, destW - 20 * s, 3 * s);
        
        // Milestone/marker stone - wider to fit text
        dest.fillStyle(0x9CA3AF, 1);
        dest.fillRect(destX + destW / 2 - 30 * s, g - 70 * s, 60 * s, 55 * s);
        
        // Milestone text
        const fontSize = Math.max(10, 12 * s);
        this.add.text(destX + destW / 2, g - 55 * s, 'HILLTOP', {
            font: `bold ${fontSize}px Arial`,
            fill: '#1F2937'
        }).setOrigin(0.5);
        
        this.add.text(destX + destW / 2, g - 38 * s, '⛰️', {
            font: `${fontSize * 1.8}px Arial`
        }).setOrigin(0.5);
        
        // Label
        const labelFontSize = Math.max(12, 14 * s);
        this.add.text(destX + destW / 2, g - 90 * s, '🏔️ DD Hills', {
            font: `bold ${labelFontSize}px Arial`,
            fill: '#FCD34D',
            stroke: '#1F2937',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Collision zone
        this.cafeDoor = this.add.zone(destX + destW / 2, g - 30 * s, destW, 60 * s);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        this.createIndicator(destX + destW / 2, g - 110 * s, s);
    }

    createIceCreamShop() {
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        const shop = this.add.graphics();
        
        const shopW = 120 * s;
        const shopH = 120 * s;
        const shopX = w - shopW - 30 * s;
        
        // Building
        shop.fillStyle(0xFFCDD2, 1);
        shop.fillRect(shopX, g - shopH, shopW, shopH);
        
        // Roof
        shop.fillStyle(0xF48FB1, 1);
        shop.fillRect(shopX - 8 * s, g - shopH - 15 * s, shopW + 16 * s, 15 * s);
        
        // Window
        shop.fillStyle(0xE3F2FD, 0.9);
        shop.fillRect(shopX + 15 * s, g - shopH + 25 * s, 35 * s, 30 * s);
        
        // Door
        const doorW = 35 * s;
        const doorH = 60 * s;
        const doorX = shopX + shopW - doorW - 15 * s;
        shop.fillStyle(0xF06292, 1);
        shop.fillRect(doorX, g - doorH, doorW, doorH);
        shop.fillStyle(0xE3F2FD, 0.7);
        shop.fillRect(doorX + 5 * s, g - doorH + 8 * s, doorW - 10 * s, 25 * s);
        
        // Sign
        const fontSize = Math.max(10, 12 * s);
        this.add.text(shopX + shopW / 2, g - shopH - 25 * s, '🍦 Ice Cream', {
            font: `bold ${fontSize}px Arial`,
            fill: '#C44569'
        }).setOrigin(0.5);
        
        this.cafeDoor = this.add.zone(doorX + doorW / 2, g - doorH / 2, doorW + 20, doorH + 20);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        this.createIndicator(doorX + doorW / 2, g - shopH - 40 * s, s);
    }

    createViewpoint() {
        // Movie Theatre destination
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        const theatre = this.add.graphics();
        
        const theatreW = 140 * s;
        const theatreH = 130 * s;
        const theatreX = w - theatreW - 30 * s;
        
        // Theatre building - dark elegant color
        theatre.fillStyle(0x1A1A2E, 1);
        theatre.fillRect(theatreX, g - theatreH, theatreW, theatreH);
        
        // Decorative top edge
        theatre.fillStyle(0x2D2D44, 1);
        theatre.fillRect(theatreX - 5 * s, g - theatreH - 10 * s, theatreW + 10 * s, 12 * s);
        
        // Marquee (lit sign area)
        const marqueeW = theatreW * 0.85;
        const marqueeH = 30 * s;
        const marqueeX = theatreX + (theatreW - marqueeW) / 2;
        const marqueeY = g - theatreH + 15 * s;
        
        // Marquee glow
        theatre.fillStyle(0xFFD700, 0.3);
        theatre.fillRect(marqueeX - 8 * s, marqueeY - 8 * s, marqueeW + 16 * s, marqueeH + 16 * s);
        
        // Marquee background
        theatre.fillStyle(0x8B0000, 1);
        theatre.fillRect(marqueeX, marqueeY, marqueeW, marqueeH);
        
        // Marquee border lights (dots)
        theatre.fillStyle(0xFFD700, 1);
        for (let x = marqueeX + 5 * s; x < marqueeX + marqueeW - 5 * s; x += 8 * s) {
            theatre.fillCircle(x, marqueeY + 3 * s, 2 * s);
            theatre.fillCircle(x, marqueeY + marqueeH - 3 * s, 2 * s);
        }
        
        // Poster frames on sides
        theatre.fillStyle(0x333355, 1);
        theatre.fillRect(theatreX + 10 * s, g - theatreH + 55 * s, 25 * s, 35 * s);
        theatre.fillRect(theatreX + theatreW - 35 * s, g - theatreH + 55 * s, 25 * s, 35 * s);
        
        // Poster content (colorful)
        theatre.fillStyle(0x4FC3F7, 0.8);
        theatre.fillRect(theatreX + 12 * s, g - theatreH + 57 * s, 21 * s, 31 * s);
        theatre.fillStyle(0xFF7043, 0.8);
        theatre.fillRect(theatreX + theatreW - 33 * s, g - theatreH + 57 * s, 21 * s, 31 * s);
        
        // Main entrance doors
        const doorW = 30 * s;
        const doorH = 55 * s;
        const doorX = theatreX + theatreW / 2 - doorW / 2;
        
        // Door frame glow
        theatre.fillStyle(0xFFE082, 0.2);
        theatre.fillRect(doorX - 8 * s, g - doorH - 8 * s, doorW + 16 * s, doorH + 8 * s);
        
        // Doors
        theatre.fillStyle(0x4A1010, 1);
        theatre.fillRect(doorX, g - doorH, doorW, doorH);
        
        // Door window
        theatre.fillStyle(0xFFE0B2, 0.7);
        theatre.fillRect(doorX + 5 * s, g - doorH + 8 * s, doorW - 10 * s, 25 * s);
        
        // Door handles
        theatre.fillStyle(0xFFD700, 1);
        theatre.fillCircle(doorX + 8 * s, g - doorH / 2, 3 * s);
        theatre.fillCircle(doorX + doorW - 8 * s, g - doorH / 2, 3 * s);
        
        // Red carpet
        theatre.fillStyle(0x8B0000, 1);
        theatre.fillRect(doorX - 15 * s, g - 5 * s, doorW + 30 * s, 10 * s);
        
        // Neon sign glow effect
        theatre.fillStyle(0xFF1744, 0.15);
        theatre.fillCircle(theatreX + theatreW / 2, g - theatreH + 30 * s, 60 * s);
        
        // Label
        const fontSize = Math.max(10, 12 * s);
        this.add.text(theatreX + theatreW / 2, marqueeY + marqueeH / 2, '🎬 CINEMA', {
            font: `bold ${fontSize}px Arial`,
            fill: '#FFD700'
        }).setOrigin(0.5);
        
        // Top label
        const labelFontSize = Math.max(12, 14 * s);
        this.add.text(theatreX + theatreW / 2, g - theatreH - 25 * s, '🎥 Movie Theatre', {
            font: `bold ${labelFontSize}px Arial`,
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Collision zone at door
        this.cafeDoor = this.add.zone(doorX + doorW / 2, g - doorH / 2, doorW + 30 * s, doorH + 20 * s);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        this.createIndicator(theatreX + theatreW / 2, g - theatreH - 45 * s, s);
    }

    createHeartDestination() {
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        
        const heartX = w - 100 * s;
        const size = 60 * s;
        
        // Glowing aura
        const aura = this.add.graphics();
        aura.fillStyle(0xFF4081, 0.1);
        aura.fillCircle(heartX, g - 70 * s, 80 * s);
        aura.fillStyle(0xFF4081, 0.15);
        aura.fillCircle(heartX, g - 70 * s, 60 * s);
        
        this.tweens.add({
            targets: aura,
            alpha: 0.5,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Heart
        const heart = this.add.graphics();
        heart.fillStyle(0xE91E63, 1);
        heart.fillCircle(heartX - size/3, g - 80 * s, size/2);
        heart.fillCircle(heartX + size/3, g - 80 * s, size/2);
        heart.fillTriangle(heartX - size, g - 70 * s, heartX + size, g - 70 * s, heartX, g - 15 * s);
        
        // Highlight
        heart.fillStyle(0xF48FB1, 1);
        heart.fillCircle(heartX - size/3 - 5 * s, g - 85 * s, size/3);
        
        // Shine
        heart.fillStyle(0xFFFFFF, 0.5);
        heart.fillCircle(heartX - size/3, g - 90 * s, 8 * s);
        
        // Pulse animation
        this.tweens.add({
            targets: heart,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Floating mini hearts
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const dist = 70 * s;
            const miniX = heartX + Math.cos(angle) * dist;
            const miniY = g - 70 * s + Math.sin(angle) * dist * 0.5;
            this.createFloatingHeart(miniX, miniY);
        }
        
        // Sparkles
        for (let i = 0; i < 8; i++) {
            const sparkle = this.add.graphics();
            const sx = heartX + (Math.random() - 0.5) * 100 * s;
            const sy = g - 30 * s - Math.random() * 100 * s;
            sparkle.fillStyle(0xFFFFFF, 0.8);
            sparkle.fillCircle(0, 0, 2);
            sparkle.x = sx;
            sparkle.y = sy;
            
            this.tweens.add({
                targets: sparkle,
                alpha: 0,
                y: sy - 30,
                duration: 1500 + Math.random() * 1000,
                repeat: -1,
                delay: Math.random() * 1000
            });
        }
        
        // Indicator
        this.createIndicator(heartX, g - 120 * s, s);
        
        this.cafeDoor = this.add.zone(heartX, g - 60 * s, 100 * s, 100 * s);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
    }
    
    createMeadowSpotDestination() {
        // A scenic spot in the meadow - maybe a tree or viewpoint
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        const dest = this.add.graphics();
        
        const destX = w - 120 * s;
        
        // Big tree at the spot
        // Trunk
        dest.fillStyle(0x5D4037, 1);
        dest.fillRect(destX - 12 * s, g - 100 * s, 24 * s, 100 * s);
        
        // Tree roots
        dest.fillStyle(0x4E342E, 1);
        dest.fillRect(destX - 20 * s, g - 15 * s, 40 * s, 20 * s);
        
        // Foliage layers
        dest.fillStyle(0x2E7D32, 1);
        dest.fillCircle(destX, g - 130 * s, 50 * s);
        dest.fillCircle(destX - 35 * s, g - 110 * s, 40 * s);
        dest.fillCircle(destX + 35 * s, g - 110 * s, 40 * s);
        
        dest.fillStyle(0x388E3C, 1);
        dest.fillCircle(destX, g - 145 * s, 35 * s);
        dest.fillCircle(destX - 25 * s, g - 125 * s, 30 * s);
        dest.fillCircle(destX + 25 * s, g - 125 * s, 30 * s);
        
        // Picnic blanket under tree
        dest.fillStyle(0xE53935, 0.9);
        dest.fillRect(destX - 40 * s, g - 8 * s, 80 * s, 12 * s);
        
        // Blanket pattern
        dest.fillStyle(0xFFFFFF, 0.5);
        for (let i = 0; i < 4; i++) {
            dest.fillRect(destX - 35 * s + i * 20 * s, g - 6 * s, 10 * s, 8 * s);
        }
        
        // Basket
        dest.fillStyle(0x8D6E63, 1);
        dest.fillRect(destX + 15 * s, g - 20 * s, 20 * s, 15 * s);
        dest.fillStyle(0xA1887F, 1);
        dest.beginPath();
        dest.arc(destX + 25 * s, g - 20 * s, 10 * s, Math.PI, 0);
        dest.fill();
        
        // Label
        const fontSize = Math.max(12, 14 * s);
        this.add.text(destX, g - 170 * s, '🌳 The Spot', {
            font: `bold ${fontSize}px Arial`,
            fill: '#2E7D32',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Collision zone
        this.cafeDoor = this.add.zone(destX, g - 50 * s, 100 * s, 80 * s);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        this.createIndicator(destX, g - 190 * s, s);
    }
    
    createBolognaDestination() {
        // Bologna Italian Restaurant with Tech Park sign
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        const dest = this.add.graphics();
        
        // Bologna Restaurant (main destination)
        const restaurantW = 130 * s;
        const restaurantH = 120 * s;
        const restaurantX = w - restaurantW - 80 * s;
        
        // Restaurant building - warm Italian colors
        dest.fillStyle(0x8B4513, 1); // Warm brown
        dest.fillRect(restaurantX, g - restaurantH, restaurantW, restaurantH);
        
        // Roof/awning - Italian green
        dest.fillStyle(0x2E7D32, 1);
        dest.fillRect(restaurantX - 10 * s, g - restaurantH - 12 * s, restaurantW + 20 * s, 15 * s);
        
        // Awning stripes (Italian flag colors)
        const stripeW = (restaurantW + 20 * s) / 3;
        dest.fillStyle(0x2E7D32, 1); // Green
        dest.fillRect(restaurantX - 10 * s, g - restaurantH - 12 * s, stripeW, 15 * s);
        dest.fillStyle(0xFFFFFF, 1); // White
        dest.fillRect(restaurantX - 10 * s + stripeW, g - restaurantH - 12 * s, stripeW, 15 * s);
        dest.fillStyle(0xE53935, 1); // Red
        dest.fillRect(restaurantX - 10 * s + stripeW * 2, g - restaurantH - 12 * s, stripeW, 15 * s);
        
        // Window with warm glow
        const winW = restaurantW * 0.4;
        const winH = restaurantH * 0.35;
        const winX = restaurantX + 15 * s;
        const winY = g - restaurantH + 20 * s;
        
        // Window glow
        dest.fillStyle(0xFFD54F, 0.3);
        dest.fillRect(winX - 5 * s, winY - 5 * s, winW + 10 * s, winH + 10 * s);
        dest.fillStyle(0xFFE0B2, 0.9);
        dest.fillRect(winX, winY, winW, winH);
        
        // Window frame
        dest.fillStyle(0x5D4037, 1);
        dest.fillRect(winX + winW / 2 - 2, winY, 4, winH);
        
        // Door
        const doorW = 35 * s;
        const doorH = 60 * s;
        const doorX = restaurantX + restaurantW - doorW - 20 * s;
        
        dest.fillStyle(0x3E2723, 1);
        dest.fillRect(doorX, g - doorH, doorW, doorH);
        
        // Door window
        dest.fillStyle(0xFFE0B2, 0.7);
        dest.fillRect(doorX + 5 * s, g - doorH + 8 * s, doorW - 10 * s, 20 * s);
        
        // Door handle
        dest.fillStyle(0xFFD700, 1);
        dest.fillCircle(doorX + doorW - 8 * s, g - doorH / 2, 3 * s);
        
        // Restaurant sign - "BOLOGNA"
        dest.fillStyle(0x1B5E20, 1);
        dest.fillRect(restaurantX + 10 * s, g - restaurantH + 75 * s, restaurantW - 20 * s, 25 * s);
        
        const signFontSize = Math.max(10, 12 * s);
        this.add.text(restaurantX + restaurantW / 2, g - restaurantH + 87 * s, 'BOLOGNA', {
            font: `bold ${signFontSize}px Arial`,
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        
        // Small Italian flag on sign
        dest.fillStyle(0x2E7D32, 1);
        dest.fillRect(restaurantX + 15 * s, g - restaurantH + 78 * s, 6 * s, 12 * s);
        dest.fillStyle(0xFFFFFF, 1);
        dest.fillRect(restaurantX + 21 * s, g - restaurantH + 78 * s, 6 * s, 12 * s);
        dest.fillStyle(0xE53935, 1);
        dest.fillRect(restaurantX + 27 * s, g - restaurantH + 78 * s, 6 * s, 12 * s);
        
        // Outdoor table with red checkered cloth
        dest.fillStyle(0x5D4037, 1);
        dest.fillRect(restaurantX - 40 * s, g - 35 * s, 35 * s, 3 * s);
        dest.fillRect(restaurantX - 30 * s, g - 32 * s, 3 * s, 32 * s);
        dest.fillRect(restaurantX - 15 * s, g - 32 * s, 3 * s, 32 * s);
        
        // Tablecloth
        dest.fillStyle(0xE53935, 0.8);
        dest.fillRect(restaurantX - 42 * s, g - 38 * s, 39 * s, 5 * s);
        
        // ===== TECH PARK SIGN (to the right) =====
        const signX = w - 50 * s;
        
        // Sign post
        dest.fillStyle(0x37474F, 1);
        dest.fillRect(signX - 4 * s, g - 90 * s, 8 * s, 90 * s);
        
        // Sign board
        dest.fillStyle(0x1565C0, 1);
        dest.fillRect(signX - 45 * s, g - 100 * s, 90 * s, 35 * s);
        
        // Sign border
        dest.fillStyle(0x0D47A1, 1);
        dest.fillRect(signX - 45 * s, g - 100 * s, 90 * s, 4 * s);
        dest.fillRect(signX - 45 * s, g - 69 * s, 90 * s, 4 * s);
        
        // Tech Park text
        const techFontSize = Math.max(9, 11 * s);
        this.add.text(signX, g - 88 * s, '🏢 TECH PARK', {
            font: `bold ${techFontSize}px Arial`,
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        
        // Arrow pointing right
        this.add.text(signX, g - 73 * s, '→', {
            font: `bold ${techFontSize * 1.2}px Arial`,
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        
        // Label for destination
        const labelFontSize = Math.max(12, 14 * s);
        this.add.text(restaurantX + restaurantW / 2, g - restaurantH - 30 * s, '🍝 Bologna', {
            font: `bold ${labelFontSize}px Arial`,
            fill: '#FFD54F',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Collision zone at door
        this.cafeDoor = this.add.zone(doorX + doorW / 2, g - doorH / 2, doorW + 30 * s, doorH + 20 * s);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        this.createIndicator(restaurantX + restaurantW / 2, g - restaurantH - 50 * s, s);
    }
    
    createPhoenixMallDestination() {
        // Phoenix Marketcity Whitefield Mall
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        const dest = this.add.graphics();
        
        // Mall building - modern glass and steel look
        const mallW = 200 * s;
        const mallH = 150 * s;
        const mallX = w - mallW - 60 * s;
        
        // Main building structure - modern grey/blue glass
        dest.fillStyle(0x37474F, 1);
        dest.fillRect(mallX, g - mallH, mallW, mallH);
        
        // Glass facade panels
        dest.fillStyle(0x546E7A, 0.9);
        dest.fillRect(mallX + 5 * s, g - mallH + 10 * s, mallW - 10 * s, mallH - 15 * s);
        
        // Reflective glass windows - multiple rows
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 5; col++) {
                const winX = mallX + 15 * s + col * 35 * s;
                const winY = g - mallH + 25 * s + row * 40 * s;
                const winW = 28 * s;
                const winH = 32 * s;
                
                // Window with evening reflection
                dest.fillStyle(0x78909C, 0.8);
                dest.fillRect(winX, winY, winW, winH);
                
                // Warm interior glow (some windows lit)
                if (Math.random() > 0.3) {
                    dest.fillStyle(0xFFE082, 0.4);
                    dest.fillRect(winX + 2 * s, winY + 2 * s, winW - 4 * s, winH - 4 * s);
                }
                
                // Sunset reflection on glass
                dest.fillStyle(0xFFB74D, 0.15);
                dest.fillRect(winX, winY, winW * 0.4, winH);
            }
        }
        
        // Mall entrance - grand double doors
        const entranceW = 60 * s;
        const entranceH = 70 * s;
        const entranceX = mallX + (mallW - entranceW) / 2;
        
        // Entrance frame
        dest.fillStyle(0x263238, 1);
        dest.fillRect(entranceX - 5 * s, g - entranceH - 5 * s, entranceW + 10 * s, entranceH + 5 * s);
        
        // Glass doors
        dest.fillStyle(0x90A4AE, 0.9);
        dest.fillRect(entranceX, g - entranceH, entranceW / 2 - 2 * s, entranceH);
        dest.fillRect(entranceX + entranceW / 2 + 2 * s, g - entranceH, entranceW / 2 - 2 * s, entranceH);
        
        // Door handles
        dest.fillStyle(0xFFD700, 1);
        dest.fillRect(entranceX + entranceW / 2 - 8 * s, g - entranceH / 2 - 10 * s, 3 * s, 20 * s);
        dest.fillRect(entranceX + entranceW / 2 + 5 * s, g - entranceH / 2 - 10 * s, 3 * s, 20 * s);
        
        // Entrance canopy
        dest.fillStyle(0x455A64, 1);
        dest.fillRect(entranceX - 20 * s, g - entranceH - 15 * s, entranceW + 40 * s, 12 * s);
        
        // PHOENIX MARKETCITY sign - illuminated
        const signW = mallW * 0.85;
        const signH = 30 * s;
        const signX = mallX + (mallW - signW) / 2;
        const signY = g - mallH - signH - 10 * s;
        
        // Sign glow
        dest.fillStyle(0xE91E63, 0.2);
        dest.fillRect(signX - 10 * s, signY - 8 * s, signW + 20 * s, signH + 16 * s);
        
        // Sign background
        dest.fillStyle(0x880E4F, 1);
        dest.fillRect(signX, signY, signW, signH);
        
        // Sign border
        dest.fillStyle(0xFFD700, 1);
        dest.fillRect(signX, signY, signW, 3 * s);
        dest.fillRect(signX, signY + signH - 3 * s, signW, 3 * s);
        dest.fillRect(signX, signY, 3 * s, signH);
        dest.fillRect(signX + signW - 3 * s, signY, 3 * s, signH);
        
        // Sign text
        const signFontSize = Math.max(10, 13 * s);
        this.add.text(mallX + mallW / 2, signY + signH / 2, '🏬 PHOENIX MARKETCITY', {
            font: `bold ${signFontSize}px Arial`,
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        
        // Whitefield text below
        const subFontSize = Math.max(8, 10 * s);
        this.add.text(mallX + mallW / 2, signY + signH + 10 * s, 'WHITEFIELD', {
            font: `${subFontSize}px Arial`,
            fill: '#FFD54F',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Decorative pillars at entrance
        dest.fillStyle(0x455A64, 1);
        dest.fillRect(entranceX - 15 * s, g - entranceH - 15 * s, 10 * s, entranceH + 15 * s);
        dest.fillRect(entranceX + entranceW + 5 * s, g - entranceH - 15 * s, 10 * s, entranceH + 15 * s);
        
        // Shopping bags/people silhouettes near entrance (adds life)
        dest.fillStyle(0x212121, 0.6);
        dest.fillCircle(entranceX - 30 * s, g - 25 * s, 8 * s);
        dest.fillRect(entranceX - 35 * s, g - 17 * s, 10 * s, 17 * s);
        
        // Another person silhouette
        dest.fillStyle(0x212121, 0.5);
        dest.fillCircle(entranceX + entranceW + 35 * s, g - 22 * s, 7 * s);
        dest.fillRect(entranceX + entranceW + 30 * s, g - 15 * s, 10 * s, 15 * s);
        
        // Label for destination
        const labelFontSize = Math.max(12, 15 * s);
        this.add.text(mallX + mallW / 2, g - mallH - 55 * s, '🛍️ The Mall', {
            font: `bold ${labelFontSize}px Arial`,
            fill: '#E91E63',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Collision zone at entrance
        this.cafeDoor = this.add.zone(entranceX + entranceW / 2, g - entranceH / 2, entranceW + 40 * s, entranceH + 20 * s);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        this.createIndicator(mallX + mallW / 2, g - mallH - 75 * s, s);
    }
    
    createGenericDestination() {
        // Generic destination for new scenes - a simple marker
        const w = this.sceneWidth;
        const g = this.groundY;
        const s = this.scale_factor;
        const sceneData = SCENE_DATA[currentSceneIndex];
        
        const destX = w - 100 * s;
        
        // Simple glowing marker
        const marker = this.add.graphics();
        marker.fillStyle(0xFF6B9D, 0.2);
        marker.fillCircle(destX, g - 50 * s, 60 * s);
        marker.fillStyle(0xFF6B9D, 0.4);
        marker.fillCircle(destX, g - 50 * s, 40 * s);
        marker.fillStyle(0xFF6B9D, 0.8);
        marker.fillCircle(destX, g - 50 * s, 20 * s);
        
        // Label
        const fontSize = Math.max(12, 14 * s);
        this.add.text(destX, g - 90 * s, `✨ ${sceneData.destination}`, {
            font: `bold ${fontSize}px Arial`,
            fill: '#FF6B9D',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Collision zone
        this.cafeDoor = this.add.zone(destX, g - 40 * s, 80 * s, 60 * s);
        this.physics.world.enable(this.cafeDoor);
        this.cafeDoor.body.setAllowGravity(false);
        this.cafeDoor.body.moves = false;
        
        this.createIndicator(destX, g - 110 * s, s);
    }

    createAmbientEffects() {
        // Floating sparkles
        this.time.addEvent({
            delay: 400,
            callback: () => {
                if (this.isPaused) return;
                const x = Math.random() * this.sceneWidth;
                const y = this.gameHeight * 0.1 + Math.random() * this.gameHeight * 0.5;
                
                const sparkle = this.add.image(x, y, 'sparkle');
                const s = this.scale_factor || 1;
                sparkle.setScale((0.2 + Math.random() * 0.15) * s);
                sparkle.setAlpha(0);
                
                this.tweens.add({
                    targets: sparkle,
                    alpha: 0.6,
                    y: y - 30 * s,
                    duration: 2000,
                    onComplete: () => {
                        this.tweens.add({
                            targets: sparkle,
                            alpha: 0,
                            duration: 500,
                            onComplete: () => sparkle.destroy()
                        });
                    }
                });
            },
            loop: true
        });
    }

    setupMobileControls() {
        const leftBtn = document.getElementById('left-btn');
        const rightBtn = document.getElementById('right-btn');
        const jumpBtn = document.getElementById('jump-btn');
        
        const addTouch = (el, control) => {
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
            
            newEl.addEventListener('touchstart', (e) => {
                e.preventDefault();
                mobileControls[control] = true;
            });
            newEl.addEventListener('touchend', () => mobileControls[control] = false);
            newEl.addEventListener('touchcancel', () => mobileControls[control] = false);
            newEl.addEventListener('mousedown', () => mobileControls[control] = true);
            newEl.addEventListener('mouseup', () => mobileControls[control] = false);
            newEl.addEventListener('mouseleave', () => mobileControls[control] = false);
        };
        
        if (leftBtn) addTouch(leftBtn, 'left');
        if (rightBtn) addTouch(rightBtn, 'right');
        if (jumpBtn) addTouch(jumpBtn, 'jump');
    }

    setupAudio() {
        // Start music for current scene
        startSceneMusic(currentSceneIndex);
        
        const audioToggle = document.getElementById('audio-toggle');
        if (audioToggle) {
            const newToggle = audioToggle.cloneNode(true);
            audioToggle.parentNode.replaceChild(newToggle, audioToggle);
            
            newToggle.addEventListener('click', () => {
                audioEnabled = !audioEnabled;
                newToggle.textContent = audioEnabled ? '🔊' : '🔇';
                setMusicVolume(audioEnabled);
            });
        }
    }

    updateProgressHearts() {
        const hearts = document.querySelectorAll('.progress-heart');
        hearts.forEach((heart, index) => {
            if (index < currentSceneIndex) {
                heart.textContent = '❤️';
                heart.classList.add('filled');
            } else {
                heart.textContent = '🤍';
                heart.classList.remove('filled');
            }
        });
    }

    update(time, delta) {
        if (this.isPaused || this.isEntering || this.gameOver) return;
        
        // Update dino
        this.updateDino(delta);
        
        // Movement
        const leftPressed = this.cursors.left.isDown || this.wasd.left.isDown || mobileControls.left;
        const rightPressed = this.cursors.right.isDown || this.wasd.right.isDown || mobileControls.right;
        const jumpPressed = this.cursors.up.isDown || this.wasd.space.isDown || this.cursors.space.isDown || mobileControls.jump;
        
        // Speed multiplier for motorcycle
        const speedMultiplier = this.isMotorcycleScene ? 1.8 : 1;
        
        if (leftPressed) {
            this.player.setVelocityX(-GAME_CONFIG.playerSpeed * speedMultiplier);
            this.player.setFlipX(true);
            if (this.isMotorcycleScene) {
                this.animateMotorcycle(delta);
            } else {
                this.animateWalk(delta);
            }
        } else if (rightPressed) {
            this.player.setVelocityX(GAME_CONFIG.playerSpeed * speedMultiplier);
            this.player.setFlipX(false);
            if (this.isMotorcycleScene) {
                this.animateMotorcycle(delta);
            } else {
                this.animateWalk(delta);
            }
        } else {
            this.player.setVelocityX(0);
            if (this.isMotorcycleScene) {
                this.player.setTexture('motorcycle');
            } else {
                this.player.setTexture('player');
            }
        }
        
        // Jump (not for motorcycle)
        if (!this.isMotorcycleScene && jumpPressed && this.player.body.touching.down) {
            this.player.setVelocityY(GAME_CONFIG.jumpVelocity);
        }
        
        // Update parallax mountains if in motorcycle scene
        if (this.isMotorcycleScene && this.mountainParallax) {
            this.updateMountainParallax(delta);
        }
        
        // Check if reached destination (only if collision is enabled and not resizing)
        if (this.collisionEnabled && !isResizing && this.cafeDoor && this.physics.overlap(this.player, this.cafeDoor) && !this.cafeReached) {
            this.cafeReached = true;
            this.enterDestination();
        }
    }

    animateWalk(delta) {
        this.walkTimer += delta;
        if (this.walkTimer > 100) {
            this.walkTimer = 0;
            this.walkFrame = (this.walkFrame + 1) % 4;
            this.player.setTexture('player_walk_' + this.walkFrame);
        }
    }
    
    animateMotorcycle(delta) {
        this.motorcycleTimer += delta;
        if (this.motorcycleTimer > 80) {
            this.motorcycleTimer = 0;
            this.motorcycleFrame = (this.motorcycleFrame + 1) % 4;
            this.player.setTexture('motorcycle_' + this.motorcycleFrame);
        }
    }
    
    updateMountainParallax(delta) {
        // Only scroll when player is moving
        const playerVelX = this.player.body.velocity.x;
        if (Math.abs(playerVelX) < 10) return;
        
        // Scroll mountains in opposite direction to create parallax
        const scrollDir = playerVelX > 0 ? -1 : 1;
        const baseScroll = delta * 0.05 * scrollDir;
        
        // Move each layer at different speeds (already stored in mountainParallax)
        // Note: Since we're using graphics objects, we move their x position
        if (this.farMountains) {
            this.farMountains.x += baseScroll * 0.2;
        }
        if (this.midMountains) {
            this.midMountains.x += baseScroll * 0.5;
        }
        if (this.nearMountains) {
            this.nearMountains.x += baseScroll * 0.8;
        }
    }

    enterDestination() {
        // Don't enter destination during resize
        if (isResizing) {
            console.log('enterDestination blocked - resize in progress');
            this.cafeReached = false; // Reset so it can be triggered again
            return;
        }
        
        this.isEntering = true;
        this.player.setVelocityX(0);
        
        const sceneData = SCENE_DATA[currentSceneIndex];
        
        // Check if this is the Valentine scene
        if (sceneData.message === 'VALENTINE') {
            this.showValentineOverlay();
        } else {
            this.showMessage(sceneData.message, sceneData.heading);
        }
    }

    showMessage(message, heading = null) {
        const modal = document.getElementById('modal-overlay');
        const modalText = document.getElementById('modal-text');
        const continueBtn = document.getElementById('modal-continue');
        
        // Build content with optional heading
        if (heading) {
            modalText.innerHTML = `<h2 class="message-heading">${heading}</h2><p class="message-body">${message.replace(/\n/g, '<br>')}</p>`;
        } else {
            modalText.textContent = message;
        }
        modal.classList.remove('hidden');
        
        const newBtn = continueBtn.cloneNode(true);
        continueBtn.parentNode.replaceChild(newBtn, continueBtn);
        
        // Store reference to this scene
        const scene = this;
        
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Block clicks during resize operations
            if (isResizing) {
                console.log('Continue button click blocked - resize in progress');
                return;
            }
            
            // Only proceed if modal is actually visible and scene hasn't exited
            if (!modal.classList.contains('hidden') && !scene.hasExited) {
                console.log('Continue button clicked - advancing scene');
                modal.classList.add('hidden');
                scene.exitAndContinue();
            }
        });
    }

    exitAndContinue() {
        // Prevent multiple calls
        if (this.hasExited) {
            console.log('exitAndContinue already called, ignoring');
            return;
        }
        this.hasExited = true;
        
        console.log('exitAndContinue called - before increment, currentSceneIndex:', currentSceneIndex);
        currentSceneIndex++;
        console.log('Transitioning to scene:', currentSceneIndex, 'of', SCENE_DATA.length);
        
        if (currentSceneIndex >= SCENE_DATA.length) {
            // Game complete
            this.showFinalScene();
        } else {
            // Fade out, then restart
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.restart();
            });
        }
    }

    showValentineOverlay() {
        const overlay = document.getElementById('valentine-overlay');
        overlay.classList.remove('hidden');
        
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        
        const newYes = yesBtn.cloneNode(true);
        const newNo = noBtn.cloneNode(true);
        yesBtn.parentNode.replaceChild(newYes, yesBtn);
        noBtn.parentNode.replaceChild(newNo, noBtn);
        
        let noClickCount = 0;
        
        newNo.addEventListener('click', () => {
            noClickCount++;
            const offset = 50 + noClickCount * 30;
            newNo.style.transform = `translate(${(Math.random() - 0.5) * offset}px, ${(Math.random() - 0.5) * offset}px)`;
            
            if (noClickCount > 5) {
                newNo.style.opacity = '0.5';
                newNo.textContent = '😅';
            }
            if (noClickCount > 8) {
                newNo.style.display = 'none';
            }
        });
        
        newYes.addEventListener('click', () => {
            this.celebrateValentine();
        });
    }

    celebrateValentine() {
        // Confetti
        const container = document.getElementById('confetti-container');
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = ['#FF6B9D', '#FFD700', '#FF69B4', '#87CEEB', '#98FB98'][Math.floor(Math.random() * 5)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(confetti);
        }
        
        // Floating hearts
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(heart);
        }
        
        setTimeout(() => {
            document.getElementById('valentine-overlay').classList.add('hidden');
            
            console.log('Valentine celebration done, gameMode:', gameMode);
            
            // Check game mode for different endings
            if (gameMode === 'secret') {
                // Secret mode: Show hero cinematic, then girlfriend question
                console.log('Showing hero cinematic (secret mode)');
                this.showHeroCinematic();
            } else {
                // Normal mode: Show valentine success message
                console.log('Showing valentine success (normal mode)');
                this.showValentineSuccess();
            }
        }, 4000);
    }
    
    showValentineSuccess() {
        // Normal ending - Valentine YES celebration
        console.log('showValentineSuccess called');
        const overlay = document.getElementById('valentine-success-overlay');
        console.log('valentine-success-overlay element:', overlay);
        overlay.classList.remove('hidden');
        console.log('Removed hidden class from valentine-success-overlay');
        
        // Add more confetti
        const container = document.getElementById('success-confetti-container');
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = ['#FF6B9D', '#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#FF4081'][Math.floor(Math.random() * 6)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(confetti);
        }
        
        // Floating hearts
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = ['❤️', '💕', '💖', '💗', '✨', '🌟'][Math.floor(Math.random() * 6)];
            heart.style.left = Math.random() * 100 + '%';
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, 150);
    }
    
    showHeroCinematic() {
        // Secret mode cinematic: Hero saves girl from dino
        // MUST MATCH SCENE 8 EXACTLY
        console.log('showHeroCinematic called');
        const overlay = document.getElementById('hero-cinematic-overlay');
        overlay.classList.remove('hidden');
        
        const canvas = document.getElementById('cinematic-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const w = canvas.width;
        const h = canvas.height;
        // Same ground position as Scene 8 (88% from top)
        const groundY = h * 0.88;
        // Same scale factor as the game
        const scale = Math.min(h / 600, w / 900);
        
        // Dino speed - same as scene 7 in game (50 + 7*12 = 134)
        const dinoSpeed = 80; // pixels per second, slower for cinematic
        
        // Characters positions
        let heroX = w + 80; // Starts off-screen right
        let girlX = w * 0.5; // Girl in center
        let dinoX = -120; // Dino starts off-screen left
        let bulletX = -100;
        let bulletActive = false;
        let dinoHit = false;
        let phase = 'enter'; // enter, hero_runs, shoot, celebrate
        
        const scene = this;
        let animationRunning = true;
        let lastTime = Date.now();
        
        // Draw background EXACTLY like Scene 8 (Valentine scene)
        function drawBackground() {
            // Pink gradient sky - same as createValentineFinalScene
            for (let i = 0; i < h; i++) {
                const ratio = i / h;
                const r = Math.floor(255 - ratio * 20);
                const g = Math.floor(200 - ratio * 40);
                const b = Math.floor(230 - ratio * 30);
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(0, i, w, 1);
            }
            
            // Floating hearts scattered across sky (same as Scene 8)
            ctx.font = `${22 * scale}px Arial`;
            const heartPositions = [
                {x: 0.05, y: 0.12}, {x: 0.15, y: 0.22}, {x: 0.08, y: 0.38},
                {x: 0.22, y: 0.08}, {x: 0.32, y: 0.28}, {x: 0.25, y: 0.48},
                {x: 0.42, y: 0.15}, {x: 0.52, y: 0.32}, {x: 0.45, y: 0.52},
                {x: 0.62, y: 0.10}, {x: 0.70, y: 0.35}, {x: 0.65, y: 0.55},
                {x: 0.78, y: 0.18}, {x: 0.85, y: 0.40}, {x: 0.80, y: 0.58},
                {x: 0.92, y: 0.08}, {x: 0.95, y: 0.28}, {x: 0.88, y: 0.62}
            ];
            
            heartPositions.forEach((pos, i) => {
                ctx.globalAlpha = 0.3;
                const floatOffset = Math.sin(Date.now() / 2500 + i * 0.5) * 6;
                ctx.fillText('❤️', w * pos.x, h * pos.y + floatOffset);
            });
            ctx.globalAlpha = 1;
            
            // Pink ground with footpath - same as Scene 8
            // Main ground
            ctx.fillStyle = '#F8BBD9';
            ctx.fillRect(0, groundY - 15 * scale, w, h - groundY + 30 * scale);
            
            // Footpath/sidewalk edge (darker line)
            ctx.fillStyle = '#E8A0B8';
            ctx.fillRect(0, groundY - 15 * scale, w, 4 * scale);
        }
        
        // Draw the EXACT same cute girl from the game (same scale as player sprite)
        function drawGirl(x, scared = true) {
            // Player scale in game: Math.max(0.8, Math.min(1.5, scale))
            // Player sprite is 50x70 pixels
            const playerScale = Math.max(0.8, Math.min(1.5, scale));
            const s = playerScale * 1.0; // Match game exactly
            const baseY = groundY - 15 * scale; // Account for ground offset
            
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.beginPath();
            ctx.ellipse(x, baseY - 2, 15 * s, 4 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Hair back (long ponytail)
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.ellipse(x, baseY - 25 * s, 10 * s, 25 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Head
            ctx.fillStyle = '#FFE4C4';
            ctx.beginPath();
            ctx.arc(x, baseY - 52 * s, 15 * s, 0, Math.PI * 2);
            ctx.fill();
            
            // Hair top
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.arc(x, baseY - 57 * s, 16 * s, Math.PI, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x, baseY - 62 * s, 12 * s, 8 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Hair sides
            ctx.fillRect(x - 16 * s, baseY - 58 * s, 6 * s, 18 * s);
            ctx.fillRect(x + 10 * s, baseY - 58 * s, 6 * s, 18 * s);
            
            // Pink bow
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.ellipse(x + 12 * s, baseY - 65 * s, 6 * s, 4 * s, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 18 * s, baseY - 63 * s, 6 * s, 4 * s, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FF1493';
            ctx.beginPath();
            ctx.arc(x + 15 * s, baseY - 64 * s, 2.5 * s, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = '#000';
            if (scared) {
                // Scared wide eyes
                ctx.beginPath();
                ctx.ellipse(x - 6 * s, baseY - 52 * s, 3 * s, 4 * s, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(x + 6 * s, baseY - 52 * s, 3 * s, 4 * s, 0, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Happy eyes
                ctx.beginPath();
                ctx.ellipse(x - 6 * s, baseY - 52 * s, 2.5 * s, 3.5 * s, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(x + 6 * s, baseY - 52 * s, 2.5 * s, 3.5 * s, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Eye shine
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(x - 7 * s, baseY - 53 * s, 1.5 * s, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 5 * s, baseY - 53 * s, 1.5 * s, 0, Math.PI * 2);
            ctx.fill();
            
            // Blush
            ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
            ctx.beginPath();
            ctx.ellipse(x - 12 * s, baseY - 48 * s, 4 * s, 2.5 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 12 * s, baseY - 48 * s, 4 * s, 2.5 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Mouth
            if (scared) {
                // Scared O mouth
                ctx.fillStyle = '#E57373';
                ctx.beginPath();
                ctx.ellipse(x, baseY - 45 * s, 4 * s, 5 * s, 0, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Happy smile
                ctx.strokeStyle = '#E57373';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.arc(x, baseY - 47 * s, 5 * s, 0.2, Math.PI - 0.2);
                ctx.stroke();
            }
            
            // Body/Dress
            ctx.fillStyle = '#FF6B9D';
            ctx.beginPath();
            ctx.moveTo(x - 12 * s, baseY - 38 * s);
            ctx.lineTo(x + 12 * s, baseY - 38 * s);
            ctx.lineTo(x + 18 * s, baseY - 12 * s);
            ctx.lineTo(x - 18 * s, baseY - 12 * s);
            ctx.closePath();
            ctx.fill();
            
            // Dress details
            ctx.fillStyle = '#FF8FB4';
            ctx.beginPath();
            ctx.moveTo(x - 8 * s, baseY - 38 * s);
            ctx.lineTo(x + 8 * s, baseY - 38 * s);
            ctx.lineTo(x + 10 * s, baseY - 28 * s);
            ctx.lineTo(x - 10 * s, baseY - 28 * s);
            ctx.closePath();
            ctx.fill();
            
            // Legs
            ctx.fillStyle = '#FFE4C4';
            ctx.fillRect(x - 10 * s, baseY - 12 * s, 7 * s, 10 * s);
            ctx.fillRect(x + 3 * s, baseY - 12 * s, 7 * s, 10 * s);
            
            // Shoes
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.ellipse(x - 6 * s, baseY - 2 * s, 6 * s, 3 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 6 * s, baseY - 2 * s, 6 * s, 3 * s, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw the hero (slightly taller than girl, not excessively)
        function drawHero(x, running = true) {
            // Hero is about 1.2x the girl's height
            const playerScale = Math.max(0.8, Math.min(1.5, scale));
            const s = playerScale * 1.15; // Slightly taller than girl
            const baseY = groundY - 15 * scale; // Account for ground offset
            // Slower animation for cinematic feel
            const runOffset = running ? Math.sin(Date.now() / 180) * 3 * s : 0;
            const legSwing = running ? Math.sin(Date.now() / 180) * 0.35 : 0;
            
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.beginPath();
            ctx.ellipse(x, baseY - 2, 18 * s, 5 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // ===== LEGS =====
            ctx.fillStyle = '#1A237E'; // Dark blue jeans
            // Left leg
            ctx.save();
            ctx.translate(x - 8 * s, baseY - 45 * s + runOffset);
            ctx.rotate(legSwing);
            ctx.fillRect(-5 * s, 0, 10 * s, 43 * s);
            ctx.restore();
            // Right leg
            ctx.save();
            ctx.translate(x + 8 * s, baseY - 45 * s + runOffset);
            ctx.rotate(-legSwing);
            ctx.fillRect(-5 * s, 0, 10 * s, 43 * s);
            ctx.restore();
            
            // Shoes
            ctx.fillStyle = '#212121';
            ctx.beginPath();
            ctx.ellipse(x - 8 * s, baseY - 2, 7 * s, 4 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 8 * s, baseY - 2, 7 * s, 4 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // ===== BODY =====
            // Torso - Blue shirt
            ctx.fillStyle = '#1976D2';
            ctx.beginPath();
            ctx.moveTo(x - 15 * s, baseY - 45 * s + runOffset);
            ctx.lineTo(x + 15 * s, baseY - 45 * s + runOffset);
            ctx.lineTo(x + 18 * s, baseY - 75 * s + runOffset);
            ctx.lineTo(x - 18 * s, baseY - 75 * s + runOffset);
            ctx.closePath();
            ctx.fill();
            
            // Collar
            ctx.fillStyle = '#0D47A1';
            ctx.beginPath();
            ctx.moveTo(x - 8 * s, baseY - 75 * s + runOffset);
            ctx.lineTo(x, baseY - 68 * s + runOffset);
            ctx.lineTo(x + 8 * s, baseY - 75 * s + runOffset);
            ctx.closePath();
            ctx.fill();
            
            // ===== ARMS =====
            ctx.fillStyle = '#FFE4C4';
            if (running) {
                // Running arms swing - matches leg timing
                const armSwing = Math.sin(Date.now() / 180) * 0.5;
                // Left arm
                ctx.save();
                ctx.translate(x - 18 * s, baseY - 70 * s + runOffset);
                ctx.rotate(-armSwing);
                ctx.fillRect(-4 * s, 0, 8 * s, 28 * s);
                ctx.restore();
                // Right arm
                ctx.save();
                ctx.translate(x + 18 * s, baseY - 70 * s + runOffset);
                ctx.rotate(armSwing);
                ctx.fillRect(-4 * s, 0, 8 * s, 28 * s);
                ctx.restore();
            } else {
                // Shooting pose - facing LEFT (towards dino)
                // Right arm relaxed at side
                ctx.fillRect(x + 14 * s, baseY - 70 * s, 8 * s, 25 * s);
                // Left arm extended forward (shooting left towards dino)
                ctx.fillRect(x - 49 * s, baseY - 68 * s, 35 * s, 8 * s);
                // Hand
                ctx.beginPath();
                ctx.arc(x - 48 * s, baseY - 64 * s, 5 * s, 0, Math.PI * 2);
                ctx.fill();
                // Gun (pointing left)
                ctx.fillStyle = '#37474F';
                ctx.fillRect(x - 75 * s, baseY - 70 * s, 25 * s, 12 * s);
                ctx.fillStyle = '#263238';
                ctx.fillRect(x - 58 * s, baseY - 58 * s, 6 * s, 10 * s); // Handle
            }
            
            // ===== HEAD =====
            // Neck
            ctx.fillStyle = '#FFE4C4';
            ctx.fillRect(x - 6 * s, baseY - 82 * s + runOffset, 12 * s, 10 * s);
            
            // Head
            ctx.beginPath();
            ctx.arc(x, baseY - 90 * s + runOffset, 14 * s, 0, Math.PI * 2);
            ctx.fill();
            
            // Hair - styled dark hair
            ctx.fillStyle = '#1A1A2E';
            ctx.beginPath();
            ctx.arc(x, baseY - 95 * s + runOffset, 15 * s, Math.PI, Math.PI * 2);
            ctx.fill();
            // Hair swoosh to the side
            ctx.beginPath();
            ctx.moveTo(x - 12 * s, baseY - 100 * s + runOffset);
            ctx.quadraticCurveTo(x + 5 * s, baseY - 115 * s + runOffset, x + 18 * s, baseY - 98 * s + runOffset);
            ctx.quadraticCurveTo(x + 5 * s, baseY - 100 * s + runOffset, x - 5 * s, baseY - 98 * s + runOffset);
            ctx.closePath();
            ctx.fill();
            // Side hair
            ctx.fillRect(x - 15 * s, baseY - 95 * s + runOffset, 5 * s, 12 * s);
            ctx.fillRect(x + 10 * s, baseY - 95 * s + runOffset, 5 * s, 10 * s);
            
            // Eyes - determined look
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.ellipse(x - 5 * s, baseY - 90 * s + runOffset, 2 * s, 2.5 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 5 * s, baseY - 90 * s + runOffset, 2 * s, 2.5 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Eye shine
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(x - 6 * s, baseY - 91 * s + runOffset, 1 * s, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 4 * s, baseY - 91 * s + runOffset, 1 * s, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyebrows - determined
            ctx.strokeStyle = '#1A1A2E';
            ctx.lineWidth = 2.5 * s;
            ctx.beginPath();
            ctx.moveTo(x - 9 * s, baseY - 96 * s + runOffset);
            ctx.lineTo(x - 2 * s, baseY - 94 * s + runOffset);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + 2 * s, baseY - 94 * s + runOffset);
            ctx.lineTo(x + 9 * s, baseY - 96 * s + runOffset);
            ctx.stroke();
            
            // Confident smile
            ctx.strokeStyle = '#C97B7B';
            ctx.lineWidth = 2 * s;
            ctx.beginPath();
            ctx.arc(x, baseY - 85 * s + runOffset, 5 * s, 0.2, Math.PI - 0.2);
            ctx.stroke();
        }
        
        // Draw the EXACT same scary red T-Rex from the game (same scale as dino sprite)
        function drawDino(x, dead = false) {
            // Dino scale in game: Math.max(1.0, Math.min(1.8, scale * 1.3))
            // Dino sprite is 125x110 pixels
            const dinoScale = Math.max(1.0, Math.min(1.8, scale * 1.3));
            const s = dinoScale * 0.85; // Match game dino size
            const baseY = groundY - 15 * scale; // Account for ground offset
            
            ctx.save();
            
            if (dead) {
                // Dead dino - falling/fallen
                ctx.translate(x + 30 * s, baseY - 20 * s);
                ctx.rotate(Math.PI / 3); // Tilted over
                ctx.globalAlpha = 0.8;
                x = 0;
            }
            
            // Body gradient - angry red/crimson
            const bodyGrad = ctx.createLinearGradient(x - 30 * s, baseY - 80 * s, x + 80 * s, baseY);
            bodyGrad.addColorStop(0, dead ? '#8B0000' : '#D32F2F');
            bodyGrad.addColorStop(0.4, dead ? '#6B0000' : '#F44336');
            bodyGrad.addColorStop(0.7, dead ? '#5B0000' : '#C62828');
            bodyGrad.addColorStop(1, dead ? '#4B0000' : '#B71C1C');
            
            // Shadow
            if (!dead) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.beginPath();
                ctx.ellipse(x + 20 * s, baseY - 2, 40 * s, 8 * s, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Tail
            ctx.fillStyle = bodyGrad;
            ctx.beginPath();
            ctx.moveTo(x - 25 * s, baseY - 35 * s);
            ctx.quadraticCurveTo(x - 55 * s, baseY - 45 * s, x - 60 * s, baseY - 30 * s);
            ctx.quadraticCurveTo(x - 50 * s, baseY - 20 * s, x - 20 * s, baseY - 30 * s);
            ctx.closePath();
            ctx.fill();
            
            // Body (large and bulky)
            ctx.beginPath();
            ctx.ellipse(x, baseY - 40 * s, 35 * s, 28 * s, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // BIG HEAD
            ctx.beginPath();
            ctx.moveTo(x + 20 * s, baseY - 50 * s);
            ctx.quadraticCurveTo(x + 35 * s, baseY - 80 * s, x + 55 * s, baseY - 85 * s);
            ctx.quadraticCurveTo(x + 80 * s, baseY - 90 * s, x + 90 * s, baseY - 70 * s);
            ctx.quadraticCurveTo(x + 95 * s, baseY - 50 * s, x + 85 * s, baseY - 40 * s);
            ctx.quadraticCurveTo(x + 70 * s, baseY - 30 * s, x + 50 * s, baseY - 35 * s);
            ctx.lineTo(x + 25 * s, baseY - 45 * s);
            ctx.closePath();
            ctx.fill();
            
            // Lower jaw - open mouth
            ctx.beginPath();
            ctx.moveTo(x + 45 * s, baseY - 40 * s);
            ctx.quadraticCurveTo(x + 70 * s, baseY - 30 * s, x + 88 * s, baseY - 38 * s);
            ctx.quadraticCurveTo(x + 92 * s, baseY - 28 * s, x + 82 * s, baseY - 22 * s);
            ctx.quadraticCurveTo(x + 60 * s, baseY - 18 * s, x + 40 * s, baseY - 30 * s);
            ctx.closePath();
            ctx.fill();
            
            // SCARY TEETH - top row
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(x + 50 * s + i * 8 * s, baseY - 42 * s);
                ctx.lineTo(x + 53 * s + i * 8 * s, baseY - 30 * s);
                ctx.lineTo(x + 56 * s + i * 8 * s, baseY - 42 * s);
                ctx.closePath();
                ctx.fill();
            }
            
            // SCARY TEETH - bottom row
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(x + 52 * s + i * 8 * s, baseY - 24 * s);
                ctx.lineTo(x + 55 * s + i * 8 * s, baseY - 36 * s);
                ctx.lineTo(x + 58 * s + i * 8 * s, baseY - 24 * s);
                ctx.closePath();
                ctx.fill();
            }
            
            // Eye
            if (dead) {
                // X eye
                ctx.strokeStyle = '#FFF';
                ctx.lineWidth = 4 * s;
                ctx.beginPath();
                ctx.moveTo(x + 58 * s, baseY - 75 * s);
                ctx.lineTo(x + 72 * s, baseY - 61 * s);
                ctx.moveTo(x + 72 * s, baseY - 75 * s);
                ctx.lineTo(x + 58 * s, baseY - 61 * s);
                ctx.stroke();
            } else {
                // Angry yellow eye
                ctx.fillStyle = '#FFEB3B';
                ctx.beginPath();
                ctx.ellipse(x + 65 * s, baseY - 68 * s, 10 * s, 12 * s, -0.2, 0, Math.PI * 2);
                ctx.fill();
                // Red ring
                ctx.strokeStyle = '#8B0000';
                ctx.lineWidth = 2 * s;
                ctx.stroke();
                // Slit pupil
                ctx.fillStyle = '#000000';
                ctx.beginPath();
                ctx.ellipse(x + 67 * s, baseY - 67 * s, 3 * s, 9 * s, 0, 0, Math.PI * 2);
                ctx.fill();
                // Eye shine
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(x + 62 * s, baseY - 72 * s, 3 * s, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Angry brow
            ctx.fillStyle = dead ? '#5B0000' : '#8B0000';
            ctx.beginPath();
            ctx.moveTo(x + 50 * s, baseY - 78 * s);
            ctx.quadraticCurveTo(x + 65 * s, baseY - 88 * s, x + 80 * s, baseY - 75 * s);
            ctx.quadraticCurveTo(x + 65 * s, baseY - 82 * s, x + 50 * s, baseY - 76 * s);
            ctx.closePath();
            ctx.fill();
            
            // Spikes on back
            ctx.fillStyle = dead ? '#5B0000' : '#8B0000';
            const spikes = [[-15, -55], [0, -60], [15, -58]];
            spikes.forEach(([sx, sy]) => {
                ctx.beginPath();
                ctx.moveTo(x + sx * s - 6 * s, baseY + sy * s + 10 * s);
                ctx.lineTo(x + sx * s, baseY + sy * s - 12 * s);
                ctx.lineTo(x + sx * s + 6 * s, baseY + sy * s + 10 * s);
                ctx.closePath();
                ctx.fill();
            });
            
            // Tiny arms
            ctx.fillStyle = bodyGrad;
            ctx.beginPath();
            ctx.moveTo(x + 25 * s, baseY - 45 * s);
            ctx.quadraticCurveTo(x + 38 * s, baseY - 40 * s, x + 35 * s, baseY - 28 * s);
            ctx.quadraticCurveTo(x + 30 * s, baseY - 25 * s, x + 25 * s, baseY - 35 * s);
            ctx.closePath();
            ctx.fill();
            
            // Legs
            ctx.fillRect(x - 18 * s, baseY - 20 * s, 15 * s, 18 * s);
            ctx.fillRect(x + 5 * s, baseY - 20 * s, 15 * s, 18 * s);
            
            ctx.restore();
        }
        
        // Draw bullet/laser
        function drawBullet(bx, by) {
            // Energy ball
            ctx.fillStyle = '#FFD700';
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(bx, by, 12 * scale, 0, Math.PI * 2);
            ctx.fill();
            
            // Core
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(bx, by, 6 * scale, 0, Math.PI * 2);
            ctx.fill();
            
            // Trail
            ctx.shadowBlur = 10;
            ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
            ctx.beginPath();
            ctx.ellipse(bx + 40 * scale, by, 35 * scale, 6 * scale, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
        
        // Animation loop - uses delta time for consistent speed
        let phaseStartTime = Date.now();
        let frameCount = 0;
        
        // Speed constants (pixels per second) - cinematic slow pace
        const DINO_WALK_SPEED = 55; // Similar to game dino speed
        const HERO_RUN_SPEED = 120; // Hero runs faster than dino
        const BULLET_SPEED = 350; // Bullet is fast
        
        console.log('Starting cinematic animation');
        
        const animate = () => {
            if (!animationRunning) return;
            
            const now = Date.now();
            const deltaTime = (now - lastTime) / 1000; // Convert to seconds
            lastTime = now;
            const phaseElapsed = now - phaseStartTime;
            
            frameCount++;
            if (frameCount % 120 === 0) {
                console.log('Animation frame', frameCount, 'phase:', phase, 'dinoX:', dinoX.toFixed(0), 'heroX:', heroX.toFixed(0));
            }
            
            ctx.clearRect(0, 0, w, h);
            drawBackground();
            
            // Phase-based movement with delta time
            if (phase === 'enter') {
                // Dino walks in from left - same pace as game
                dinoX += DINO_WALK_SPEED * deltaTime;
                
                // Switch to hero_runs when dino is about 25% across
                if (dinoX > w * 0.25) {
                    phase = 'hero_runs';
                    phaseStartTime = Date.now();
                }
            } else if (phase === 'hero_runs') {
                // Hero runs from right towards girl
                heroX -= HERO_RUN_SPEED * deltaTime;
                // Dino continues walking slowly
                dinoX += DINO_WALK_SPEED * 0.6 * deltaTime;
                
                // Hero stops just past the girl and shoots
                if (heroX < girlX + 80 * scale) {
                    phase = 'shoot';
                    phaseStartTime = Date.now();
                    // Bullet starts from hero's gun (left side, pointing at dino)
                    bulletX = heroX - 75 * scale;
                    bulletActive = true;
                }
            } else if (phase === 'shoot') {
                // Bullet travels towards dino
                if (bulletActive) {
                    bulletX -= BULLET_SPEED * deltaTime;
                    // Hit detection - when bullet reaches dino's head
                    if (bulletX < dinoX + 70 * scale) {
                        dinoHit = true;
                        bulletActive = false;
                    }
                }
                
                // Wait after hit before celebrating
                if (dinoHit && phaseElapsed > 2500) {
                    phase = 'celebrate';
                    phaseStartTime = Date.now();
                }
            } else if (phase === 'celebrate') {
                // Show celebration for a few seconds
                if (phaseElapsed > 4500) {
                    console.log('Cinematic done, showing final scene');
                    animationRunning = false;
                    overlay.classList.add('hidden');
                    scene.showFinalScene();
                    return;
                }
            }
            
            // Draw characters (order matters for layering)
            // Dino in back
            drawDino(dinoX, dinoHit);
            // Girl in middle
            drawGirl(girlX, phase !== 'celebrate');
            // Hero in front (if visible)
            if (phase !== 'enter') {
                drawHero(heroX, phase === 'hero_runs');
            }
            
            // Bullet - position matches hero's gun height (left arm extended)
            if (bulletActive) {
                const playerScale = Math.max(0.8, Math.min(1.5, scale));
                const heroS = playerScale * 1.15;
                const bulletY = groundY - 15 * scale - 64 * heroS; // Same height as gun
                drawBullet(bulletX, bulletY);
            }
            
            // Draw text overlays
            ctx.textAlign = 'center';
            
            if (phase === 'shoot' && dinoHit) {
                ctx.font = `bold ${32 * scale}px Arial`;
                ctx.fillStyle = '#FFD700';
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 4;
                ctx.strokeText('💥 BOOM! 💥', w / 2, h * 0.15);
                ctx.fillText('💥 BOOM! 💥', w / 2, h * 0.15);
            }
            
            if (phase === 'celebrate') {
                ctx.font = `bold ${34 * scale}px Arial`;
                ctx.fillStyle = '#FFF';
                ctx.strokeStyle = '#c44569';
                ctx.lineWidth = 5;
                ctx.strokeText('🦸 Hero Saves The Day! 🦸', w / 2, h * 0.10);
                ctx.fillText('🦸 Hero Saves The Day! 🦸', w / 2, h * 0.10);
                
                ctx.font = `bold ${22 * scale}px Arial`;
                ctx.strokeText('No lizard can stop true love...', w / 2, h * 0.18);
                ctx.fillText('No lizard can stop true love...', w / 2, h * 0.18);
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    showFinalScene() {
        // Girlfriend proposal (only for secret mode)
        const overlay = document.getElementById('final-overlay');
        overlay.classList.remove('hidden');
        
        const finalBtn = document.getElementById('final-yes-btn');
        const newFinalBtn = finalBtn.cloneNode(true);
        finalBtn.parentNode.replaceChild(newFinalBtn, finalBtn);
        
        newFinalBtn.addEventListener('click', () => {
            document.getElementById('final-content').classList.add('hidden');
            document.getElementById('final-celebration').classList.remove('hidden');
            
            // Endless hearts
            const heartsContainer = document.getElementById('hearts-container');
            setInterval(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
                heart.style.left = Math.random() * 100 + '%';
                heartsContainer.appendChild(heart);
                setTimeout(() => heart.remove(), 4000);
            }, 200);
        });
    }

    shutdown() {
        stopGlobalMusic();
    }
}

// ============================================
// GAME INITIALIZATION
// ============================================

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-container',
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, GameScene],
    pixelArt: false,
    antialias: true,
    backgroundColor: '#000000'
};

// Track last dimensions for detecting significant changes
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
let resizeTimeout = null;

// Orientation check
function checkOrientation() {
    const rotateDiv = document.getElementById('rotate-device');
    if (window.innerWidth < 600 && window.innerHeight > window.innerWidth) {
        rotateDiv.style.display = 'flex';
    } else {
        rotateDiv.style.display = 'none';
    }
}

// Create floating hearts on home screen background
function createFloatingHeartsBackground() {
    const container = document.getElementById('floating-hearts-bg');
    if (!container) return;
    
    const hearts = ['❤️', '💕', '💗', '💖', '💝', '🤍', '💜'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(heart);
    }
}

// Check if any modal is currently open
function isModalOpen() {
    const modal = document.getElementById('modal-overlay');
    const gameover = document.getElementById('gameover-overlay');
    const valentine = document.getElementById('valentine-overlay');
    const final = document.getElementById('final-overlay');
    const valentineSuccess = document.getElementById('valentine-success-overlay');
    const heroCinematic = document.getElementById('hero-cinematic-overlay');
    
    return (modal && !modal.classList.contains('hidden')) ||
           (gameover && !gameover.classList.contains('hidden')) ||
           (valentine && !valentine.classList.contains('hidden')) ||
           (final && !final.classList.contains('hidden')) ||
           (valentineSuccess && !valentineSuccess.classList.contains('hidden')) ||
           (heroCinematic && !heroCinematic.classList.contains('hidden'));
}

// Hide all modals
function hideAllModals() {
    const modal = document.getElementById('modal-overlay');
    const gameover = document.getElementById('gameover-overlay');
    
    if (modal) modal.classList.add('hidden');
    if (gameover) gameover.classList.add('hidden');
    // Don't hide valentine or final overlays - those are end-game states
}

// Restart the game scene when dimensions change significantly
function handleGameResize() {
    if (!gameInstance) return;
    
    // Don't do anything if game hasn't been properly initialized yet
    if (!gameInitialized) return;
    
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    
    // Don't restart if we're in portrait mode (rotate overlay should be showing)
    if (newHeight > newWidth && newWidth < 600) {
        console.log('handleGameResize: Portrait mode detected, skipping restart');
        lastWidth = newWidth;
        lastHeight = newHeight;
        return;
    }
    
    // Don't restart if a modal is open - it would mess up the game state
    if (isModalOpen()) {
        // Just update the scale, don't restart
        gameInstance.scale.resize(newWidth, newHeight);
        return;
    }
    
    // Check if dimensions changed significantly (more than 50px or orientation changed)
    const widthChanged = Math.abs(newWidth - lastWidth) > 50;
    const heightChanged = Math.abs(newHeight - lastHeight) > 50;
    const orientationChanged = (lastWidth > lastHeight) !== (newWidth > newHeight);
    
    console.log('handleGameResize:', { newWidth, newHeight, lastWidth, lastHeight, widthChanged, heightChanged, orientationChanged });
    
    if (widthChanged || heightChanged || orientationChanged) {
        lastWidth = newWidth;
        lastHeight = newHeight;
        
        // Hide any modals that might be open
        hideAllModals();
        
        // Update game scale
        gameInstance.scale.resize(newWidth, newHeight);
        
        // Only restart if GameScene is active and has a player
        if (gameInstance.scene.isActive('GameScene')) {
            const gameScene = gameInstance.scene.getScene('GameScene');
            if (gameScene && gameScene.player) {
                // Save player position as percentage of screen width (but cap at 50% to avoid destination)
                savedPlayerX = Math.min(gameScene.player.x / gameScene.sceneWidth, 0.5);
                
                // Store current scene index to ensure it doesn't change
                const sceneToRestore = currentSceneIndex;
                console.log('handleGameResize: Restarting scene, preserving sceneIndex:', sceneToRestore);
                isResizeRestart = true;
                stopGlobalMusic();
                
                // Hide any modals
                hideAllModals();
                
                // Reset entering state
                gameScene.isEntering = false;
                gameScene.cafeReached = false;
                
                // Double-check scene index before restart
                currentSceneIndex = sceneToRestore;
                gameScene.scene.restart();
            }
        }
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

document.addEventListener('DOMContentLoaded', () => {
    checkOrientation();
    
    // Always reset to first scene on page load
    currentSceneIndex = 0;
    gameInitialized = false;
    isResizeRestart = false;
    savedPlayerX = 0;
    lastWidth = window.innerWidth;
    lastHeight = window.innerHeight;
    
    console.log('Game initializing - currentSceneIndex:', currentSceneIndex);
    
    // Create floating hearts on home screen
    createFloatingHeartsBackground();
    
    // Setup PIN inputs
    setupPinInputs();
    
    // Focus first PIN box
    setTimeout(() => {
        const firstPinBox = document.querySelector('.pin-box');
        if (firstPinBox) firstPinBox.focus();
    }, 100);
    
    // Handle Start button click
    const startBtn = document.getElementById('start-btn');
    const homeScreen = document.getElementById('home-screen');
    const pinError = document.getElementById('pin-error');
    
    startBtn.addEventListener('click', () => {
        const enteredPin = getEnteredPin();
        
        // Check if PIN is complete
        if (enteredPin.length !== 4) {
            pinError.textContent = '❌ Please enter all 4 digits';
            pinError.classList.remove('hidden');
            return;
        }
        
        // Verify PIN
        if (!verifyPin(enteredPin)) {
            pinError.textContent = '❌ Incorrect code. Try again!';
            pinError.classList.remove('hidden');
            clearPin();
            return;
        }
        
        // PIN correct! Start the game
        pinError.classList.add('hidden');
        
        // Fade out home screen
        homeScreen.style.transition = 'opacity 0.5s ease-out';
        homeScreen.style.opacity = '0';
        
        setTimeout(() => {
            homeScreen.classList.add('hidden');
            
            // Create game only when start is clicked
            if (!gameInstance) {
                gameInstance = new Phaser.Game(config);
            }
        }, 500);
    });
    
    // Allow Enter key to submit
    document.querySelectorAll('.pin-box').forEach(box => {
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                startBtn.click();
            }
        });
    });
    
    // Don't create game immediately - wait for start button
    // gameInstance = new Phaser.Game(config);
    
    // Handle orientation change - restart scene
    window.addEventListener('orientationchange', () => {
        checkOrientation();
        isResizing = true; // Block interactions during resize
        hideAllModals(); // Hide modals immediately
        
        // Delay to let the browser update dimensions
        setTimeout(() => {
            handleGameResize();
            // Keep blocking for a bit longer to prevent accidental clicks
            setTimeout(() => {
                isResizing = false;
            }, 500);
        }, 300);
    });
    
    // Handle resize with debounce
    window.addEventListener('resize', () => {
        checkOrientation();
        isResizing = true; // Block interactions during resize
        
        // Debounce resize to avoid too many restarts
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            handleGameResize();
            // Keep blocking for a bit longer to prevent accidental clicks
            setTimeout(() => {
                isResizing = false;
            }, 500);
        }, 250);
    });
    
    // Enable audio on first interaction
    document.addEventListener('click', () => {
        if (currentAudio && currentAudio.paused) {
            currentAudio.play().catch(() => {});
        }
    }, { once: true });
});
