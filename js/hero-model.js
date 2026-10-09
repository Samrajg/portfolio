
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hero-model-container');
    if (!container || typeof THREE === 'undefined') return;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // CORE GROUP
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. INNER HACKER CUBE (Solid wireframe)
    const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const edges = new THREE.EdgesGeometry(boxGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 2 });
    const innerCube = new THREE.LineSegments(edges, lineMat);
    coreGroup.add(innerCube);

    // 2. MIDDLE SHELL (Glassy Icosahedron)
    const shellGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const shellMat = new THREE.MeshPhongMaterial({ 
        color: 0x8a2be2, 
        transparent: true, 
        opacity: 0.15, 
        wireframe: true 
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    coreGroup.add(shell);

    // 3. ORBITING RINGS
    const ringGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xff0055, transparent: true, opacity: 0.6 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
    
    const ring1 = new THREE.Mesh(ringGeo, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    coreGroup.add(ring1);
    
    const ring2 = new THREE.Mesh(ringGeo, ringMat2);
    ring2.rotation.y = Math.PI / 2;
    coreGroup.add(ring2);

    // 4. FLOATING DATA PARTICLES
    const particlesGeo = new THREE.BufferGeometry();
    const pos = [];
    for(let i=0; i<150; i++) {
        pos.push((Math.random()-0.5)*7, (Math.random()-0.5)*7, (Math.random()-0.5)*7);
    }
    particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particles);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00f0ff, 2, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // INTERACTIVITY (Mouse Move)
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        targetRotationY = mouseX * 0.5;
        targetRotationX = mouseY * 0.5;
    });

    // ANIMATION LOOP
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Auto-rotation
        innerCube.rotation.x += 0.005;
        innerCube.rotation.y += 0.01;
        
        shell.rotation.x -= 0.003;
        shell.rotation.y -= 0.006;

        ring1.rotation.y += 0.015;
        ring1.rotation.z += 0.005;
        
        ring2.rotation.x -= 0.01;
        ring2.rotation.z -= 0.015;

        particles.rotation.y += 0.001;

        // Interactive Mouse Rotation
        coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;
        coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

        // Gentle Floating Effect
        coreGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;

        renderer.render(scene, camera);
    };
    animate();

    // RESIZE HANDLER
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});

