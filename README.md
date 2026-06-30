# SephGoesGaming

A black-and-gold landing page for the **SephGoesGaming** YouTube channel — ARPG build diaries and league-start guides for **Path of Exile** and **Torchlight Infinite**.

🔗 **Live site:** _add your GitHub Pages link here once deployed_

## Features

- Animated hero entrance and scroll-triggered reveal animations (respects `prefers-reduced-motion`)
- Filterable video showcase (All / Torchlight Infinite / Path of Exile) driven by a single data file
- Fully responsive, no build step or dependencies — just static HTML/CSS/JS
- Google Fonts (Cinzel + Oswald) loaded via CDN

## Project structure

```
.
├── index.html        # Page markup
├── css/
│   └── style.css      # All styling, design tokens as CSS variables
├── js/
│   ├── videos.js       # Video catalog data — edit this to add/update uploads
│   └── script.js        # Filtering, rendering, and scroll-reveal logic
└── README.md
```

## Running locally

No build tools required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder locally, e.g.:

  ```bash
  python3 -m http.server 8000
  ```

  then visit `http://localhost:8000`.

## Updating the video list

Edit `js/videos.js`. Each entry looks like:

```js
{
  title: "Video title",
  views: "3.5K",       // or null if unknown
  time: "1 month ago", // or null if unknown
  dur: "15:55",
  dps: "15T DPS",       // shown as the thumbnail's headline stat
  game: "tli",          // "tli" or "poe" — used by the filter buttons
  badge: "Torchlight Infinite"
}
```

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.

## License

MIT — see [LICENSE](LICENSE).
