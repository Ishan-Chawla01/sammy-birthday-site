# Sammy's Birthday Experience

A playful, minimalist birthday story built with HTML, CSS, and vanilla JavaScript. Open a little letter, scroll through illustrated memories, and reach a balloon-filled birthday finale.

## Features

- **Vintage envelope opening:** A gently wobbling envelope opens to reveal a personal birthday note.
- **Catch-the-letter game:** The envelope dodges the pointer until the visitor types the secret code `211`; touch screens get an on-page code field.
- **Scroll-driven memory lane:** Retro-inspired photo frames slide into view alongside auto-typing messages; hover or click a frame to fan out its pictures, then click any card to view the full photo.
- **Celebratory finale:** Reaching the end triggers floating balloons and a "Happy Birthday Sammy" message.
- **Accessible motion:** Keyboard access, reduced-motion support, and a fallback for browsers without `IntersectionObserver`.

## Tech stack

- HTML5
- CSS3 (photo-card animations, Flexbox/Grid, Google Fonts)
- Vanilla JavaScript (Intersection Observer API and typewriter effect)

## Getting started

1. Open `index.html` in a browser, or use a local development server such as Live Server in VS Code.
2. Update the birthday note and memory copy in `index.html` to personalize the experience.
3. Personal memory photos are loaded from `imgs/` in numbered groups: `1-1` to `1-3`, `2-1` to `2-4`, and `3-1` to `3-3`. Hover over or click a photo frame to fan its pictures out like little cards.
