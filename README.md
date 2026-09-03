# Lalith Eswar --- Personal Portfolio

A dark, editorial-style personal portfolio focused on **AI/ML, software
engineering, and interactive web experiences**.

The current version is a static, GitHub Pages-ready site with a strong
visual system built around oversized typography, neon-green accents,
monospace metadata, SVG motion, and a pinned horizontal project gallery.

## Live Site

After deploying with GitHub Pages, the project will be available at:

`https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY/`

If the repository is named `YOUR-GITHUB-USERNAME.github.io`, GitHub
Pages uses:

`https://YOUR-GITHUB-USERNAME.github.io/`

------------------------------------------------------------------------

## Current Version

This is **Portfolio V1**.

The goal of V1 is to establish a stable visual and technical foundation
before adding more advanced motion and interaction systems.

### Sections

-   **Hero**
    -   Personal introduction
    -   Portrait
    -   Live India time/date panel
    -   Dark editorial visual treatment
-   **Skills**
    -   Large typographic presentation
    -   Python, C++, GitHub and engineering-focused visual language
    -   LeetCode/GitHub references
-   **Experience**
    -   SVG-based continuous curve
    -   Scroll-driven GSAP animation
    -   Travelling motion marker
    -   Neon-green visual treatment
-   **Projects**
    -   Lusion-inspired pinned horizontal gallery
    -   Project screenshots
    -   Scroll-controlled horizontal movement
    -   Progress indicator
    -   Drag interaction
    -   Mobile horizontal-scroll fallback
-   **Hobbies / Contact / Footer**
    -   Supporting personal sections and closing information

------------------------------------------------------------------------

## Tech Stack

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   GSAP
-   GSAP ScrollTrigger
-   SVG
-   GitHub Pages

The site is intentionally lightweight and does not require a frontend
framework or build step.

------------------------------------------------------------------------

## Project Structure

``` text
portfolio/
├── index.html
├── style.css
├── script.js
├── hero.jpg
└── assets/
    └── projects/
        ├── champions-league.png
        ├── rubiks-cube.png
        ├── digit-recognition.png
        └── f1-predictor.png
```

### Important

Keep the folder structure intact.

The project images are referenced using relative paths such as:

``` text
assets/projects/champions-league.png
```

Changing filenames or moving the `assets` directory without updating
`index.html` will break the project images.

------------------------------------------------------------------------

## Run Locally

No build system is required.

The simplest option is to open `index.html` directly in a browser.

For a more reliable local development environment, use a local HTTP
server.

### VS Code

Install the **Live Server** extension and open `index.html` with Live
Server.

### Python

From the project directory:

``` bash
python -m http.server 8000
```

Then open:

``` text
http://localhost:8000
```

------------------------------------------------------------------------

## Deploy to GitHub Pages

### 1. Create a repository

Create a new GitHub repository, for example:

``` text
lalith-portfolio
```

### 2. Put the project files at the repository root

The repository should look like:

``` text
lalith-portfolio/
├── index.html
├── style.css
├── script.js
├── hero.jpg
└── assets/
    └── projects/
        ├── champions-league.png
        ├── rubiks-cube.png
        ├── digit-recognition.png
        └── f1-predictor.png
```

Do **not** upload only the ZIP file. Extract it and upload the actual
website files.

### 3. Enable GitHub Pages

Go to:

**Repository → Settings → Pages**

Under **Build and deployment**:

-   Source: `Deploy from a branch`
-   Branch: `main`
-   Folder: `/(root)`

Click **Save**.

GitHub will publish the static site from the repository.

### 4. Open the site

For a normal project repository:

``` text
https://YOUR-GITHUB-USERNAME.github.io/lalith-portfolio/
```

It may take a short time for the first deployment to become available.

------------------------------------------------------------------------

## Git Workflow

After making changes locally:

``` bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages will redeploy the site from the updated `main` branch.

------------------------------------------------------------------------

## Animation Architecture

The portfolio uses GSAP for scroll-driven interaction.

### Experience

The experience visual uses a single continuous SVG curve.

The animation system handles:

-   SVG path drawing
-   ScrollTrigger progress
-   Motion marker positioning
-   Scroll-linked progression

The SVG geometry itself should remain stable while animation controls
the drawing/progress state.

### Projects

The project section uses a pinned horizontal-scroll architecture:

``` text
Vertical page scroll
        ↓
Pinned viewport
        ↓
Horizontal project track
        ↓
Project panels
        ↓
Progress indicator
```

Desktop wheel/touchpad input is converted into horizontal project
movement, while mobile devices use a native horizontal-scroll fallback.

------------------------------------------------------------------------

## Design Direction

The visual language is intentionally minimal, dark, technical, and
editorial.

Core characteristics:

-   Black / near-black backgrounds
-   Neon green accents
-   Large display typography
-   Monospace technical metadata
-   Thin borders
-   SVG graphics
-   Scroll-driven animation
-   Strong whitespace
-   High-contrast project imagery

The project should feel more like an interactive digital portfolio than
a conventional resume website.

------------------------------------------------------------------------

## V2 Direction

Once V1 is stable, the next version can evolve the motion system rather
than replacing the entire site.

Potential V2 additions:

-   Motion Primitives
-   Watermelon UI-inspired interaction patterns
-   Advanced micro-interactions
-   Magnetic cursor effects
-   Kinetic typography
-   Image displacement effects
-   SVG morphing
-   More sophisticated project transitions
-   Project-specific motion scenes
-   WebGL / shader-based effects
-   Advanced hover states
-   Page-transition choreography
-   More expressive scroll storytelling

The goal is to combine these techniques without sacrificing performance,
readability, or the existing editorial identity.

------------------------------------------------------------------------

## Development Principle

**Do not redesign the whole site for every iteration.**

The preferred workflow is:

1.  Keep the approved visual system.
2.  Identify the exact interaction or visual problem.
3.  Make a focused change.
4.  Test the affected section.
5.  Preserve everything that already works.
6.  Add advanced motion only when it improves the experience.

V1 should remain a stable fallback while V2 experiments are developed.

------------------------------------------------------------------------

## Credits / Libraries

The portfolio uses GSAP and its animation plugins for interactive
motion.

GSAP documentation:

https://gsap.com/docs/v3/

ScrollTrigger documentation:

https://gsap.com/docs/v3/Plugins/ScrollTrigger/

------------------------------------------------------------------------

## License

This repository is a personal portfolio project.

Unless otherwise stated, the personal content, photography, project
screenshots, and original design assets should be treated as belonging
to the portfolio owner.
