
const fs = require('fs');
let content = fs.readFileSync('c:/Users/Godwin Samraj/portfolio/portfolio/js/app.js', 'utf8');
const lines = content.split('\n');
const newArray = [
    'const techLogos = [',
    '    { name: \'HTML5\', color: \'#E34F26\', border: \'#FF6D42\', icon: \'🌐\' },',
    '    { name: \'CSS3\', color: \'#1572B6\', border: \'#33A9FF\', icon: \'🎨\' },',
    '    { name: \'JS\', color: \'#F7DF1E\', border: \'#FFF066\', icon: \'⚡\' },',
    '    { name: \'TensorFlow\', color: \'#FF6F00\', border: \'#FFA040\', icon: \'🧠\' },',
    '    { name: \'PyTorch\', color: \'#EE4C2C\', border: \'#FF7757\', icon: \'🔥\' },',
    '    { name: \'Cursor\', color: \'#0066FF\', border: \'#3388FF\', icon: \'🖱️\' },',
    '    { name: \'Gemini\', color: \'#8E44AD\', border: \'#00F0FF\', icon: \'✨\' },',
    '    { name: \'Antigravity\', color: \'#00F0FF\', border: \'#8A2BE2\', icon: \'🚀\' },',
    '    { name: \'ChatGPT\', color: \'#10A37F\', border: \'#25D366\', icon: \'💬\' },',
    '    { name: \'Claude\', color: \'#D97757\', border: \'#FF9E7D\', icon: \'🤖\' },',
    '    { name: \'Pandas\', color: \'#150458\', border: \'#00F0FF\', icon: \'🐼\' },',
    '    { name: \'NumPy\', color: \'#013243\', border: \'#4B8BBE\', icon: \'🔢\' },',
    '    { name: \'React\', color: \'#61DAFB\', border: \'#A6F0FF\', icon: \'⚛️\' },',
    '    { name: \'Python\', color: \'#3776AB\', border: \'#FFD43B\', icon: \'🐍\' },',
    '    { name: \'Docker\', color: \'#2496ED\', border: \'#66C2FF\', icon: \'🐳\' },',
    '    { name: \'FastAPI\', color: \'#009688\', border: \'#4DB6AC\', icon: \'⚡\' },',
    '    { name: \'OpenCV\', color: \'#5C3EE8\', border: \'#FF0055\', icon: \'👁️\' },',
    '    { name: \'Node.js\', color: \'#339933\', border: \'#66CC66\', icon: \'🟩\' }',
    '];'
];
lines.splice(16, 20, ...newArray);
fs.writeFileSync('c:/Users/Godwin Samraj/portfolio/portfolio/js/app.js', lines.join('\n'), 'utf8');

