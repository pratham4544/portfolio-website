---
name: project-portfolio
description: Portfolio website theme — switched from Alchemy/Fantasy to Terminal/Hacker (Matrix green) theme
metadata:
  type: project
---

Replaced the full alchemy-themed portfolio (dark purple, mystery chest, smoke transitions) with a Terminal/Hacker theme.

**Why:** User wanted something that impresses HR with a "wow factor" — terminal theme signals elite developer identity while remaining professional.

**How to apply:** When making future changes, respect the terminal aesthetic: JetBrains Mono font, #00FF41 green on #0A0A0A black, amber (#FFB700) for highlights, cyan for status. All sections are styled as terminal commands (`$ ls`, `$ cat`, `$ whoami`).

**New component map:**
- `MatrixRain.jsx` — canvas falling chars background (opacity 0.07)
- `TerminalCursor.jsx` — custom green ring + dot cursor
- `TerminalNav.jsx` — sticky nav with `[prathamesh@dev:~]$` logo
- `TerminalHero.jsx` — typewriter boot sequence with interactive terminal window
- `TerminalSkills.jsx` — `ls -la skills/` directory listing with animated progress bars
- `TerminalProjects.jsx` — projects displayed as JSON files with syntax highlighting
- `TerminalContact.jsx` — `contact --help` style with copy-to-clipboard

Old alchemy components (LandingPage, MysticalTree, PotionSkills, etc.) are untouched files — still present if revert needed.
