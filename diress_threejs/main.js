import './style.css'
import * as THREE from 'three'

// State
let currentScene = 0;
let currentStep = 0;
const scenes = [
    '/assets/center_image_2.png',
    '/assets/center_image_scene_1.png',
    '/assets/center_image.png',
    '/assets/center_image_scene_1_front_people.png' // Scene 1 foreground layer
];
const steps = [
    'Select Scene', 'Ecommerce Kits', 'Customize Model', 'Retouch', 'Change Color', 'Change Pose', 'Image to Video'
];
let isScrolling = false;

// Parallax State
let mouseX = 0;
let mouseY = 0;
const parallaxStrength = { background: 0.015, foreground: 0.04 };

// DOM Elements
const mainContainer = document.getElementById('main-container');
const scrollIndicator = document.getElementById('scroll-indicator');
const verticalSlider = document.getElementById('vertical-slider');
const magnifier = document.getElementById('magnifier');
const artWrapper = document.getElementById('art-wrapper');

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
    
    vec2 correctedUV1 = (vUv - 0.5) * uvScale1 + 0.5;
    vec2 correctedUV2 = (vUv - 0.5) * uvScale2 + 0.5;

    vec4 col1 = blur(texture1, correctedUV1, blurAmount);
    vec4 col2 = blur(texture2, correctedUV2, blurAmount);
    
    gl_FragColor = mix(col1, col2, progress);
}
`;

// Texture Loader
const loader = new THREE.TextureLoader();
const textures = scenes.map(url => loader.load(url, (tex) => {
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    updateAllUVScales();
}));

// Geometry & Material
const geometry = new THREE.PlaneGeometry(2, 2);
const uniforms = {
    texture1: { value: textures[0] },
    texture2: { value: textures[0] },
    progress: { value: 0 },
    uvScale1: { value: new THREE.Vector2(1, 1) },
    uvScale2: { value: new THREE.Vector2(1, 1) }
};
const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Foreground Plane for Scene 1 Parallax (using textures[3])
const foregroundMaterial = new THREE.MeshBasicMaterial({
    map: null, // Will be set to textures[3] after loading
    transparent: true,
    opacity: 0, // Start hidden (Scene 0 is default)
    side: THREE.DoubleSide,
    depthTest: false,
    depthWrite: false
    // No alphaTest - keep original colors
});

// Set foreground texture after it loads
setTimeout(() => {
    if (textures[3]) {
        foregroundMaterial.map = textures[3];
        foregroundMaterial.needsUpdate = true;
        console.log('✅ Foreground texture set from textures[3]');
        updateForegroundUVScale();
    }
}, 100);

console.log('🎭 Foreground material initialized (hidden by default)');

const foregroundPlane = new THREE.Mesh(geometry, foregroundMaterial);
foregroundPlane.position.z = 0.1; // In front of main (0), behind camera (5)
foregroundPlane.renderOrder = 999;
scene.add(foregroundPlane);
console.log('🎭 Foreground plane added at z=0.1');

function getScale(image) {
    if (!image || !image.width) return new THREE.Vector2(1, 1);
    const screenAspect = artWrapper.clientWidth / artWrapper.clientHeight;
    const imageAspect = image.width / image.height;

    if (screenAspect > imageAspect) {
        return new THREE.Vector2(1, imageAspect / screenAspect);
    } else {
        return new THREE.Vector2(screenAspect / imageAspect, 1);
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
    // Match the same UV scaling that the background shader uses
    const fgTexture = textures[3];
    if (!fgTexture || !fgTexture.image) return;

    const screenAspect = artWrapper.clientWidth / artWrapper.clientHeight;
    const imageAspect = fgTexture.image.width / fgTexture.image.height;

    let scaleX, scaleY;
    if (screenAspect > imageAspect) {
        // Screen is wider than image
        scaleX = 1;
        scaleY = imageAspect / screenAspect;
    } else {
        // Screen is taller than image
        scaleX = screenAspect / imageAspect;
        scaleY = 1;
    }

    // Apply UV scaling via texture repeat/offset (same as shader's correctedUV)
    fgTexture.repeat.set(scaleX, scaleY);
    fgTexture.offset.set((1 - scaleX) / 2, (1 - scaleY) / 2);
    fgTexture.needsUpdate = true;

    // Keep plane at full size (2x2), UV handles the rest
    foregroundPlane.scale.set(1, 1, 1);
}

// Layout Handling
const resizeObserver = new ResizeObserver(() => {
    const width = artWrapper.clientWidth;
    const height = artWrapper.clientHeight;
    renderer.setSize(width, height);
    updateAllUVScales();
    updateForegroundUVScale();
});
resizeObserver.observe(artWrapper);

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

    // Apply parallax offsets (only visible in Scene 1)
    if (currentScene === 1 && currentStep === 0) {
        plane.position.x = mouseX * parallaxStrength.background;
        plane.position.y = -mouseY * parallaxStrength.background;
        foregroundPlane.position.x = mouseX * parallaxStrength.foreground;
        foregroundPlane.position.y = -mouseY * parallaxStrength.foreground;
    } else {
        // Reset positions when not in Scene 1
        plane.position.x = 0;
        plane.position.y = 0;
        foregroundPlane.position.x = 0;
        foregroundPlane.position.y = 0;
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

    // Show/hide foreground plane for Scene 1
    if (currentScene === 1 && currentStep === 0) {
        foregroundMaterial.opacity = 1;
    } else {
        foregroundMaterial.opacity = 0;
    }

    updateUI();
}

// UI
function updateUI() {
    mainContainer.className = `main-container step-${currentStep} scene-${currentScene}`;

    // Control foreground layer visibility
    if (currentScene === 1 && currentStep === 0) {
        foregroundMaterial.opacity = 1;
    } else {
        foregroundMaterial.opacity = 0;
    }

    if (currentStep > 0 || currentScene > 0) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
    renderSteps();
    magnifier.style.backgroundImage = `url(${scenes[currentScene]})`;
}

function renderSteps() {
    verticalSlider.innerHTML = '';
    steps.forEach((label, index) => {
        const item = document.createElement('div');
        item.className = `step-item ${currentStep === index ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`;
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
            if (currentStep === 0 && currentScene < 2) transitionToScene(currentScene + 1);
            else { currentStep = Math.min(currentStep + 1, steps.length - 1); updateUI(); }
        } else {
            if (currentStep === 0 && currentScene > 0) transitionToScene(currentScene - 1);
            else if (currentStep === 1) { currentStep = 0; transitionToScene(2); }
            else { currentStep = Math.max(currentStep - 1, 0); updateUI(); }
        }
        setTimeout(() => isScrolling = false, 800);
    }
});

artWrapper.addEventListener('mousemove', (e) => {
    // Only enable magnifier for scene 0 (Select Scene) and when not scrolling
    if (currentScene !== 0 || isScrolling) {
        magnifier.style.display = 'none';
        return;
    }

    const { top, left, width, height } = artWrapper.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    const zoom = 3.5, offset = 90;

    if (x > 0 && y > 0 && x < width && y < height) {
        magnifier.style.display = 'block';
        magnifier.style.top = `${y - offset}px`;
        magnifier.style.left = `${x - offset}px`;
        magnifier.style.backgroundSize = `${width * zoom}px ${height * zoom}px`;
        magnifier.style.backgroundPosition = `-${x * zoom - offset}px -${y * zoom - offset}px`;
    } else magnifier.style.display = 'none';
});

artWrapper.addEventListener('mouseleave', () => magnifier.style.display = 'none');
