# EduQuest MY 🎮🇲🇾

**EduQuest MY** is a multi-language Educational Web Portal and Arcade Mini-Game platform built for Malaysian primary (KSSR) and secondary (KSSM) students.

![EduQuest MY](https://img.shields.io/badge/Curriculum-KSSR%20%26%20KSSM-00f2fe?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-BM%20%7C%20EN%20%7C%20%E4%B8%AD%E6%96%87-ff0844?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-00e676?style=for-the-badge)

---

## 🌟 Key Features

### 1. Web Portal (`index.html`)
- **Multi-Language Support (i18n)**: Switch instantly between **Bahasa Malaysia (BM)**, **English (EN)**, and **Mandarin (中文)**.
- **Subject & Level Filters**: Filter games by subject (*Mathematics, Science, History*) and academic level (*Primary / Sekolah Rendah vs Secondary / Sekolah Menengah*).
- **Fullscreen Lightbox Launcher**: Interactive modal window that embeds standalone game engines seamlessly via `<iframe src="...` with ESC key shortcut support.
- **Modern Arcade Glassmorphism UI**: High-contrast glowing neon aesthetic optimized for desktop, tablet, and mobile screens.

### 2. Mini-Game #1: "Trigonometry: Hole in the Wall" (`games/math-trigo-wall/`)
- **Procedural Right-Triangle Generator**: Dynamically generates trigonometric questions (calculating missing sides $Opp, Adj, Hyp$ or angles $\theta$ using SOH CAH TOA & Pythagorean Theorem).
- **3 Levels of Difficulty**:
  - **Level 1 (Easy)**: Pythagorean triples ($3\text{-}4\text{-}5, 5\text{-}12\text{-}13, 8\text{-}15\text{-}17$), slow moving wall.
  - **Level 2 (Medium)**: Scaled triples and standard trigonometric ratios ($\sin, \cos, \tan$).
  - **Level 3 (Hard)**: Real-world decimals (rounded to 2 d.p.) with fast-approaching wall speed.
- **Visual & Audio Feedback**: 3D perspective corridor with an approaching wall cutout, SVG triangle rendering, Web Audio synthesized sounds, touch numpad, and SOH CAH TOA formula quick-reference drawer.

---

## 📁 Directory Architecture

```
my-edu-arcade/
├── index.html               # Main Portal Landing Page
├── style.css                # Global Web Portal Styles & Glassmorphism Theme
├── portal.js                # i18n Translation Engine & Game Modal Launcher
├── README.md                # Project Documentation & Setup Guide
└── games/
    └── math-trigo-wall/     # Mini-Game #1 (Trigonometry)
        ├── index.html       # Standalone Embeddable Game View
        ├── style.css        # 3D Wall Perspective & Interactive UI Styles
        └── game.js          # Procedural Math Engine & Game Loop
```

---

## 🚀 Local Development & Testing

You can run and test EduQuest MY on your local machine using any simple HTTP web server.

### Option 1: Using Python (Built-in)
```bash
cd my-edu-arcade
python -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

### Option 2: Using Node.js / `npx serve`
```bash
cd my-edu-arcade
npx serve .
```

---

## 🌐 Deploying to GitHub Pages

1. **Push Repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EduQuest MY Portal & Trigonometry Mini-Game"
   git branch -M main
   git remote add origin https://github.com/<your-username>/edu-arcade.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/<your-username>/edu-arcade`.
   - Click **Settings** > **Pages** (under Code and automation).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Select `main` branch and `/ (root)` folder, then click **Save**.
   - Your site will be published at `https://<your-username>.github.io/edu-arcade/`.

---

## 🔐 Future Authentication Roadmap (Google Sign-In)

For future production deployments where users sign in with a **Google Account**:
- Integrate **Firebase Authentication** or **Supabase Auth** via JavaScript SDK.
- Store student progress, high scores, and completed achievements linked to their Google User ID (`uid`).
