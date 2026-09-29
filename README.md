# GODWIN — Cinematic Portfolio

Welcome to the **Godwin** cinematic portfolio! This project is a highly immersive, interactive, and WebGL-powered 3D storytelling experience.

## ? About the Project

This portfolio is designed to showcase my journey, projects, and creative evolution through a seamless scroll-based cinematic interface. It leverages modern web technologies, custom shaders, and interactive 3D rendering to create an unforgettable user experience.

### Key Sections
1. **The Hero Opening (Home)** - A cinematic title sequence introducing the portfolio.
2. **The Creative Universe (Work)** - Highlighting the tools, software, and creative processes.
3. **A Journey Through Time (About)** - An interactive timeline that showcases experiences, growth, and the evolution of ideas from 2021 to 2026.
4. **The Project Universe (Journal/Projects)** - An amphitheater of project cards dynamically reacting to mouse position and scroll depth.
5. **The Closing Shot (Contact)** - The finale, featuring social links and contact information, resolving into a beautiful closing frame.

---

## ?? Tech Stack

- **HTML5 & CSS3:** For standard layout and typography, heavily utilizing CSS Variables and modern responsive techniques.
- **JavaScript (ES6+):** Pure vanilla JavaScript without heavy frontend frameworks to ensure maximum performance.
- **WebGL & Custom Shaders:** Raw WebGL context handling the visual heavy lifting. Custom GLSL shaders map images, apply volumetric lighting, distortions, and visual effects to create depth.
- **Python (Offline tools):** Scripts in the 	ools/ directory are used offline to pre-process assets (e.g., removing backgrounds, extracting matte plates, optimizing media).

---

## ?? Project Structure

`	ext
?? portfolio/
+-- ?? index.html             # The main markup containing the layout and canvas elements
+-- ?? src/                   # Core application logic
¦   +-- ?? main.js            # Entry point: handles booting, scroll navigation, and state
¦   +-- ?? gl/                # WebGL renderer, shaders, and composition logic
¦   +-- ?? scene/             # Scene 1: Hero & Layout utilities
¦   +-- ?? scene2/            # Scene 2: The Creative Universe
¦   +-- ?? scene3/            # Scene 3: A Journey Through Time
¦   +-- ?? scene4/            # Scene 4: The Project Gallery
¦   +-- ?? scene6/            # Scene 5: Finale / Closing Shot
¦   +-- ?? styles/            # Modular CSS files for each section
+-- ?? public/                # All static assets (images, videos, fonts, json)
+-- ?? tools/                 # Python scripts for offline asset preparation
`

---

## ?? Getting Started (Local Development)

Because this project uses modules and fetches local assets, you cannot just open index.html directly in the browser. You must serve it over a local HTTP server.

**Option 1: Using the provided script**
1. Make sure you have Python installed.
2. Run the included serve script:
   `ash
   python tools/serve.py
   `
3. Open your browser to http://127.0.0.1:5173.

**Option 2: Using Node.js**
If you have Node.js and 
px installed, you can simply run:
`ash
npx serve .
`

---

## ?? Design & Architecture Notes

- **Scroll-Driven Animation:** The experience is tied strictly to the native scroll position. Scenes are constructed and deconstructed as they enter and leave the viewport.
- **DOM + WebGL Synchronization:** UI elements like the navigation, typography, and buttons (DOM elements) are perfectly synced over the background WebGL context via precise reference calculations.
- **Performance First:** Video processing stops automatically when it leaves the screen via the Intersection Observer API, ensuring smooth performance and preserving battery life.

---

*© 2026 Godwin — All rights reserved.*
