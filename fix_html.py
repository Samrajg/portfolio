
import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

start_idx = html.find("<div class=\"skills-grid\">")
end_idx = html.find("<!-- PROJECT ARCHIVE SHOWCASE -->")

replacement = """<div class="skills-grid">
                <!-- AI / ML -->
                <div class="glass-card tilt-card">
                    <h3 class="skill-category-title">
                        <i class="fas fa-brain"></i> AI, ML & Vision
                    </h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Python & ML Pipelines</span>
                        <span class="skill-tag">BERT / NLP Architecture</span>
                        <span class="skill-tag">OpenCV & Computer Vision</span>
                    </div>
                </div>

                <!-- Frontend -->
                <div class="glass-card tilt-card">
                    <h3 class="skill-category-title" style="color: var(--neon-purple);">
                        <i class="fas fa-code"></i> Frontend & 3D Web
                    </h3>
                    <div class="skill-tags">
                        <span class="skill-tag">React & Next.js</span>
                        <span class="skill-tag">JavaScript (ES6+)</span>
                        <span class="skill-tag">Three.js / WebGL / CSS3</span>
                    </div>
                </div>

                <!-- Backend -->
                <div class="glass-card tilt-card">
                    <h3 class="skill-category-title" style="color: var(--neon-pink);">
                        <i class="fas fa-server"></i> Backend & API Architecture
                    </h3>
                    <div class="skill-tags">
                        <span class="skill-tag">FastAPI & Python Backends</span>
                        <span class="skill-tag">Node.js & Express.js</span>
                        <span class="skill-tag">PostgreSQL & MongoDB</span>
                    </div>
                </div>

                <!-- DevOps & Tools -->
                <div class="glass-card tilt-card">
                    <h3 class="skill-category-title" style="color: var(--neon-gold);">
                        <i class="fas fa-gears"></i> Tools & Hardware Deployment
                    </h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Docker Containerization</span>
                        <span class="skill-tag">Jetson Nano Edge Devices</span>
                        <span class="skill-tag">Git & Figma UI/UX</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    """

if start_idx != -1 and end_idx != -1:
    new_html = html[:start_idx] + replacement + html[end_idx:]
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(new_html)

