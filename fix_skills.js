
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacement = \            <div class=\x22skills-grid\x22>
                <!-- AI / ML -->
                <div class=\x22glass-card tilt-card\x22>
                    <h3 class=\x22skill-category-title\x22>
                        <i class=\x22fas fa-brain\x22></i> AI, ML & Vision
                    </h3>
                    <div class=\x22skill-tags\x22>
                        <span class=\x22skill-tag\x22>Python & ML Pipelines</span>
                        <span class=\x22skill-tag\x22>BERT / NLP Architecture</span>
                        <span class=\x22skill-tag\x22>OpenCV & Computer Vision</span>
                    </div>
                </div>

                <!-- Frontend -->
                <div class=\x22glass-card tilt-card\x22>
                    <h3 class=\x22skill-category-title\x22 style=\x22color: var(--neon-purple);\x22>
                        <i class=\x22fas fa-code\x22></i> Frontend & 3D Web
                    </h3>
                    <div class=\x22skill-tags\x22>
                        <span class=\x22skill-tag\x22>React & Next.js</span>
                        <span class=\x22skill-tag\x22>JavaScript (ES6+)</span>
                        <span class=\x22skill-tag\x22>Three.js / WebGL / CSS3</span>
                    </div>
                </div>

                <!-- Backend -->
                <div class=\x22glass-card tilt-card\x22>
                    <h3 class=\x22skill-category-title\x22 style=\x22color: var(--neon-pink);\x22>
                        <i class=\x22fas fa-server\x22></i> Backend & API Architecture
                    </h3>
                    <div class=\x22skill-tags\x22>
                        <span class=\x22skill-tag\x22>FastAPI & Python Backends</span>
                        <span class=\x22skill-tag\x22>Node.js & Express.js</span>
                        <span class=\x22skill-tag\x22>PostgreSQL & MongoDB</span>
                    </div>
                </div>

                <!-- DevOps & Tools -->
                <div class=\x22glass-card tilt-card\x22>
                    <h3 class=\x22skill-category-title\x22 style=\x22color: var(--neon-gold);\x22>
                        <i class=\x22fas fa-gears\x22></i> Tools & Hardware Deployment
                    </h3>
                    <div class=\x22skill-tags\x22>
                        <span class=\x22skill-tag\x22>Docker Containerization</span>
                        <span class=\x22skill-tag\x22>Jetson Nano Edge Devices</span>
                        <span class=\x22skill-tag\x22>Git & Figma UI/UX</span>
                    </div>
                </div>
            </div>\;

const regex = /<div class=\x22skills-grid\x22>[\s\S]*?<\/div>\s*<\/section>/;
html = html.replace(regex, replacement + '\n    </section>');
fs.writeFileSync('index.html', html, 'utf8');

