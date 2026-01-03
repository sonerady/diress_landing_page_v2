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
    '/assets/center_image_2.png'            // Scene 4 (index 4) - same as Scene 0
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

// Customize Model Sub-steps
const subSteps = [
    { label: 'Hair Style', subtitle: 'Sculpt & Define', description: 'Binlerce premium saç stili arasından markanızın estetiğine en uygun olanı seçin veya yapay zeka ile hayalinizdeki formu oluşturun.' },
    { label: 'Hair Color', subtitle: 'Chrome & Pigment', description: 'Doğal tonlardan deneysel pigmentlere kadar uzanan geniş renk yelpazesi ile modelinizin saç rengini kusursuz bir hassasiyetle belirleyin.' },
    { label: 'Skin Tone', subtitle: 'Natural Radiance', description: 'Küresel kitlelere hitap etmek için modelinizin cilt tonunu en gerçekçi ve kapsayıcı şekilde kişiselleştirin.' },
    { label: 'Ethnicity', subtitle: 'Global Diversity', description: 'Hedef pazarınıza tam uyum sağlamak için modelinizin yüz hatlarını ve etnik kökenini yapay zeka yardımıyla detaylandırın.' },
    { label: 'Mood', subtitle: 'Expressions & Vibes', description: 'Kampanya ruhunuzu yansıtacak en doğru ifadeyi; enerjik, sofistike veya dingin modlar arasından belirleyin.' },
    { label: 'Body Shape', subtitle: 'Silhouette & Form', description: 'Kıyafetlerin formunu en iyi şekilde sergilemek için modelinizin vücut hatlarını ve duruşunu ideal oranlara getirin.' }
];
let currentSubStep = 0;

// Retouch Slider Data (Step 4) - Local Assets
// Before images: amateur-products-2 folder (.png)
// After images: results-products-2 folder (.JPG)
const retouchImages = [
    { before: '/assets/amateur-products-2/amateur-before-0.png', after: '/assets/results-products-2/amateur-after-0.JPG' },
    { before: '/assets/amateur-products-2/amateur-before-1.png', after: '/assets/results-products-2/amateur-after-1.JPG' },
    { before: '/assets/amateur-products-2/amateur-before-2.png', after: '/assets/results-products-2/amateur-after-2.JPG' },
    { before: '/assets/amateur-products-2/amateur-before-3.png', after: '/assets/results-products-2/amateur-after-3.JPG' },
    { before: '/assets/amateur-products-2/amateur-before-5.png', after: '/assets/results-products-2/amateur-after-5.JPG' },
    { before: '/assets/amateur-products-2/amateur-before-6.png', after: '/assets/results-products-2/amateur-after-6.JPG' }
];

// Ecommerce Slider Data (Step 2)
const ecommerceSlides = [
    { label: 'Editorial Style', src: '/assets/editorial_1.png', alt: 'Editorial 1' },
    { label: 'Editorial Style', src: '/assets/editorial_2.png', alt: 'Editorial 2' },
    { label: 'Editorial Style', src: '/assets/editorial_3.png', alt: 'Editorial 3' },
    { label: 'Studio Style', src: '/assets/white_studio_2.png', alt: 'White Studio' },
    { label: 'Product Detail', src: '/assets/detail_product.png', alt: 'Detail Product' },
    { label: 'Ghost Mannequin', src: '/assets/ghost_mannequin.png', alt: 'Ghost Mannequin' }
];

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Render slider with randomized images
function renderEcommerceSlider() {
    const slider = document.getElementById('results-slider');
    if (!slider) return;

    const shuffled = shuffleArray(ecommerceSlides);
    // Double for seamless loop
    const allSlides = [...shuffled, ...shuffled];

    slider.innerHTML = allSlides.map(slide => `
        <div class="result-slide">
            <span class="slide-label">${slide.label}</span>
            <img src="${slide.src}" alt="${slide.alt}">
        </div>
    `).join('');
}

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

// Video element for Scene 3
const videoElement3 = document.createElement('video');
videoElement3.src = '/assets/center_image_scene_3.mp4';
videoElement3.loop = true;
videoElement3.muted = true;
videoElement3.playsInline = true;
videoElement3.crossOrigin = 'anonymous';
videoElement3.load();

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

const videoTexture3 = new THREE.VideoTexture(videoElement3);
videoTexture3.minFilter = THREE.LinearFilter;
videoTexture3.magFilter = THREE.LinearFilter;
videoTexture3.format = THREE.RGBAFormat;
videoTexture3.generateMipmaps = false;

// Load textures - Scene 1, 2, 3 use video, others use images
const textures = scenes.map((url, index) => {
    if (index === 1) {
        return videoTexture1;
    } else if (index === 2) {
        return videoTexture2;
    } else if (index === 3) {
        return videoTexture3;
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
scene.add(gradientPlane);

const textPlane = new THREE.Mesh(textGeometry, textMaterial);
textPlane.position.z = 0.05; // FRONT of Gradient (0.02)
textPlane.position.y = 0.65; // Moved even further up
textPlane.position.x = 0.02; // Slightly to the right
textPlane.scale.set(0.8, 1.1, 1); // Stretched Y to fix squashed look
scene.add(textPlane);

function getScale(image, sceneIndex = null) {
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

// Retouch Carousel Setup
const retouchGroup = new THREE.Group();
scene.add(retouchGroup);
retouchGroup.visible = false;

const retouchVertexShader = `
varying vec2 vUv;
varying vec3 vWorldPosition;
void main() {
    vUv = uv;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const retouchFragmentShader = `
uniform sampler2D tBefore;
uniform sampler2D tAfter;
uniform vec3 borderColor;
uniform float borderWidth;
uniform float cornerRadius;
varying vec2 vUv;
varying vec3 vWorldPosition;

// Rounded rectangle SDF
float roundedRect(vec2 uv, vec2 size, float radius) {
    vec2 d = abs(uv - 0.5) * 2.0 - size + radius;
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
}

void main() {
    // Rounded corners - discard pixels outside rounded rect
    float dist = roundedRect(vUv, vec2(1.0), cornerRadius);
    if (dist > 0.0) {
        discard;
    }

    // Use UV directly - the geometry itself handles aspect ratio
    vec4 colorBefore = texture2D(tBefore, vUv);
    vec4 colorAfter = texture2D(tAfter, vUv);

    vec4 finalColor;
    // Left side = Before, Right side = After
    if (vWorldPosition.x < 0.0) {
        finalColor = colorBefore;
    } else {
        finalColor = colorAfter;
    }

    // Subtle border near the edge
    float borderDist = -dist;
    float borderMask = smoothstep(borderWidth, borderWidth * 0.5, borderDist);

    // Very subtle border blend
    finalColor = mix(finalColor, vec4(borderColor, 1.0), borderMask * 0.08);

    gl_FragColor = finalColor;
}
`;

const retouchPlanes = [];
const textureLoader = new THREE.TextureLoader();

// Card size will be calculated based on screen aspect ratio
let retouchCardSize = 0.65; // Slightly larger card size
let retouchGap = 0.2;

function createRetouchCarousel() {
    // Clear existing planes
    retouchPlanes.forEach(p => retouchGroup.remove(p));
    retouchPlanes.length = 0;

    // Calculate aspect ratio to make cards appear square on screen
    const screenAspect = artWrapper.clientWidth / artWrapper.clientHeight;

    // Card dimensions - make height taller to compensate for wide screens
    const cardWidth = retouchCardSize;
    const cardHeight = retouchCardSize * screenAspect; // Compensate for screen aspect ratio
    retouchGap = cardWidth * 0.3;

    retouchImages.forEach((data, i) => {
        const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight);

        // Load textures with proper settings
        const beforeTexture = textureLoader.load(data.before);
        const afterTexture = textureLoader.load(data.after);

        beforeTexture.minFilter = THREE.LinearFilter;
        beforeTexture.magFilter = THREE.LinearFilter;
        afterTexture.minFilter = THREE.LinearFilter;
        afterTexture.magFilter = THREE.LinearFilter;

        const material = new THREE.ShaderMaterial({
            uniforms: {
                tBefore: { value: beforeTexture },
                tAfter: { value: afterTexture },
                borderColor: { value: new THREE.Color(0x000000) },
                borderWidth: { value: 0.02 },
                cornerRadius: { value: 0.08 } // Rounded corners
            },
            vertexShader: retouchVertexShader,
            fragmentShader: retouchFragmentShader,
            transparent: true
        });

        const plane = new THREE.Mesh(geometry, material);
        plane.position.x = (i - retouchImages.length / 2) * (cardWidth + retouchGap);
        plane.position.z = 1.0;
        retouchPlanes.push(plane);
        retouchGroup.add(plane);
    });
}
createRetouchCarousel();

// Recreate carousel on resize to maintain square aspect
window.addEventListener('resize', () => {
    if (currentStep === 4) {
        createRetouchCarousel();
    }
});

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
    // Parallax logic for Step 0 and Step 1
    if ((hasForeground || currentScene === 0) && (currentStep === 0 || currentStep === 1)) {
        // Parallax update
        if (!isParallaxLocked && currentScene > 0) {
            smoothedMouse.x += (mouseX - smoothedMouse.x) * 0.05;
            smoothedMouse.y += (mouseY - smoothedMouse.y) * 0.05;

            uniforms.uvOffset.value.x = smoothedMouse.x * parallaxStrength.background;
            uniforms.uvOffset.value.y = smoothedMouse.y * parallaxStrength.background;

            foregroundPlane.position.x = smoothedMouse.x * parallaxStrength.foreground;
            foregroundPlane.position.y = smoothedMouse.y * parallaxStrength.foreground;

            if (textPlane) {
                const textParallaxFactor = 0.08;
                textPlane.position.x = 0.02 + (smoothedMouse.x * textParallaxFactor);
                textPlane.position.y = 0.65 + (smoothedMouse.y * textParallaxFactor);
            }
        } else {
            // Reset positions when locked or scene 0
            uniforms.uvOffset.value.x = 0;
            uniforms.uvOffset.value.y = 0;
            foregroundPlane.position.x = 0;
            foregroundPlane.position.y = 0;

            if (textPlane) {
                textPlane.position.x = 0.02;
                textPlane.position.y = 0.65;
            }
        }
    }

    // Retouch Carousel Animation
    if (currentStep === 4) {
        retouchGroup.visible = true;
        plane.visible = false; // Hide ONLY in Retouch step
        if (textPlane) textPlane.visible = false;

        const stepSize = retouchCardSize + retouchGap;
        const totalWidth = retouchImages.length * stepSize;
        const speed = 0.0015; // Smooth slow speed

        retouchPlanes.forEach(p => {
            p.position.x += speed;
            // Loop back seamlessly from right to left
            if (p.position.x > totalWidth / 2) {
                p.position.x -= totalWidth;
            }
        });
    } else {
        retouchGroup.visible = false;
        plane.visible = true; // Ensure it's visible in ALL other steps
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
        uniforms.uvScale1.value.copy(getScale(uniforms.texture1.value.image, currentScene));
        uniforms.progress.value = 0;
    }

    uniforms.texture2.value = nextTexture;
    uniforms.uvScale2.value.copy(getScale(nextTexture.image, index));
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

    // Video playback control for Scene 1, 2, and 3
    if (index === 1) {
        videoElement1.play().catch(e => console.log('Video 1 autoplay blocked:', e));
        videoElement2.pause();
        videoElement3.pause();
    } else if (index === 2) {
        videoElement2.play().catch(e => console.log('Video 2 autoplay blocked:', e));
        videoElement1.pause();
        videoElement3.pause();
    } else if (index === 3) {
        videoElement3.play().catch(e => console.log('Video 3 autoplay blocked:', e));
        videoElement1.pause();
        videoElement2.pause();
    } else {
        videoElement1.pause();
        videoElement2.pause();
        videoElement3.pause();
    }

    updateUI();
}

// UI
function updateUI() {
    mainContainer.className = `main-container step-${currentStep} scene-${currentScene}`;

    // Control foreground layer visibility for scenes with foreground
    const hasForeground = foregroundImages[currentScene] !== null;
    if (hasForeground && (currentStep === 0 || currentStep === 1)) {
        foregroundMaterial.opacity = 1;
    } else {
        foregroundMaterial.opacity = 0;
    }

    // Toggle DIRESS Text Plane and Gradient Plane
    if ((currentStep === 0 || currentStep === 1) && currentScene > 0) {
        // Show only in Scenes 1, 2, 3 (not Scene 0 in Step 0)
        textPlane.visible = true;
        gradientPlane.visible = true; // RE-ENABLED
        textPlane.material.color.setHex(0xffffff);
        textPlane.position.z = 0.05;
        textPlane.renderOrder = 1;
    } else {
        textPlane.visible = false;
        gradientPlane.visible = false;
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
            else if (currentStep === 1) transitionToScene(1);
            else if (currentStep === 3) transitionToScene(4);
            updateUI();
        };
        verticalSlider.appendChild(item);
        if (index < steps.length - 1) {
            const line = document.createElement('div');
            line.className = `step-line ${index < currentStep ? 'completed' : ''}`;
            verticalSlider.appendChild(line);
        }
    });

    renderSubSteps();
}

function renderSubSteps() {
    const subMenu = document.getElementById('customize-submenu');
    if (!subMenu) return;

    // We keep the arrow from HTML, but refresh the card content
    const card = subMenu.querySelector('.submenu-card');
    if (!card) return;

    card.innerHTML = '';
    subSteps.forEach((sub, index) => {
        const isActive = currentSubStep === index;
        const item = document.createElement('div');
        item.className = `submenu-dot-item ${isActive ? 'active' : ''} ${index < currentSubStep ? 'completed' : ''}`;
        item.innerHTML = `
            <span class="sub-dot"></span>
            <div class="sub-text-wrapper">
                <span class="sub-label">${isActive ? 'Change ' : ''}${sub.label}</span>
                <span class="sub-subtitle">${sub.subtitle}</span>
                ${isActive ? `<p class="sub-inline-description animate-text-in">${sub.description}</p>` : ''}
            </div>
        `;
        item.onclick = (e) => {
            e.stopPropagation();
            currentSubStep = index;
            updateUI();
        };
        card.appendChild(item);

        if (index < subSteps.length - 1) {
            const line = document.createElement('div');
            line.className = `sub-line ${index < currentSubStep ? 'completed' : ''}`;
            card.appendChild(line);
        }
    });

    updateSubStepContent();
}

function updateSubStepContent() {
    const rightContent = document.getElementById('customize-content-right');
    if (rightContent) {
        rightContent.classList.remove('active');
        rightContent.style.display = 'none'; // Ensure it's hidden
    }
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
            // Scroll down
            if (currentStep === 0 && currentScene === 0) {
                // From Virtual Model to Select Scene (Step 1)
                currentStep = 1;
                transitionToScene(1);
            } else if (currentStep === 1 && currentScene < 3) {
                // Through scenes 1->2->3 within Step 1
                transitionToScene(currentScene + 1);
            } else if (currentStep === 1 && currentScene === 3) {
                // From Scene 3 to Ecommerce Kits (Step 2)
                currentStep = 2;
                updateUI();
            } else if (currentStep === 2) {
                // To Customize Model (Step 3)
                currentStep = 3;
                currentSubStep = 0;
                transitionToScene(4);
            } else if (currentStep === 3) {
                if (currentSubStep < subSteps.length - 1) {
                    currentSubStep++;
                    updateUI();
                } else {
                    currentStep = 4;
                    currentSubStep = 0;
                    updateUI();
                }
            } else {
                currentStep = Math.min(currentStep + 1, steps.length - 1);
                updateUI();
            }
        } else {
            // Scroll up
            if (currentStep === 1 && currentScene === 1) {
                currentStep = 0;
                transitionToScene(0);
            } else if (currentStep === 1 && currentScene > 1) {
                transitionToScene(currentScene - 1);
            } else if (currentStep === 2) {
                currentStep = 1;
                transitionToScene(3);
            } else if (currentStep === 3) {
                if (currentSubStep > 0) {
                    currentSubStep--;
                    updateUI();
                } else {
                    currentStep = 2;
                    updateUI();
                }
            } else {
                currentStep = Math.max(currentStep - 1, 0);
                if (currentStep === 0) transitionToScene(0);
                updateUI();
            }
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

// Ecommerce Loading Animation
let isEcommerceAnimating = false;

function playEcommerceLoadingAnimation() {
    if (isEcommerceAnimating) return;
    isEcommerceAnimating = true;

    const loadingOverlay = document.getElementById('ecommerce-loading');
    const promptText = document.getElementById('prompt-text');
    const generateBtn = document.getElementById('generate-btn');
    const spinner = document.getElementById('loading-spinner');
    const content = document.getElementById('ecommerce-content');

    const text = "Generate all essential visuals for your e-commerce";
    let index = 0;

    // Reset state for every playback
    promptText.textContent = '';
    generateBtn.style.display = 'inline-flex'; // Reset display from none
    generateBtn.classList.remove('visible', 'clicked');
    spinner.classList.remove('visible');
    content.classList.remove('visible');
    loadingOverlay.classList.remove('hidden');

    // Typing animation
    function typeText() {
        if (index < text.length) {
            promptText.textContent += text[index];
            index++;
            setTimeout(typeText, 50);
        } else {
            // Show generate button after typing
            setTimeout(() => {
                generateBtn.classList.add('visible');

                // Auto-click button after 500ms
                setTimeout(() => {
                    generateBtn.classList.add('clicked');

                    // Show spinner after button click
                    setTimeout(() => {
                        generateBtn.style.display = 'none';
                        spinner.classList.add('visible');

                        // After 3 seconds, hide loading and show content
                        setTimeout(() => {
                            renderEcommerceSlider(); // Randomize slider images
                            loadingOverlay.classList.add('hidden');
                            content.classList.add('visible');
                            isEcommerceAnimating = false; // Allow next animation
                        }, 3000);
                    }, 300);
                }, 500);
            }, 300);
        }
    }

    // Start typing after a short delay
    setTimeout(typeText, 500);
}

// Watch for step changes to trigger animation
const originalUpdateUI = updateUI;
updateUI = function () {
    originalUpdateUI();
    if (currentStep === 2) {
        playEcommerceLoadingAnimation();
    }
};
