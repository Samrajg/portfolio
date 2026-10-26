/* ==========================================================================
   COMPLETE PROJECT LIBRARY — SEARCH, MULTI-FILTER, SORTING & LOAD-MORE
   Handles all 32 verified projects with accessible modal / detail drawers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('all-projects-grid');
    const searchInput = document.getElementById('project-search');
    const categoryButtons = document.querySelectorAll('.cat-filter-btn');
    const statusSelect = document.getElementById('status-filter');
    const sortSelect = document.getElementById('sort-filter');
    const resultsCountEl = document.getElementById('results-count');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const modalBackdrop = document.getElementById('project-detail-modal');

    if (!gridContainer || !window.portfolioProjects) return;

    let selectedCategory = 'all';
    let selectedStatus = 'all';
    let selectedSort = 'featured';
    let searchQuery = '';
    const PAGE_SIZE = 9;
    let visibleCount = PAGE_SIZE;

    // Category mapping helper
    function matchesCategory(p, cat) {
        if (cat === 'all') return true;
        if (p.category === cat) return true;
        if (p.categories && p.categories.includes(cat)) return true;
        return false;
    }

    // Status mapping helper
    function matchesStatus(p, status) {
        if (status === 'all') return true;
        if (!p.status) return false;
        if (Array.isArray(p.status)) {
            return p.status.some(s => s.toLowerCase().includes(status.toLowerCase()));
        }
        return p.status.toLowerCase().includes(status.toLowerCase());
    }

    // Text search helper
    function matchesSearch(p, query) {
        if (!query) return true;
        const q = query.toLowerCase().trim();
        const searchCorpus = [
            p.name,
            p.title,
            p.tagline,
            p.problem,
            p.solution,
            p.implementation,
            p.myRole,
            (p.technologies || []).join(' '),
            (p.status || []).join(' ')
        ].filter(Boolean).join(' ').toLowerCase();

        return searchCorpus.includes(q);
    }

    // Sorting helper
    function sortProjects(list, sortMode) {
        const sorted = [...list];
        if (sortMode === 'featured') {
            sorted.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return (b.lastUpdated || '').localeCompare(a.lastUpdated || '');
            });
        } else if (sortMode === 'az') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortMode === 'recent') {
            sorted.sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''));
        }
        return sorted;
    }

    // Filter and sort the entire dataset
    function getFilteredProjects() {
        const filtered = window.portfolioProjects.filter(p => {
            return matchesCategory(p, selectedCategory) &&
                   matchesStatus(p, selectedStatus) &&
                   matchesSearch(p, searchQuery);
        });
        return sortProjects(filtered, selectedSort);
    }

    // Render compact project card
    function createCard(p) {
        const statusBadges = Array.isArray(p.status) 
            ? p.status.map(s => {
                const isLive = s.toLowerCase().includes('live');
                const isComp = s.toLowerCase().includes('completed');
                const cls = isLive ? 'badge-live' : (isComp ? 'badge-completed' : 'badge-dev');
                const icon = isLive ? 'fa-circle-check' : (isComp ? 'fa-check' : 'fa-flask');
                return `<span class="card-status-badge ${cls}"><i class="fas ${icon}"></i> ${s}</span>`;
              }).join(' ')
            : `<span class="card-status-badge">${p.status || ''}</span>`;

        const techChips = (p.technologies || []).slice(0, 3).map(t => `<span class="mini-tech-chip">${t}</span>`).join('');
        const moreTechCount = (p.technologies && p.technologies.length > 3) ? `<span class="mini-tech-chip chip-more">+${p.technologies.length - 3}</span>` : '';

        const demoLink = p.demo 
            ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="card-action-link link-demo" title="Open live application or demo"><i class="fas fa-arrow-up-right-from-square"></i> Demo</a>` 
            : '';

        const githubLink = p.github 
            ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="card-action-link link-code" title="View source repository"><i class="fab fa-github"></i> Code</a>` 
            : '';

        return `
            <article class="compact-project-card" data-project-id="${p.id}">
                <div class="card-top-meta">
                    <div class="badges-row">${statusBadges}</div>
                    <button type="button" class="btn-card-detail" data-open-detail="${p.id}" aria-label="View details for ${p.name}">
                        <i class="fas fa-circle-info"></i> Details
                    </button>
                </div>

                <h3 class="card-project-title">
                    <button type="button" class="title-link-btn" data-open-detail="${p.id}">${p.name}</button>
                </h3>

                <p class="card-project-tagline">${p.tagline}</p>

                <div class="card-problem-preview">
                    <strong>Problem:</strong> ${p.problem ? p.problem.slice(0, 110) + '...' : ''}
                </div>

                <div class="card-footer-meta">
                    <div class="card-tech-chips">
                        ${techChips}
                        ${moreTechCount}
                    </div>
                    <div class="card-action-cluster">
                        ${githubLink}
                        ${demoLink}
                    </div>
                </div>
            </article>
        `;
    }

    // Main Render function
    function render() {
        const filtered = getFilteredProjects();
        const total = filtered.length;
        const totalAll = window.portfolioProjects.length;

        // Update count text
        if (resultsCountEl) {
            if (total === totalAll) {
                resultsCountEl.textContent = `Showing all ${total} projects`;
            } else {
                resultsCountEl.textContent = `Showing ${total} of ${totalAll} projects`;
            }
        }

        // Empty state
        if (total === 0) {
            gridContainer.innerHTML = `
                <div class="projects-empty-state">
                    <div class="empty-icon"><i class="fas fa-folder-open"></i></div>
                    <h4>No matching projects found</h4>
                    <p>Try adjusting your search keywords, clearing filters, or switching categories.</p>
                    <button type="button" class="btn-reset-filters" id="btn-empty-reset">Reset All Filters</button>
                </div>
            `;
            const emptyReset = document.getElementById('btn-empty-reset');
            if (emptyReset) {
                emptyReset.addEventListener('click', resetAllFilters);
            }
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        // Slice for Load More
        const toShow = filtered.slice(0, visibleCount);
        gridContainer.innerHTML = toShow.map(createCard).join('');

        // Handle Load More Button
        if (loadMoreBtn) {
            if (visibleCount >= total) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.innerHTML = `<span>Load More Projects (${total - visibleCount} remaining)</span> <i class="fas fa-angle-down"></i>`;
            }
        }

        // Attach modal trigger listeners
        gridContainer.querySelectorAll('[data-open-detail]').forEach(btn => {
            btn.addEventListener('click', () => {
                const projId = btn.getAttribute('data-open-detail');
                openProjectModal(projId);
            });
        });
    }

    function resetAllFilters() {
        selectedCategory = 'all';
        selectedStatus = 'all';
        selectedSort = 'featured';
        searchQuery = '';
        visibleCount = PAGE_SIZE;

        if (searchInput) searchInput.value = '';
        if (statusSelect) statusSelect.value = 'all';
        if (sortSelect) sortSelect.value = 'featured';

        categoryButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
        });

        render();
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            visibleCount = PAGE_SIZE;
            render();
        });
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCategory = btn.getAttribute('data-category');
            visibleCount = PAGE_SIZE;
            render();
        });
    });

    if (statusSelect) {
        statusSelect.addEventListener('change', (e) => {
            selectedStatus = e.target.value;
            visibleCount = PAGE_SIZE;
            render();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            selectedSort = e.target.value;
            render();
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += PAGE_SIZE;
            render();
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', resetAllFilters);
    }

    // Modal / Drawer handling
    function openProjectModal(id) {
        const p = window.portfolioProjects.find(item => item.id === id);
        if (!p || !modalBackdrop) return;

        const modalBody = modalBackdrop.querySelector('.modal-content-area');
        if (!modalBody) return;

        const statusBadges = Array.isArray(p.status) 
            ? p.status.map(s => `<span class="modal-badge">${s}</span>`).join(' ')
            : `<span class="modal-badge">${p.status || ''}</span>`;

        const techList = (p.technologies || []).map(t => `<span class="tech-chip">${t}</span>`).join(' ');

        const demoBtn = p.demo 
            ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn-primary-small"><i class="fas fa-arrow-up-right-from-square"></i> Live Demo / Link</a>` 
            : '';

        const githubBtn = p.github 
            ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-github-small"><i class="fab fa-github"></i> Source Code</a>` 
            : '';

        modalBody.innerHTML = `
            <div class="modal-header-section">
                <div class="modal-badges-row">${statusBadges}</div>
                <h2 class="modal-title">${p.title || p.name}</h2>
                <p class="modal-tagline">${p.tagline || ''}</p>
            </div>

            <div class="modal-narrative-grid">
                <div class="narrative-block">
                    <span class="narrative-tag text-cyan"><i class="fas fa-triangle-exclamation"></i> The Problem</span>
                    <p>${p.problem || 'Documentation in progress.'}</p>
                </div>

                <div class="narrative-block">
                    <span class="narrative-tag text-purple"><i class="fas fa-lightbulb"></i> The Solution</span>
                    <p>${p.solution || 'Custom engineering solution developed to address the specific problem criteria.'}</p>
                </div>

                <div class="narrative-block">
                    <span class="narrative-tag text-green"><i class="fas fa-user-gear"></i> My Contribution</span>
                    <p>${p.contributions || p.myRole || 'System architecture, design, and code implementation.'}</p>
                </div>

                <div class="narrative-block">
                    <span class="narrative-tag text-amber"><i class="fas fa-layer-group"></i> Implementation Details</span>
                    <p>${p.implementation || 'Built using modern engineering practices and clean modular architecture.'}</p>
                </div>
            </div>

            ${p.results ? `
            <div class="modal-results-banner">
                <strong><i class="fas fa-chart-line"></i> Verified Outcomes:</strong> ${p.results}
            </div>` : ''}

            <div class="modal-tech-section">
                <span class="meta-label">Technologies Used:</span>
                <div class="modal-tech-chips">${techList}</div>
            </div>

            <div class="modal-actions-bar">
                ${demoBtn}
                ${githubBtn}
                <button type="button" class="btn-subtle" id="btn-modal-close-action">Close</button>
            </div>
        `;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';

        const closeBtnAction = document.getElementById('btn-modal-close-action');
        if (closeBtnAction) closeBtnAction.addEventListener('click', closeProjectModal);
    }

    function closeProjectModal() {
        if (!modalBackdrop) return;
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop || e.target.classList.contains('modal-close-x')) {
                closeProjectModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }

    // Initial render
    render();
});
