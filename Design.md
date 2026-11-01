# Design & Architecture Document

## 1. Color Palette & Typography
- **Background:** Crisp White (`#FFFFFF`)
- **Envelope:** Off-white / Coffee-stained parchment (`#F4EBD9`, border `#D3C2A6`)
- **Accent Color (Finale):** Light Pink (`#FFB6C1`), Soft Rose (`#FF91A4`)
- **Text:** Deep Charcoal / Vintage Ink (`#2C2C2C`)
- **Typography:** 
  - Headings / Typewriter text: `Courier New`, monospace (for that 90s retro feel)
  - Body / Messages: `Georgia`, serif (warm, personal touch)

---

## 2. Component Breakdown

### Section 1: The Landing (Envelope)
- Centered on a pure white background.
- SVG or CSS-styled envelope with subtle box-shadow and a CSS keyframe animation (`wobble`).
- A pulsing "Click me 💌" helper text beneath it.

### Section 2: The Core Message
- Unfolds/fades in once the envelope flap opens.
- Sets the emotional tone before scrolling begins.

### Section 3: Scroll-Driven Photo & Typewriter Sequence
- Each memory consists of:
  - A **90s Camera Frame** (thick white borders, glossy overlay or square aspect ratio, subtle drop shadow).
  - A **Typewriter Text Box** below it that activates via JavaScript when scrolled into view.

### Section 4: The Finale
- Triggered automatically at the bottom of the page.
- CSS-animated floating balloons rising from bottom to top.
- Centered glowing heading: **"Happy Birthday Sammy"** in light pink.