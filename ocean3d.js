// ===================== THREE.JS 3D OCEAN WAVE SIMULATION =====================
// Custom WebGL wave model that dynamically morphs between a calm turquoise sea
// and a chaotic red storm wave based on user interaction (hovering the hero card).

export function initOcean3D() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    
    // Camera Setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    camera.position.y = 2.2;

    // Renderer with optimized properties
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Low-poly geometry optimized for smooth CPU mathematical iterations (60FPS+)
    const segments = 42;
    const geometry = new THREE.PlaneGeometry(28, 28, segments, segments);
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x0E8A8A,       // var(--pacific-teal)
        emissive: 0x031c26,    // var(--deep-ocean)
        specular: 0xBFE7E3,    // var(--soft-aqua)
        shininess: 85,
        transparent: true,
        opacity: 0.45,
        wireframe: true,
        side: THREE.DoubleSide
    });
    
    const ocean = new THREE.Mesh(geometry, material);
    ocean.rotation.x = -Math.PI / 2.3;
    ocean.position.y = -1.2;
    scene.add(ocean);

    // Particle field representation of floating marine spray
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 350;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 18;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.035,
        color: 0xBFE7E3,
        transparent: true,
        opacity: 0.4
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting Configuration
    const ambientLight = new THREE.AmbientLight(0xBFE7E3, 0.45);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xFF6B4A, 1.2, 30);
    pointLight1.position.set(6, 6, 6);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x0E8A8A, 0.9, 30);
    pointLight2.position.set(-6, 4, -6);
    scene.add(pointLight2);

    // Track mouse coordinates
    let mouseX3D = 0, mouseY3D = 0;
    const handleMouseMove = (e) => {
        mouseX3D = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY3D = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize interactive mode state (stormMode handles real-time visual morphing)
    window.isStormMode = false;
    let waveAmplitude = 0.35;
    let waveFrequency = 0.45;
    let waveSpeed = 0.007;
    
    const calmColor = new THREE.Color(0x0E8A8A); // Calm turquoise
    const stormColor = new THREE.Color(0xFF6B4A); // Violent coral red
    const activeColor = calmColor.clone();

    // Animation Loop
    let time3D = 0;
    let frameId;
    
    function animate3D() {
        frameId = requestAnimationFrame(animate3D);

        // Smoothly interpolate (lerp) wave dimensions depending on state
        if (window.isStormMode) {
            waveAmplitude += (0.95 - waveAmplitude) * 0.05;
            waveFrequency += (0.85 - waveFrequency) * 0.05;
            waveSpeed += (0.022 - waveSpeed) * 0.05;
            activeColor.lerp(stormColor, 0.06);
        } else {
            waveAmplitude += (0.32 - waveAmplitude) * 0.05;
            waveFrequency += (0.42 - waveFrequency) * 0.05;
            waveSpeed += (0.007 - waveSpeed) * 0.05;
            activeColor.lerp(calmColor, 0.06);
        }

        // Apply updated color to material
        material.color.copy(activeColor);
        time3D += waveSpeed;

        // Wave calculation
        const positions = ocean.geometry.attributes.position;
        const count = positions.count;
        
        for (let i = 0; i < count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            
            // Standard compound wave equation
            const z = Math.sin(x * waveFrequency + time3D) * Math.cos(y * waveFrequency + time3D) * waveAmplitude;
            positions.setZ(i, z);
        }
        positions.needsUpdate = true;

        // Animate Camera slightly with mouse movement for depth parallax
        camera.position.x += (mouseX3D * 1.5 - camera.position.x) * 0.03;
        camera.position.y += (2.2 + mouseY3D * 0.6 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        // Rotate particles
        particlesMesh.rotation.y += window.isStormMode ? 0.006 : 0.001;
        particlesMesh.rotation.x += window.isStormMode ? 0.003 : 0.0005;

        renderer.render(scene, camera);
    }
    
    animate3D();

    // Handle Window Resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });
}
export default initOcean3D;
