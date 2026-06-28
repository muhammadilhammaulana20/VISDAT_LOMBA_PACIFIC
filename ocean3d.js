// ===================== THREE.JS 3D OCEAN WAVE SIMULATION =====================

export function initOcean3D() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2.5;

    // Renderer with optimized properties
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // OPTIMIZED: Reduce segments from 128x128 to 40x40. 
    // This reduces the vertex count from 16k+ to 1,600+ (10x reduction!)
    // rendering is smooth and CPU overhead inside requestAnimationFrame is negligible.
    const segments = 40;
    const geometry = new THREE.PlaneGeometry(28, 28, segments, segments);
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x0E8A8A,       // var(--pacific-teal)
        emissive: 0x042a38,    // var(--deep-ocean)
        specular: 0xBFE7E3,    // var(--soft-aqua)
        shininess: 90,
        transparent: true,
        opacity: 0.45,
        wireframe: true,
        side: THREE.DoubleSide
    });
    
    const ocean = new THREE.Mesh(geometry, material);
    ocean.rotation.x = -Math.PI / 2.3;
    ocean.position.y = -1.2;
    scene.add(ocean);

    // Optimized Particles (reducing particle count to 400 for higher FPS)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04,
        color: 0xBFE7E3,
        transparent: true,
        opacity: 0.4
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xBFE7E3, 0.4);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xFF6B4A, 1.2, 25);
    pointLight1.position.set(6, 6, 6);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x0E8A8A, 0.9, 25);
    pointLight2.position.set(-6, 4, -6);
    scene.add(pointLight2);

    // Mouse movement listeners
    let mouseX3D = 0, mouseY3D = 0;
    const handleMouseMove = (e) => {
        // Normalize mouse coordinates (-1 to 1)
        mouseX3D = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY3D = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let time3D = 0;
    let frameId;
    
    function animate3D() {
        frameId = requestAnimationFrame(animate3D);
        time3D += 0.008;

        // Wave math: very fast with 1.6k vertices instead of 16k
        const positions = ocean.geometry.attributes.position;
        const count = positions.count;
        
        for (let i = 0; i < count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            
            // Multiple layered sine waves for organic ocean motion
            const wave1 = Math.sin(x * 0.25 + time3D * 1.5) * 0.4;
            const wave2 = Math.sin(y * 0.20 + time3D * 1.2) * 0.3;
            const wave3 = Math.sin((x + y) * 0.15 + time3D * 2.0) * 0.2;
            
            positions.setZ(i, wave1 + wave2 + wave3);
        }
        positions.needsUpdate = true;

        // Rotate ambient particles
        particlesMesh.rotation.y = time3D * 0.03;
        particlesMesh.rotation.x = time3D * 0.01;

        // Smooth camera movement following the mouse (lerping)
        camera.position.x += (mouseX3D * 0.7 - camera.position.x) * 0.03;
        camera.position.y += (2.5 + mouseY3D * 0.5 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, -1);

        renderer.render(scene, camera);
    }
    
    animate3D();

    // Responsive Window Resize Handler
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup function when leaving the page or resetting
    return () => {
        cancelAnimationFrame(frameId);
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        geometry.dispose();
        material.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
    };
}
