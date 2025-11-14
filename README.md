## Personal Landing Page | Mohammad Nawfal

A cinematic, non-linear portfolio experience built with React and Vite. The layout blends ambient gradients, floating navigation, and story-driven sections inspired by boutique creative studios.

### Highlights
- Hero scene with live location time, floating stats, and custom cursor glow for instant personality
- Timeline, portfolio grid, and ritual cards fed by structured data inside `src/App.jsx`
- Sticky vertical navigation powered by `IntersectionObserver` for smooth section wayfinding
- Fully responsive design with glassmorphism surfaces, noise overlays, and scroll-triggered ambience

### Quick start

```bash
npm install
npm run dev
```

Open the logged URL (default `http://localhost:5173`) to explore the experience locally. The project already ships with ESLint and Vite preview scripts:

```bash
npm run build      # production bundle
npm run preview    # serve the built bundle
npm run lint       # optional code quality pass
```

### Customize your story
1. Update the `profile`, `storyBeats`, `projects`, `rituals`, and `socialLinks` objects at the top of `src/App.jsx` with your real data.
2. Adjust colors, gradients, and spacing in `src/App.css`. The CSS uses semantic class names (`hero`, `story-grid`, `project-card`, etc.) so experiments stay straightforward.
3. Drop new media or illustration assets into `src/assets/` and reference them from the React markup if you want richer visuals.

### Project structure

- `src/App.jsx`: Page layout, motion-friendly data, and component helpers.
- `src/App.css`: Ambient styling, glass panels, floating nav, and responsive rules.
- `src/index.css`: Font imports and global resets.
- `public/`: Static assets served as-is.

Feel free to iterate on the motion language, add Three.js canvases, or wire the data objects to a CMS if you need live editing. This repo focuses on providing a bold, opinionated baseline you can extend quickly.
