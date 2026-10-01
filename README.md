# EduQuest MY 🎮🇲🇾

**EduQuest MY** is a multi-language Educational Web Portal and Arcade Mini-Game platform built for Malaysian primary (KSSR) and secondary (KSSM) students.

![EduQuest MY](https://img.shields.io/badge/Curriculum-KSSR%20%26%20KSSM-00f2fe?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-BM%20%7C%20EN%20%7C%20%E4%B8%AD%E6%96%87-ff0844?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-00e676?style=for-the-badge)

---

## 🌟 Key Features

### 1. Web Portal (`index.html`)
- **Multi-Language Support (i18n)**: Switch instantly between **Bahasa Malaysia (BM)**, **English (EN)**, and **Mandarin (中文)**.
- **Subject & Level Filters**: Filter games by subject (*Mathematics, Science/Physics, History*) and academic level (*Primary / Sekolah Rendah vs Secondary / Sekolah Menengah*).
- **Fullscreen Lightbox Launcher**: Interactive modal window that embeds standalone game engines seamlessly via `<iframe src="...` with ESC key shortcut support.

### 2. Mini-Game #1: "Trigonometry: Hole in the Wall" (`games/math-trigo-wall/`)
- **Procedural Right-Triangle Generator**: Dynamically generates trigonometric questions (calculating missing sides $Opp, Adj, Hyp$ or angles $\theta$ using SOH CAH TOA & Pythagorean Theorem).
- **3 Levels of Difficulty**: Easy (2 min), Medium (1 min), Hard (30 sec).
- **Dynamic Proportional Geometry**: SVG triangle and 3D wall cutout dynamically adapt aspect ratio ($Opp / Adj$).

### 3. Mini-Game #2: "Physics: Cat vs Dog (Projectile Battle)" (`games/physics-cat-dog/`)
- **SPM Physics Engine ($g = 9.8\text{ ms}^{-2}$)**: Solves Form 4/5 SPM Physics projectile motion calculations (Maximum Height $H_{max}$, Time of Flight $T$, Horizontal Range $R$, Velocity Components $u_x, u_y$).
- **Single Player vs AI & 2-Player Local Battle**:
  - Hotkey **[ Q ]** triggers Cat's 30s answer countdown.
  - Hotkey **[ P ]** triggers Dog's 30s answer countdown.
- **2D Parabolic Trajectory Animation**: Correct answers launch accurate trajectory shots hitting the opponent!
- **Streak Power-ups**: 3 consecutive correct streaks unlock **+30 HP Heal**, **2x Double Damage**, and **Freeze Opponent**!

---

## 📁 Directory Architecture

```
my-edu-arcade/
├── index.html               # Main Portal Landing Page
├── style.css                # Global Web Portal Styles & Glassmorphism Theme
├── portal.js                # i18n Translation Engine & Game Modal Launcher
├── README.md                # Project Documentation & Setup Guide
└── games/
    ├── math-trigo-wall/     # Mini-Game #1 (Trigonometry)
    │   ├── index.html
    │   ├── style.css
    │   └── game.js
    └── physics-cat-dog/     # Mini-Game #2 (SPM Physics Projectile Battle)
        ├── index.html
        ├── style.css
        └── game.js
```

---

## 🚀 Local Development & Testing

You can run and test EduQuest MY on your local machine using any simple HTTP web server.

```bash
cd my-edu-arcade
python -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

---

## 🌐 Deploying to GitHub Pages

Push changes to your repository:
```bash
git add .
git commit -m "Add Physics Cat vs Dog Projectile Battle mini-game"
git push origin main
```
Live URL: `https://chiangmingwei.github.io/edu-arcade/`
