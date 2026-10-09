
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hero-model-container');
    if (!container || typeof THREE === 'undefined') return;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2, 8); // Slightly above looking down

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // COMPUTER GROUP
    const computerGroup = new THREE.Group();
    scene.add(computerGroup);

    // MATERIALS
    const plasticMat = new THREE.MeshPhongMaterial({ color: 0x1a1a2e, shininess: 80 });
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff }); // Glowing screen
    const neonPink = new THREE.MeshBasicMaterial({ color: 0xff0055 });
    const neonCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    // 1. MONITOR BASE & STAND
    const baseGeo = new THREE.BoxGeometry(1.2, 0.1, 0.8);
    const base = new THREE.Mesh(baseGeo, plasticMat);
    base.position.y = -1;
    computerGroup.add(base);

    const standGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16);
    const stand = new THREE.Mesh(standGeo, plasticMat);
    stand.position.y = -0.6;
    computerGroup.add(stand);

    // 2. MONITOR
    const monitorGeo = new THREE.BoxGeometry(3.5, 2, 0.2);
    const monitor = new THREE.Mesh(monitorGeo, plasticMat);
    monitor.position.y = 0.5;
    monitor.rotation.x = -0.05; // Tilted slightly back
    computerGroup.add(monitor);

    // 3. SCREEN (The glowing part)
    const screenGeometry = new THREE.PlaneGeometry(3.3, 1.8);
    const screenMesh = new THREE.Mesh(screenGeometry, screenMat);
    screenMesh.position.set(0, 0.5, 0.11);
    screenMesh.rotation.x = -0.05;
    computerGroup.add(screenMesh);

    // Add some lines of 'code' on the screen
    for (let i = 0; i < 5; i++) {
        const codeLineGeo = new THREE.PlaneGeometry(Math.random() * 1.5 + 0.5, 0.05);
        const codeLine = new THREE.Mesh(codeLineGeo, new THREE.MeshBasicMaterial({color: 0xffffff}));
        codeLine.position.set(-1.5 + (codeLineGeo.parameters.width / 2) + 0.1, 1.2 - (i * 0.2), 0.12);
        screenMesh.add(codeLine);
    }

    // 4. PC TOWER
    const towerGeo = new THREE.BoxGeometry(1.2, 3, 2.5);
    const tower = new THREE.Mesh(towerGeo, plasticMat);
    tower.position.set(3, -0.5, 0);
    computerGroup.add(tower);

    // PC Glass side panel
    const glassGeo = new THREE.PlaneGeometry(0.8, 2.6);
    const glassMat = new THREE.MeshPhongMaterial({ color: 0x000000, transparent: true, opacity: 0.7, shininess: 100 });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(2.39, -0.5, 0);
    glass.rotation.y = -Math.PI / 2;
    computerGroup.add(glass);

    // PC Internals (Glowing RAM/GPU)
    const ramGeo = new THREE.BoxGeometry(0.1, 0.8, 0.4);
    const ram1 = new THREE.Mesh(ramGeo, neonPink);
    ram1.position.set(2.6, 0, 0.2);
    computerGroup.add(ram1);
    const ram2 = new THREE.Mesh(ramGeo, neonPink);
    ram2.position.set(2.6, 0, -0.2);
    computerGroup.add(ram2);

    const gpuGeo = new THREE.BoxGeometry(0.8, 0.2, 1.5);
    const gpu = new THREE.Mesh(gpuGeo, neonCyan);
    gpu.position.set(3, -1, 0);
    computerGroup.add(gpu);

    // 5. KEYBOARD
    const kbGeo = new THREE.BoxGeometry(2.5, 0.1, 1);
    const kb = new THREE.Mesh(kbGeo, plasticMat);
    kb.position.set(0, -1.5, 2);
    kb.rotation.x = 0.1; // Tilted slightly towards user
    computerGroup.add(kb);

    // 6. MOUSE
    const mouseGeo = new THREE.BoxGeometry(0.4, 0.15, 0.6);
    const pcMouse = new THREE.Mesh(mouseGeo, plasticMat);
    pcMouse.position.set(1.8, -1.5, 2);
    computerGroup.add(pcMouse);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00f0ff, 1.5, 20);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    const pinkLight = new THREE.PointLight(0xff0055, 1, 10);
    pinkLight.position.set(3, 0, 2);
    scene.add(pinkLight);

    // INTERACTIVITY (Mouse Move)
    let targetRotationX = 0;
    let targetRotationY = -0.5; // Start with a nice isometric angle
    
    computerGroup.rotation.y = -0.5;
    computerGroup.rotation.x = 0.2;

    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        // Limit the rotation so the computer doesn't flip completely around
        targetRotationY = -0.5 + (mouseX * 0.3);
        // Scroll interaction added to mouse X/Y interaction
        const scrollFactor = window.scrollY * 0.002;
        targetRotationX = 0.2 + (mouseY * 0.2) + scrollFactor;
    });

    // ANIMATION LOOP
    const animate = () => {
        requestAnimationFrame(animate);

        // Interactive Mouse Rotation (Smooth interpolation)
        computerGroup.rotation.y += (targetRotationY - computerGroup.rotation.y) * 0.05;
        computerGroup.rotation.x += (targetRotationX - computerGroup.rotation.x) * 0.05;

        // Gentle Floating Effect
        computerGroup.position.y = Math.sin(Date.now() * 0.001) * 0.15;

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


