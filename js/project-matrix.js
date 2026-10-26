/* ==========================================================================
   DYNAMIC PROJECT MATRIX RENDERER & MULTI-PARAM FILTER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const flagshipContainer = document.getElementById('tier-flagship-grid');
    const blueprintContainer = document.getElementById('tier-blueprint-grid');
    const utilityContainer = document.getElementById('tier-utility-grid');
    const incubatorContainer = document.getElementById('tier-incubator-grid');
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('.archive-controls .filter-btn');
    const countBadge = document.getElementById('results-count');

    if (!window.portfolioProjects) return;

    let currentCategory = 'all';
    let currentSearchTerm = '';

    function createProjectCardHtml(p) {
        const metricsHtml = p.metrics.map(m => `
            <div class="metric-strip-item">
                <div class="metric-strip-val text-cyan">${m.val}</div>
                <div class="metric-strip-lbl">${m.label}</div>
            </div>
        `).join('');

        const techHtml = p.tech.map(t => `<span class="tech-chip">${t}</span>`).join('');

        const demoBtnHtml = p.demo ? `
            <a href="${p.demo}" target="_blank" class="btn btn-neon">
                <i class="fas fa-play"></i> Live Launch
            </a>
        ` : '';

        const githubBtnHtml = p.github ? `
            <a href="${p.github}" target="_blank" class="btn btn-purple">
                <i class="fab fa-github"></i> Source
            </a>
        ` : '';

        return `
            <div class="aiml-project-card" id="${p.id}" data-category="${p.category}" data-tier="${p.tier}">
                <div>
                    <div class="card-top-bar">
                        <span class="status-badge ${p.badgeColor || 'cyan'}">
                            <i class="fas fa-microchip"></i> ${p.badge}
                        </span>
                        <span style="font-family: var(--font-code); font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">
                            ${p.category}
                        </span>
                    </div>

                    <h3 class="card-project-title">${p.title}</h3>
                    <p class="card-tagline">> ${p.tagline}</p>
                    <p class="card-desc">${p.desc}</p>

                    <div class="card-metrics-strip">
                        ${metricsHtml}
                    </div>

                    <div class="card-tech-badges">
                        ${techHtml}
                    </div>
                </div>

                <div class="card-footer-actions">
                    ${githubBtnHtml}
                    ${demoBtnHtml}
                </div>
            </div>
        `;
    }

    function renderMatrix() {
        const term = currentSearchTerm.toLowerCase().trim();

        const filtered = window.portfolioProjects.filter(p => {
            const matchesCategory = (currentCategory === 'all' || p.category === currentCategory);
            const matchesSearch = !term || (
                p.title.toLowerCase().includes(term) ||
                p.tagline.toLowerCase().includes(term) ||
                p.desc.toLowerCase().includes(term) ||
                p.tech.some(t => t.toLowerCase().includes(term))
            );
            return matchesCategory && matchesSearch;
        });

        // Split into tiers
        const flagshipProjects = filtered.filter(p => p.tier === 'flagship');
        const blueprintProjects = filtered.filter(p => p.tier === 'blueprint');
        const utilityProjects = filtered.filter(p => p.tier === 'utility');
        const incubatorProjects = filtered.filter(p => p.tier === 'incubator');

        if (flagshipContainer) {
            flagshipContainer.innerHTML = flagshipProjects.map(createProjectCardHtml).join('') || '<p style="color:var(--text-dim); padding:1rem;">No matching systems in this tier.</p>';
            const sec = document.querySelector('[data-tier-section="flagship"]');
            if (sec) sec.style.display = flagshipProjects.length ? 'block' : 'none';
        }

        if (blueprintContainer) {
            blueprintContainer.innerHTML = blueprintProjects.map(createProjectCardHtml).join('') || '<p style="color:var(--text-dim); padding:1rem;">No matching systems in this tier.</p>';
            const sec = document.querySelector('[data-tier-section="blueprint"]');
            if (sec) sec.style.display = blueprintProjects.length ? 'block' : 'none';
        }

        if (utilityContainer) {
            utilityContainer.innerHTML = utilityProjects.map(createProjectCardHtml).join('') || '<p style="color:var(--text-dim); padding:1rem;">No matching systems in this tier.</p>';
            const sec = document.querySelector('[data-tier-section="utility"]');
            if (sec) sec.style.display = utilityProjects.length ? 'block' : 'none';
        }

        if (incubatorContainer) {
            incubatorContainer.innerHTML = incubatorProjects.map(createProjectCardHtml).join('') || '<p style="color:var(--text-dim); padding:1rem;">No matching systems in this tier.</p>';
            const sec = document.querySelector('[data-tier-section="incubator"]');
            if (sec) sec.style.display = incubatorProjects.length ? 'block' : 'none';
        }

        if (countBadge) {
            countBadge.textContent = `Showing ${filtered.length} of ${window.portfolioProjects.length} Systems`;
        }
    }

    // Filter Button listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category') || 'all';
            renderMatrix();
        });
    });

    // Search Input listeners
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            renderMatrix();
        });
    }

    // Initial render
    renderMatrix();

    // Check URL hash if jumping to specific project
    if (window.location.hash) {
        setTimeout(() => {
            const el = document.querySelector(window.location.hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.style.border = '2px solid #00f0ff';
                el.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.6)';
            }
        }, 400);
    }
});
