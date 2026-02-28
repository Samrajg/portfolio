document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Load Navbar Dynamically
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;
                initNavbarLogic(); // Initialize event listeners after loading
            })
            .catch(error => console.error('Error loading navbar:', error));
    } else {
        // Fallback if container doesn't exist (e.g. running directly without container)
        initNavbarLogic();
    }

    // 2. Navbar Logic (Mobile Menu & Active States)
    function initNavbarLogic() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        const links = document.querySelectorAll('.nav-links a');

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
                if (pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 3. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach(el => observer.observe(el));
});