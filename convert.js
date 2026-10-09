
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class=\x22skill-items\x22>([\s\S]*?)<\/div>\s*<\/div>/g;
html = html.replace(regex, (match, inner) => {
    const skills = [...inner.matchAll(/<span>(.*?)<\/span>/g)].map(m => m[1]);
    const tags = skills.map(s => '<span class=\x22skill-tag\x22>' + s + '<\/span>').join('\n                        ');
    return '<div class=\x22skill-tags\x22>\n                        ' + tags + '\n                    <\/div>\n                <\/div>';
});

fs.writeFileSync('index.html', html, 'utf8');

