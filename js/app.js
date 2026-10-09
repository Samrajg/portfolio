/* ==========================================================================
   GODWIN SAMRAJ - 3D ANIMATED PORTFOLIO ENGINE (THREE.JS + GALAXY TECH LOGOS)
   ========================================================================== */

let scene, camera, renderer;
let particleSystem, gridPlane;
let nodesMesh, linesMesh;
const nodeCount = 150;
const nodeVelocities = [];
let linePositions, linesGeo;
let techBadgesGroup = [];
let targetCameraPos = { x: 0, y: 0, z: 8 };
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

// Tech Logos List requested by user
const techLogos = [
    { name: 'HTML5', color: '#E34F26', border: '#FF6D42', icon: 'ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â' },
    { name: 'CSS3', color: '#1572B6', border: '#33A9FF', icon: 'ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨' },
    { name: 'JS', color: '#F7DF1E', border: '#FFF066', icon: 'ÃƒÂ¢Ã…Â¡Ã‚Â¡' },
    { name: 'TensorFlow', color: '#FF6F00', border: '#FFA040', icon: 'ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ' },
    { name: 'PyTorch', color: '#EE4C2C', border: '#FF7757', icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥' },
    { name: 'Cursor', color: '#0066FF', border: '#3388FF', icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â±ÃƒÂ¯Ã‚Â¸Ã‚Â' },
    { name: 'Gemini', color: '#8E44AD', border: '#00F0FF', icon: 'ÃƒÂ¢Ã…â€œÃ‚Â¨' },
    { name: 'Antigravity', color: '#00F0FF', border: '#8A2BE2', icon: 'ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬' },
    { name: 'ChatGPT', color: '#10A37F', border: '#25D366', icon: 'ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ' },
    { name: 'Claude', color: '#D97757', border: '#FF9E7D', icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡' },
    { name: 'Pandas', color: '#150458', border: '#00F0FF', icon: 'ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¼' },
    { name: 'NumPy', color: '#013243', border: '#4B8BBE', icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ' },
    { name: 'React', color: '#61DAFB', border: '#A6F0FF', icon: 'ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â' },
    { name: 'Python', color: '#3776AB', border: '#FFD43B', icon: 'ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â' },
    { name: 'Docker', color: '#2496ED', border: '#66C2FF', icon: 'ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â³' },
    { name: 'FastAPI', color: '#009688', border: '#4DB6AC', icon: 'ÃƒÂ¢Ã…Â¡Ã‚Â¡' },
    { name: 'OpenCV', color: '#5C3EE8', border: '#FF0055', icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â' },
    { name: 'Node.js', color: '#339933', border: '#66CC66', icon: 'ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â¢' }
];

// Helper: Dynamically Generate Glowing Tech Badge Canvas Texture
function createBadgeTexture(tech) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Rounded rectangle background
    const rx = 12, ry = 12, rw = 232, rh = 104;
    ctx.fillStyle = 'rgba(8, 12, 24, 0.82)';
    ctx.beginPath();
    ctx.roundRect(12, 12, rw, rh, 18);
    ctx.fill();

    // Glowing border
    ctx.lineWidth = 3;
    ctx.strokeStyle = tech.border;
    ctx.shadowColor = tech.border;
    ctx.shadowBlur = 15;
    ctx.stroke();

    // Subtle glass shine gradient
    const grad = ctx.createLinearGradient(0, 0, 256, 128);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Icon & Text
    ctx.shadowBlur = 10;
    ctx.shadowColor = tech.color;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${tech.icon} ${tech.name}`, 128, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
}

// Initialize 3D Engine
function init3DEngine() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // 1. SCENE & CAMERA
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060b, 0.032);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // 2. RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 50);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8a2be2, 3, 50);
    purpleLight.position.set(-5, -5, -2);
    scene.add(purpleLight);

    // 4. NEURAL GRAPH (Nodes & Edges)
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
        nodePositions[i * 3] = (Math.random() - 0.5) * 40;
        nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        nodeVelocities.push({
            x: (Math.random() - 0.5) * 0.015,
            y: (Math.random() - 0.5) * 0.015,
            z: (Math.random() - 0.5) * 0.015
        });
    }

    const nodesGeo = new THREE.BufferGeometry();
    nodesGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodesMat = new THREE.PointsMaterial({
        color: 0x00f0ff,
        size: 0.15,
        transparent: true,
        opacity: 0.8
    });
    nodesMesh = new THREE.Points(nodesGeo, nodesMat);
    scene.add(nodesMesh);

    // Prepare line geometry
    const maxLines = nodeCount * nodeCount;
    linePositions = new Float32Array(maxLines * 6);
    linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
        color: 0x8a2be2,
        transparent: true,
        opacity: 0.25
    });
    linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(linesMesh);

    // 5. 3D PARTICLE FIELD (STARS & GALAXY DUST)
    const particleCount = 2800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colors = [
        new THREE.Color(0x00f0ff),
        new THREE.Color(0x8a2be2),
        new THREE.Color(0xff0055),
        new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 50;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

        const col = colors[Math.floor(Math.random() * colors.length)];
        particleColors[i * 3] = col.r;
        particleColors[i * 3 + 1] = col.g;
        particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });

    particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. FLOATING GALAXY TECH LOGOS
    techBadgesGroup = [];
    const badgeGeo = new THREE.PlaneGeometry(1.6, 0.8);

    // Create 45 floating badges scattered throughout the galaxy scene
    for (let i = 0; i < 45; i++) {
        const tech = techLogos[i % techLogos.length];
        const texture = createBadgeTexture(tech);
        const badgeMat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.88,
            side: THREE.DoubleSide
        });

        const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
        
        // Random 3D Position
        badgeMesh.position.x = (Math.random() - 0.5) * 35;
        badgeMesh.position.y = (Math.random() - 0.5) * 35;
        badgeMesh.position.z = (Math.random() - 0.5) * 35;

        // Custom Animation UserData
        badgeMesh.userData = {
            vx: (Math.random() - 0.5) * 0.015,
            vy: (Math.random() - 0.5) * 0.015,
            vz: (Math.random() - 0.5) * 0.015,
            rotSpeed: (Math.random() - 0.5) * 0.01,
            phase: Math.random() * Math.PI * 2,
            baseScale: 0.8 + Math.random() * 0.5
        };

        badgeMesh.scale.setScalar(badgeMesh.userData.baseScale);
        scene.add(badgeMesh);
        techBadgesGroup.push(badgeMesh);
    }

    // 7. CYBERNETIC GRID FLOOR
    const gridGeo = new THREE.PlaneGeometry(100, 100, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });
    gridPlane = new THREE.Mesh(gridGeo, gridMat);
    gridPlane.rotation.x = -Math.PI / 2;
    gridPlane.position.y = -8;
    scene.add(gridPlane);

    // Listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScrollDepthUpdate);

    // Kickoff Render Loop
    animate();
}

// Window Resize Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse Parallax Track
function onMouseMove(e) {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
}

// Scroll Depth Camera Trajectory
function onScrollDepthUpdate() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);

    // Smoothly update target camera position based on scroll depth
    targetCameraPos.z = 8 - progress * 4;
    targetCameraPos.y = -progress * 2;
    targetCameraPos.x = Math.sin(progress * Math.PI * 2) * 2.5;
}

// Main Render Loop
function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Smooth Mouse Interpolation (Lerp)
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Smooth Camera Lerp
    camera.position.x += (targetCameraPos.x + mouseX * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (targetCameraPos.y - mouseY * 0.8 - camera.position.y) * 0.05;
    camera.position.z += (targetCameraPos.z - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);

    // Animate Neural Graph Nodes
    if (nodesMesh && linesGeo) {
        nodesMesh.rotation.y += 0.001;
        linesMesh.rotation.y += 0.001;

        const pos = nodesMesh.geometry.attributes.position.array;
        let lineIndex = 0;

        for (let i = 0; i < nodeCount; i++) {
            // Move nodes
            pos[i * 3] += nodeVelocities[i].x;
            pos[i * 3 + 1] += nodeVelocities[i].y;
            pos[i * 3 + 2] += nodeVelocities[i].z;

            // Bounce off edges
            if (pos[i * 3] > 20 || pos[i * 3] < -20) nodeVelocities[i].x *= -1;
            if (pos[i * 3 + 1] > 20 || pos[i * 3 + 1] < -20) nodeVelocities[i].y *= -1;
            if (pos[i * 3 + 2] > 10 || pos[i * 3 + 2] < -10) nodeVelocities[i].z *= -1;

            // Connect nearby nodes
            for (let j = i + 1; j < nodeCount; j++) {
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < 15) {
                    linePositions[lineIndex++] = pos[i * 3];
                    linePositions[lineIndex++] = pos[i * 3 + 1];
                    linePositions[lineIndex++] = pos[i * 3 + 2];
                    linePositions[lineIndex++] = pos[j * 3];
                    linePositions[lineIndex++] = pos[j * 3 + 1];
                    linePositions[lineIndex++] = pos[j * 3 + 2];
                }
            }
        }

        nodesMesh.geometry.attributes.position.needsUpdate = true;
        linesGeo.attributes.position.needsUpdate = true;
        linesGeo.setDrawRange(0, lineIndex / 3);
    }

    if (particleSystem) {
        particleSystem.rotation.y += 0.0006;
        particleSystem.rotation.x += 0.0003;
    }

    // Animate Floating Galaxy Tech Badges
    techBadgesGroup.forEach((badge) => {
        const u = badge.userData;

        // Velocity motion
        badge.position.x += u.vx;
        badge.position.y += u.vy + Math.sin(time + u.phase) * 0.005;
        badge.position.z += u.vz;

        // Gentle floating tilt
        badge.rotation.z += u.rotSpeed;
        badge.rotation.y = Math.sin(time * 0.5 + u.phase) * 0.2;

        // Boundary wrap-around (Infinite Galaxy Flow)
        if (badge.position.x > 22) badge.position.x = -22;
        if (badge.position.x < -22) badge.position.x = 22;
        if (badge.position.y > 22) badge.position.y = -22;
        if (badge.position.y < -22) badge.position.y = 22;
        if (badge.position.z > 20) badge.position.z = -20;
        if (badge.position.z < -20) badge.position.z = 20;
    });

    if (gridPlane) {
        gridPlane.position.z = (time * 2) % 2.5;
    }

    renderer.render(scene, camera);
}

/* ==========================================================================
   UI INTERACTION & INTERACTIVE COMPONENTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Three.js 3D Background Engine
    init3DEngine();

    // 2. Navbar Scroll Style & Mobile Toggle
    const nav = document.querySelector('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        highlightActiveNavLink();
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.querySelector('i').classList.toggle('fa-xmark');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Highlight Active Nav Link on Scroll
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            const navAnchor = document.querySelector(`.nav-links a[href*="${id}"]`);

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                if (navAnchor) navAnchor.classList.add('active');
            }
        });
    }

    // 4. 3D Tilt Hover Effect for Cards
    const tiltCards = document.querySelectorAll('.tilt-card, .glass-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // 5. Interactive Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width') || '85%';
                bar.style.width = targetWidth;
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));

    // 6. Project Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter || category.includes(filter)) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            if (btn.classList.contains('active') && btn.getAttribute('data-filter') === filter) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }

    // 7. Ambient Audio Synthesizer (Web Audio API)
    const audioBtn = document.getElementById('audio-toggle');
    let audioCtx, oscillator, gainNode;
    let isPlayingAudio = false;

    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            if (!isPlayingAudio) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                oscillator = audioCtx.createOscillator();
                gainNode = audioCtx.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(110, audioCtx.currentTime); // Low A note drone
                gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);

                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.start();

                isPlayingAudio = true;
                audioBtn.innerHTML = '<i class="fas fa-volume-high"></i> Sound On';
                audioBtn.style.borderColor = '#00f0ff';
            } else {
                if (oscillator) oscillator.stop();
                isPlayingAudio = false;
                audioBtn.innerHTML = '<i class="fas fa-volume-xmark"></i> Sound Off';
                audioBtn.style.borderColor = 'rgba(255,255,255,0.2)';
            }
        });
    }

    // 8. Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting Signal...';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Transmission Successful!';
                submitBtn.style.background = '#00ffaa';
                submitBtn.style.color = '#05060b';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }
});

// -------------------------------------------------------------
// Initialize GSAP 3D Coverflow Scroll for Projects
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const projectsWrapper = document.querySelector('.projects-wrapper');
        const projectsGrid = document.querySelector('.projects-grid');
        const cards = gsap.utils.toArray('.project-card');

        if (projectsWrapper && projectsGrid && cards.length > 0 && window.innerWidth > 768) {
            
            // We want to scroll exactly enough to bring the last card to the center.
            // With padding-left and padding-right set to 50vw - 200px, 
            // scrollWidth is exactly the distance needed + 100vw.
            function getScrollAmount() {
                return -(projectsGrid.scrollWidth - window.innerWidth);
            }

            const tween = gsap.to(projectsGrid, {
                x: getScrollAmount,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: projectsWrapper,
                start: "top top",
                end: () => `+=${projectsGrid.scrollWidth - window.innerWidth}`,
                pin: true,
                animation: tween,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const centerX = window.innerWidth / 2;
                    
                    cards.forEach(card => {
                        const rect = card.getBoundingClientRect();
                        const cardCenterX = rect.left + rect.width / 2;
                        const distance = Math.abs(centerX - cardCenterX);
                        const maxDist = window.innerWidth / 1.5; // Controls the curve
                        
                        let progress = 1 - Math.min(distance / maxDist, 1);
                        // Easing for smoother curve
                        progress = progress * progress; 
                        
                        const scale = 0.75 + (0.35 * progress);
                        // Rotation: positive when right of center, negative when left
                        const rotationY = ((cardCenterX - centerX) / maxDist) * 55; 
                        const opacity = 0.3 + (0.7 * progress);
                        
                        gsap.set(card, {
                            scale: scale,
                            rotationY: Math.max(-65, Math.min(65, rotationY)), // Clamp rotation
                            opacity: opacity,
                            transformPerspective: 1200,
                            zIndex: Math.round(progress * 100)
                        });
                    });
                }
            });
            
            // Trigger an initial update to set the first card styles
            ScrollTrigger.refresh();
        }
    }
});











