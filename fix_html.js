
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacement = '            </div>\n\n            <!-- Standalone 3D Tech Core Model -->\n            <div class=\x22hero-3d-model\x22 id=\x22hero-model-container\x22 style=\x22width: 100%; height: 100%; min-height: 400px; display: flex; justify-content: center; align-items: center; position: relative;\x22>\n            </div>\n        </div>\n\n    </section>';

html = html.replace(/            <\/div>\s*<\/div>\s*<\/section>/, replacement);

fs.writeFileSync('index.html', html, 'utf8');

