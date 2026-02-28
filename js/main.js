document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. LOADER ANIMATION
       ========================================= */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
    });

    /* =========================================
       2. DYNAMIC NAVBAR & SCROLL SPY (Legacy Logic)
       ========================================= */
    const navbarContainer = document.getElementById('navbar-container');
    
    // Helper function to initialize navbar events after dynamic loading
    function initNavbarLogic() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        const links = document.querySelectorAll('.nav-links a');

        // Mobile Menu Toggle
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking a link
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        }

        // Scroll Spy for Active Link Highlighting
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Add offset for sticky header
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Load Navbar if container exists
    if (navbarContainer) {
        fetch('components/navbar.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(data => {
                navbarContainer.innerHTML = data;
                initNavbarLogic();
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
                // Fallback: Try to initialize logic if static navbar exists
                initNavbarLogic(); 
            });
    } else {
        // Fallback if no container (maybe navbar is hardcoded in HTML)
        initNavbarLogic();
    }

    /* =========================================
       3. CUSTOM CURSOR
       ========================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay (using animate API for smoothness)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect for interactive elements
        const interactives = document.querySelectorAll('a, button, input, textarea, .project-card, .hamburger');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    /* =========================================
       4. TYPING EFFECT
       ========================================= */
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ["Software Developer", "AI Enthusiast", "Full Stack Engineer", "Tech Innovator"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    /* =========================================
       5. HERO PARALLAX
       ========================================= */
    const heroSection = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.hero-bg-shape');

    if (heroSection && shapes.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            let x = (window.innerWidth - e.pageX * 2) / 90;
            let y = (window.innerHeight - e.pageY * 2) / 90;

            shapes.forEach(shape => {
                shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }

    /* =========================================
       6. 3D PROJECT CARDS TILT
       ========================================= */
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset transform
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    /* =========================================
       7. 3D SKILL SPHERE GENERATOR
       ========================================= */
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        const tags = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "Three.js", "SQL", "Git", "Docker", "AWS", "Figma"];
        const radius = 120; 

        tags.forEach((tag, i) => {
            const el = document.createElement('div');
            el.classList.add('skill-tag');
            el.textContent = tag;
            
            // Fibonacci Sphere Algorithm
            const phi = Math.acos(-1 + (2 * i + 1) / tags.length);
            const theta = Math.sqrt(tags.length * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            skillsContainer.appendChild(el);
        });
    }

    /* =========================================
       8. PROJECT FILTERING
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-wrap');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Small timeout to allow display:block to render before opacity transition
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    /* =========================================
       9. SCROLL REVEAL ANIMATIONS (Integrated)
       ========================================= */
    
    // A. Reveal on Scroll (Fade In Up)
    const reveals = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // B. Observer for legacy .fade-in class
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach(el => observer.observe(el));

    /* =========================================
       10. DARK MODE TOGGLE
       ========================================= */
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Switch Icon
            if (document.body.classList.contains('dark-mode')) {
                if(icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            } else {
                if(icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }

    /* =========================================
       11. STATS COUNTER
       ========================================= */
    const stats = document.querySelectorAll('.stat-item h3');
    const statsSection = document.getElementById('stats');
    let started = false; // Ensure it only runs once
    
    if (statsSection && stats.length > 0) {
        window.addEventListener('scroll', () => {
            if (!started && (window.scrollY + window.innerHeight > statsSection.offsetTop + 100)) {
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const inc = target / 100;
                    
                    const updateCount = () => {
                        const count = +stat.innerText;
                        if (count < target) {
                            stat.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            stat.innerText = target + "+"; // Add plus sign
                        }
                    };
                    updateCount();
                });
                started = true;
            }
        });
    }
});