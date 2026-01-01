import './style.css'
import * as THREE from 'three'

// State
let currentScene = 0;
let currentStep = 0;
const scenes = [
    '/assets/center_image_2.png',           // Scene 0 (index 0)
    '/assets/center_image_scene_1.png',     // Scene 1 (index 1)
    '/assets/center_image_scene_2.png',     // Scene 2 (index 2)
    '/assets/center_image_scene_3.png',     // Scene 3 (index 3)
    '/assets/center_image.png'              // Scene 4 (index 4) - original
];

// Foreground layers for parallax (Scene 1=1, Scene 2=2, Scene 3=3)
const foregroundImages = [
    null,                                                    // Scene 0
    '/assets/center_image_scene_1_front_people.png',         // Scene 1
    '/assets/center_image_scene_2_front_people.png',         // Scene 2
    '/assets/center_image_scene_3_front_people.png',         // Scene 3
    null                                                     // Scene 4
];
const steps = [
    'Virtual Model', 'Select Scene', 'Ecommerce Kits', 'Customize Model', 'Retouch', 'Change Color', 'Change Pose', 'Image to Video'
];
let isScrolling = false;

// Parallax State
let mouseX = 0;
let mouseY = 0;
// Smoothed mouse values for interpolation
let smoothedMouse = { x: 0, y: 0 };
// Flag to center parallax until user moves mouse after scene change
let isParallaxLocked = false;

const parallaxStrength = { background: 0.015, foreground: 0.04 };


// DOM Elements
const mainContainer = document.getElementById('main-container');
const scrollIndicator = document.getElementById('scroll-indicator');
const verticalSlider = document.getElementById('vertical-slider');
const magnifier = document.getElementById('magnifier');
const artWrapper = document.getElementById('art-wrapper');
const sceneSelector = document.getElementById('scene-selector');
const sceneThumbs = document.querySelectorAll('.scene-thumb');

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Insert canvas
artWrapper.appendChild(renderer.domElement);
const canvas = renderer.domElement;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '1'; // Behind gradients (50) and UI (100)

// Shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float progress;
uniform vec2 uvScale1;
uniform vec2 uvScale2;
uniform vec2 uvOffset; // Parallax Offset
varying vec2 vUv;

vec4 blur(sampler2D tex, vec2 uv, float amount) {
    vec4 color = vec4(0.0);
    float total = 0.0;
    float radius = amount * 0.02; 
    for (float x = -2.0; x <= 2.0; x++) {
        for (float y = -2.0; y <= 2.0; y++) {
            vec2 offset = vec2(x, y) * radius; 
            color += texture2D(tex, uv + offset);
            total += 1.0;
        }
    }
    return color / total;
}

void main() {
    float blurAmount = sin(progress * 3.14159);
    
    // Apply parallax offset
    vec2 offsetUV = vUv - uvOffset;

    vec2 correctedUV1 = (offsetUV - 0.5) * uvScale1 + 0.5;
    vec2 correctedUV2 = (offsetUV - 0.5) * uvScale2 + 0.5;

    vec4 col1 = blur(texture1, correctedUV1, blurAmount);
    vec4 col2 = blur(texture2, correctedUV2, blurAmount);
    
    gl_FragColor = mix(col1, col2, progress);
}
`;

// Texture Loader
const loader = new THREE.TextureLoader();

// Video element for Scene 1
const videoElement1 = document.createElement('video');
videoElement1.src = '/assets/center_image_scene_1.mp4';
videoElement1.loop = true;
videoElement1.muted = true;
videoElement1.playsInline = true;
videoElement1.crossOrigin = 'anonymous';
videoElement1.load();

// Video element for Scene 2
const videoElement2 = document.createElement('video');
videoElement2.src = '/assets/center_image_scene_2.mp4';
videoElement2.loop = true;
videoElement2.muted = true;
videoElement2.playsInline = true;
videoElement2.crossOrigin = 'anonymous';
videoElement2.load();

// Create VideoTextures
const videoTexture1 = new THREE.VideoTexture(videoElement1);
videoTexture1.minFilter = THREE.LinearFilter;
videoTexture1.magFilter = THREE.LinearFilter;
videoTexture1.format = THREE.RGBAFormat;
videoTexture1.generateMipmaps = false;

const videoTexture2 = new THREE.VideoTexture(videoElement2);
videoTexture2.minFilter = THREE.LinearFilter;
videoTexture2.magFilter = THREE.LinearFilter;
videoTexture2.format = THREE.RGBAFormat;
videoTexture2.generateMipmaps = false;

// Load textures - Scene 1 and 2 use video, others use images
const textures = scenes.map((url, index) => {
    if (index === 1) {
        return videoTexture1;
    } else if (index === 2) {
        return videoTexture2;
    } else {
        return loader.load(url, (tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
            updateAllUVScales();
        });
    }
});

// Geometry & Material
const geometry = new THREE.PlaneGeometry(2, 2);
const uniforms = {
    texture1: { value: textures[0] },
    texture2: { value: textures[0] },
    progress: { value: 0 },
    uvScale1: { value: new THREE.Vector2(1, 1) },
    uvScale2: { value: new THREE.Vector2(1, 1) },
    uvOffset: { value: new THREE.Vector2(0, 0) } // NEW
};
const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Foreground Plane for Scene 1 and 2 Parallax
const foregroundMaterial = new THREE.MeshBasicMaterial({
    map: null,
    transparent: true,
    opacity: 0, // Start hidden (Scene 0 is default)
    side: THREE.DoubleSide,
    depthTest: false,
    depthWrite: false,
    blending: THREE.NormalBlending,
    toneMapped: false
});

// Load all foreground textures
const foregroundTextures = [];
foregroundImages.forEach((url, index) => {
    if (url) {
        foregroundTextures[index] = loader.load(url, (tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
            tex.colorSpace = THREE.SRGBColorSpace;
            updateForegroundUVScale(); // Trigger resize when loaded
            console.log(`✅ Foreground texture ${index} loaded: ${url}`);
        });
    } else {
        foregroundTextures[index] = null;
    }
});

// Function to switch foreground texture based on scene
function updateForegroundTexture() {
    const fgTexture = foregroundTextures[currentScene];
    if (fgTexture) {
        foregroundMaterial.map = fgTexture;
        foregroundMaterial.needsUpdate = true;
        updateForegroundUVScale();
    }
}

console.log('🎭 Foreground system initialized for multiple scenes');

const foregroundPlane = new THREE.Mesh(geometry, foregroundMaterial);
foregroundPlane.position.z = 0.1;
foregroundPlane.renderOrder = 999;
scene.add(foregroundPlane);
console.log('🎭 Foreground plane added at z=0.1');

// Text Plane "DIRESS"
function createTextTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Text Style - Reduced size to prevent cut off if scaled down
    ctx.font = 'bold 300px "Playfair Display", serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)'; // Fully Opaque White
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '120px';

    // Draw Text - centered
    ctx.fillText('DIRESS', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    return texture;
}

const textGeometry = new THREE.PlaneGeometry(2, 1); // 2:1 aspect ratio
const textMaterial = new THREE.MeshBasicMaterial({
    map: createTextTexture(),
    transparent: true,
    opacity: 1,
    toneMapped: false,
    alphaTest: 0.01,
    side: THREE.DoubleSide
});

// Text Plane "DIRESS"
// ... (existing text code) ...

// Right Gradient Plane (for contrast behind Scene Text, but behind DIRESS)
function createGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');

    // Gradient: Transparent (Left) -> Black (Right)
    // To match CSS width: 50%, we can make the gradient start at 50%
    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)'); // Start fading from middle
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)'); // Dark at right edge

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 1);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    return texture;
}

const gradientGeometry = new THREE.PlaneGeometry(2, 2); // Full screen
const gradientMaterial = new THREE.MeshBasicMaterial({
    map: createGradientTexture(),
    transparent: true,
    opacity: 1,
    toneMapped: false,
    depthWrite: false
});

const gradientPlane = new THREE.Mesh(gradientGeometry, gradientMaterial);
gradientPlane.position.z = 0.02; // BEHIND Text (0.05) and FG (0.1), but FRONT of BG (0)
// scene.add(gradientPlane);

const textPlane = new THREE.Mesh(textGeometry, textMaterial);
textPlane.position.z = 0.05; // FRONT of Gradient (0.02)
textPlane.position.y = 0.65; // Moved even further up
textPlane.position.x = 0.02; // Slightly to the right
textPlane.scale.set(0.8, 1.1, 1); // Stretched Y to fix squashed look
scene.add(textPlane);

function getScale(image) {
    if (!image || !image.width) return new THREE.Vector2(1, 1);
    const screenAspect = artWrapper.clientWidth / artWrapper.clientHeight;
    const imageAspect = image.width / image.height;

    // Zoom in slightly (0.98) to leave room for parallax movement
    const zoom = 0.98;

    if (screenAspect > imageAspect) {
        return new THREE.Vector2(1 * zoom, (imageAspect / screenAspect) * zoom);
    } else {
        return new THREE.Vector2((screenAspect / imageAspect) * zoom, 1 * zoom);
    }
}

function updateAllUVScales() {
    // Current scene is always represented by the visible texture
    // If progress is at 0, texture1 is visible.
    // If progress is at 1, texture2 is visible.
    uniforms.uvScale1.value.copy(getScale(uniforms.texture1.value.image));
    uniforms.uvScale2.value.copy(getScale(uniforms.texture2.value.image));
}

function updateForegroundUVScale() {
    // Use the currently active foreground texture
    const fgTexture = foregroundTextures[currentScene];

    // Safety check: ensure texture and image data exist
    if (!fgTexture || !fgTexture.image || fgTexture.image.width === 0) return;

    const screenAspect = artWrapper.clientWidth / artWrapper.clientHeight;
    const imageAspect = fgTexture.image.width / fgTexture.image.height;

    // Calculate Cover Scale (simulating object-fit: cover)
    let scaleX, scaleY;
    if (screenAspect > imageAspect) {
        // Screen is wider than image
        // To cover, we must stretch width to match screen, and crop height
        // But in UV space, a smaller scale means "zooming in" / cropping
        scaleX = 1;
        scaleY = imageAspect / screenAspect;
    } else {
        // Screen is taller than image
        // To cover, we force height to match screen, and crop width
        scaleX = screenAspect / imageAspect;
        scaleY = 1;
    }

    // Apply the UV transform
    // scaleX/Y here represent "how much of the texture to show"
    // So 1 means full texture, <1 means cropped (zoomed in)
    fgTexture.repeat.set(scaleX, scaleY);

    // Center the crop
    fgTexture.offset.set((1 - scaleX) / 2, (1 - scaleY) / 2);

    fgTexture.needsUpdate = true;
    foregroundPlane.scale.set(1, 1, 1);
}

// Layout Handling
const resizeObserver = new ResizeObserver(() => {
    const width = artWrapper.clientWidth;
    const height = artWrapper.clientHeight;
    renderer.setSize(width, height);
    updateAllUVScales();
    updateForegroundUVScale();
    updateTextScale();
});
resizeObserver.observe(artWrapper);

// Handle Resize for Text Plane to prevent distortion
function updateTextScale() {
    if (!textPlane) return;
    const width = artWrapper.clientWidth;
    const height = artWrapper.clientHeight;
    // Prevent division by zero
    if (height === 0) return;

    // Calculate aspect based on artWrapper dimensions
    const aspect = width / height;

    // Maintain 2:1 visual aspect ratio regardless of screen shape
    // ScaleY is base (1.0), ScaleX must be adjusted by aspect to cancel camera stretch
    textPlane.scale.y = 1.0;
    textPlane.scale.x = textPlane.scale.y / aspect;
}

// Initial call
updateTextScale();
updateUI(); // Ensure correct initial state (Step 0, Scene 0)

// Animation
let targetProgress = 0;
function animate() {
    requestAnimationFrame(animate);

    // Update transition progress
    if (Math.abs(uniforms.progress.value - targetProgress) > 0.001) {
        uniforms.progress.value += (targetProgress - uniforms.progress.value) * 0.1;
    } else {
        uniforms.progress.value = targetProgress;
    }

    // Apply parallax offsets for scenes with foreground (Scene 1, 2, 3)
    const hasForeground = foregroundImages[currentScene] !== null;
    if ((hasForeground || currentScene === 0) && currentStep === 0) {
        // Determine target based on lock state
        const targetX = isParallaxLocked ? 0 : mouseX;
        const targetY = isParallaxLocked ? 0 : -mouseY; // Note: Inverted Y moved here for consistency

        // Smoothly interpolate current values to target (Lerp factor 0.05 for smooth feel)
        smoothedMouse.x += (targetX - smoothedMouse.x) * 0.05;
        smoothedMouse.y += (targetY - smoothedMouse.y) * 0.05;

        // Apply parallax via UV Offset for background plane (custom shader)
        uniforms.uvOffset.value.x = smoothedMouse.x * parallaxStrength.background;
        uniforms.uvOffset.value.y = smoothedMouse.y * parallaxStrength.background;

        foregroundPlane.position.x = smoothedMouse.x * parallaxStrength.foreground;
        foregroundPlane.position.y = smoothedMouse.y * parallaxStrength.foreground;

        // DIRESS Text Parallax (Opposite direction, lighter)
        if (textPlane) {
            const textParallaxFactor = -0.02; // Opposite direction
            textPlane.position.x = 0.02 + (smoothedMouse.x * textParallaxFactor);
            textPlane.position.y = 0.65 + (smoothedMouse.y * textParallaxFactor);
        }
    } else {
        // Reset positions when not in a parallax scene
        uniforms.uvOffset.value.x = 0;
        uniforms.uvOffset.value.y = 0;
        foregroundPlane.position.x = 0;
        foregroundPlane.position.y = 0;

        if (textPlane) {
            textPlane.position.x = 0.02;
            textPlane.position.y = 0.65;
        }
        // Also reset smoothed values so next time it starts from center
        smoothedMouse.x = 0;
        smoothedMouse.y = 0;
    }

    renderer.render(scene, camera);
}
animate();

// Transition
function transitionToScene(index) {
    if (index === currentScene) return;
    const nextTexture = textures[index];

    if (uniforms.progress.value > 0.5) {
        // Texture2 is currently dominant. Set Texture1 to current view and animate back to 0? 
        // No, let's just cycle.
        uniforms.texture1.value = uniforms.texture2.value;
        uniforms.uvScale1.value.copy(getScale(uniforms.texture1.value.image));
        uniforms.progress.value = 0;
    }

    uniforms.texture2.value = nextTexture;
    uniforms.uvScale2.value.copy(getScale(nextTexture.image));
    targetProgress = 1;

    currentScene = index;

    // Reset parallax to center until mouse moves
    isParallaxLocked = true;

    // Update foreground texture and show/hide for Scene 1 and 2
    updateForegroundTexture();
    const hasForeground = foregroundImages[currentScene] !== null;
    if (hasForeground && currentStep === 0) {
        foregroundMaterial.opacity = 1;
    } else {
        foregroundMaterial.opacity = 0;
    }

    // Video playback control for Scene 1 and Scene 2
    if (index === 1) {
        videoElement1.play().catch(e => console.log('Video 1 autoplay blocked:', e));
        videoElement2.pause();
    } else if (index === 2) {
        videoElement2.play().catch(e => console.log('Video 2 autoplay blocked:', e));
        videoElement1.pause();
    } else {
        videoElement1.pause();
        videoElement2.pause();
    }

    updateUI();
}

// UI
function updateUI() {
    mainContainer.className = `main-container step-${currentStep} scene-${currentScene}`;

    // Control foreground layer visibility for scenes with foreground
    const hasForeground = foregroundImages[currentScene] !== null;
    if (hasForeground && currentStep === 0) {
        foregroundMaterial.opacity = 1;
    } else {
        foregroundMaterial.opacity = 0;
    }

    // Toggle DIRESS Text Plane and Gradient Plane
    if (currentStep === 0 && currentScene > 0) {
        // Show only in Scenes 1, 2, 3 (not Scene 0)
        textPlane.visible = true;
        textPlane.material.color.setHex(0xffffff);
        textPlane.position.z = 0.05;
        textPlane.renderOrder = 1;
    } else {
        textPlane.visible = false;
    }

    if (currentStep > 0 || currentScene > 0) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
    renderSteps();
    updateSceneSelector();


}

// Scene Selector - Update active thumbnail
function updateSceneSelector() {
    sceneThumbs.forEach(thumb => {
        const sceneNum = parseInt(thumb.dataset.scene);
        if (sceneNum === currentScene) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Scene Selector - Click handlers
sceneThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const targetScene = parseInt(thumb.dataset.scene);
        if (targetScene !== currentScene && currentStep === 0) {
            transitionToScene(targetScene);
        }
    });
});

function renderSteps() {
    verticalSlider.innerHTML = '';
    steps.forEach((label, index) => {
        // Determine visual active state (separate from actual currentStep)
        // Scene 0 = highlight Virtual Model (index 0)
        // Scene 1-3 = highlight Select Scene (index 1)
        let isVisuallyActive = false;
        if (currentStep === 0) {
            if (currentScene === 0 && index === 0) isVisuallyActive = true;
            else if (currentScene > 0 && currentScene < 4 && index === 1) isVisuallyActive = true;
        } else {
            isVisuallyActive = (currentStep === index);
        }

        const item = document.createElement('div');
        item.className = `step-item ${isVisuallyActive ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`;
        item.innerHTML = `<span class="step-dot"></span><span class="step-label">${label}</span>`;
        item.onclick = () => {
            currentStep = index;
            if (currentStep === 0) transitionToScene(0);
            updateUI();
        };
        verticalSlider.appendChild(item);
        if (index < steps.length - 1) {
            const line = document.createElement('div');
            line.className = `step-line ${index < currentStep ? 'completed' : ''}`;
            verticalSlider.appendChild(line);
        }
    });
}
renderSteps();

// Mouse/Wheel
window.addEventListener('mousemove', (e) => {
    // Unlock parallax when user intentionally moves mouse
    isParallaxLocked = false;

    // Normalize mouse position to -1 to 1 range
    const rect = artWrapper.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
});

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    if (Math.abs(e.deltaY) > 15) {
        isScrolling = true;
        if (e.deltaY > 0) {
            // Scroll down: go to next scene (up to Scene 4)
            if (currentStep === 0 && currentScene < 4) transitionToScene(currentScene + 1);
            else { currentStep = Math.min(currentStep + 1, steps.length - 1); updateUI(); }
        } else {
            // Scroll up: go to previous scene
            if (currentStep === 0 && currentScene > 0) transitionToScene(currentScene - 1);
            else if (currentStep === 1) { currentStep = 0; transitionToScene(4); }
            else { currentStep = Math.max(currentStep - 1, 0); updateUI(); }
        }
        setTimeout(() => isScrolling = false, 800);
    }
});

// Auto-hover animation for model cards on page load
function startAutoHoverAnimation() {
    const gridCards = document.querySelectorAll('.grid-card');
    if (gridCards.length === 0) return;

    let currentIndex = 0;
    const animationDuration = 300; // ms per card

    function animateNext() {
        // Remove from all
        gridCards.forEach(card => card.classList.remove('auto-hovered'));

        // Add to current
        gridCards[currentIndex].classList.add('auto-hovered');

        currentIndex++;

        // Stop after one full cycle
        if (currentIndex < gridCards.length) {
            setTimeout(animateNext, animationDuration);
        } else {
            // Remove class from last card after animation
            setTimeout(() => {
                gridCards.forEach(card => card.classList.remove('auto-hovered'));
            }, animationDuration);
        }
    }

    // Start after a short delay
    setTimeout(animateNext, 500);
}

// Start animation when page loads
startAutoHoverAnimation();

