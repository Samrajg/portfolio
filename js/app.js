/* ==========================================================================
   GODWIN SAMRAJ - 3D ANIMATED PORTFOLIO ENGINE (THREE.JS + GSAP)
   ========================================================================== */

let scene, camera, renderer;
let mainMesh, wireframeMesh, particleSystem, gridPlane;
let targetCameraPos = { x: 0, y: 0, z: 8 };
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

// Initialize 3D Engine
function init3DEngine() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // 1. SCENE & CAMERA
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060b, 0.035);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 50);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8a2be2, 3, 50);
    purpleLight.position.set(-5, -5, -2);
    scene.add(purpleLight);

    // 4. MAIN 3D GEOMETRY (Torus Knot)
    const torusGeo = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32);
    const torusMat = new THREE.MeshStandardMaterial({
        color: 0x050814,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: false,
        emissive: 0x0a1026
    });
    mainMesh = new THREE.Mesh(torusGeo, torusMat);
    scene.add(mainMesh);

    // Wireframe Overlay
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    wireframeMesh = new THREE.Mesh(torusGeo, wireMat);
    mainMesh.add(wireframeMesh);

    // 5. 3D PARTICLE FIELD (STARS & NEBULA)
    const particleCount = 2500;
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
        particlePositions[i * 3] = (Math.random() - 0.5) * 45;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45;

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

    // 6. CYBERNETIC GRID FLOOR
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

    // Smoothly update target camera & mesh position based on scroll depth
    targetCameraPos.z = 8 - progress * 4;
    targetCameraPos.y = -progress * 2;
    targetCameraPos.x = Math.sin(progress * Math.PI * 2) * 2.5;

    if (mainMesh) {
        mainMesh.position.x = Math.cos(progress * Math.PI * 2) * 2;
        mainMesh.position.y = Math.sin(progress * Math.PI) * 1.5;
        mainMesh.rotation.z = progress * Math.PI * 2;
    }
}

// Main Render Loop
function animate() {
    requestAnimationFrame(animate);

    // Smooth Mouse Interpolation (Lerp)
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Smooth Camera Lerp
    camera.position.x += (targetCameraPos.x + mouseX * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (targetCameraPos.y - mouseY * 0.8 - camera.position.y) * 0.05;
    camera.position.z += (targetCameraPos.z - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);

    // 3D Object Auto Rotations
    if (mainMesh) {
        mainMesh.rotation.x += 0.005;
        mainMesh.rotation.y += 0.008;
    }

    if (particleSystem) {
        particleSystem.rotation.y += 0.0005;
        particleSystem.rotation.x += 0.0002;
    }

    if (gridPlane) {
        gridPlane.position.z = (Date.now() * 0.001) % 2.5;
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
