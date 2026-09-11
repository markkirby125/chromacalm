# ChromaCalm 🌿

**For photophobia, migraine, astigmatism, and screen halation — filter any screen without installing anything.**

ChromaCalm is a zero-install accessibility web tool and bookmarklet. It provides precise spectral notch filtering using SVG `<feColorMatrix>` primitives to help users suffering from photophobia, migraine, astigmatism, and screen halation. By [Paul Kirby](https://github.com/markkirby125).

*Updated: 2026-09-10*

By relying on native browser capabilities and applying published research on spectral notch filtering, ChromaCalm delivers high-performance optical filtering across any operating system and device without requiring extensions or native app installation.

**Open [ChromaCalm](https://markkirby125.github.io/chromacalm/) now — it picks a time-appropriate filter automatically.**

## Why dark modes hurt and how ChromaCalm filters them

Conventional dark modes (pure white text on a pitch-black background) frequently exacerbate visual distress. Extreme contrast causes **halation** (light scattering across the retina) for users with astigmatism or cataracts. Standard display dimmers flatten overall contrast but leave the spectral spikes untouched—specifically the 480nm–500nm blue-cyan emissions that hyperactivate intrinsically photosensitive retinal ganglion cells (ipRGCs).

ChromaCalm implements four optical matrices:

1. **Harvard Green (~520nm):** Isolates the green subpixel channel. The ~520nm narrow-band green studied by Dr. Rami Burstein (Harvard Medical School) falls within this band.
2. **Clinical FL-41 Rose Tint:** Reduces green to 70% and blue to 50% of the source, dampening the blue-cyan range implicated in photophobia and post-concussion ocular fatigue.
3. **Matte Paper / E-Ink Dynamic Range Clamping:** Scales red and green to 90% and blue to 80%, with a small lift to the black point, reducing halation and veiling glare for a warm, comfortable reading experience.
4. **Sleep Preparation:** Passes only the red channel for melatonin-safe red-only output.

*(See our [research notes](https://github.com/markkirby125/vision-apps/blob/main/research/chromacalm-research.md) for sources and methodology).*

> ChromaCalm is a visual-comfort aid, not a medical device or a treatment for migraines or other conditions.

## Features

- **Spectral Filter Presets:** Harvard 520nm Green, FL-41 Rose, Matte Paper E-Ink, and Sleep Preparation (melatonin-safe red-only) filters.
- **Time-of-Day Auto-Selection:** On first load, ChromaCalm automatically chooses Matte Paper for morning (07:00–12:00), FL-41 for daytime (12:00–20:00), and Sleep Preparation for evening/night (20:00–07:00).
- **Audio Feedback Engine:** A brief 440 Hz tone confirms the filter changed, so you know the preset applied without looking.
- **Draggable Bookmarklet & Userscript Export:** Works universally on Chrome, Firefox, Safari, and Edge. Drag the bookmarklet to your bar, or copy the Tampermonkey userscript for automatic site filtering.
- **Green Light Bath:** Turn your display into a 520nm therapy lamp during an acute migraine. Uses the Screen Wake Lock API to prevent dimming.
- **Anti-Halation Reader:** A distraction-free reading canvas for pasting raw text, Markdown, or HTML files during high-sensitivity episodes.
- **Stimulus Journal:** Locally tracks which filter presets you use and for how long, with a CSV export option for personal symptom pattern analysis.
- **Zero Install, Zero Privacy Loss:** Everything runs locally in your browser. No accounts, no telemetry, no tracking.

## Usage & Installation

### Web App
Open `https://markkirby125.github.io/chromacalm/` (or open `chromacalm.html` directly from your filesystem).

The app will automatically pick a time-appropriate preset on load; you can change it at any time from the dropdown.

### The Bookmarklet / Userscript
1. Open the ChromaCalm web app.
2. Click **Export...** to reveal the bookmarklet and Tampermonkey userscript generator.
3. Drag the **ChromaCalm Bookmarklet** button to your browser's bookmarks bar, or copy the userscript into Tampermonkey.
4. Click the bookmarklet (or let the userscript run automatically) on any website to apply the active filter preset instantly.

### The Reading Canvas
1. Navigate to the ChromaCalm web app.
2. Paste your text or drag-and-drop a `.txt`, `.md`, or `.html` file into the reader.
3. Select your desired optical filter. A short tone confirms the change.

### Stimulus Journal
1. Click **Journal** to open the local usage log.
2. Review which presets you used and for how long.
3. Click **Download as CSV** to take the log into a spreadsheet or symptom tracker.

*(Your journal is stored only in your browser's `localStorage` and never uploaded.)*

## Contributing

We welcome contributions from the community, especially from those with lived experience of photophobia, migraine, or low vision.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please check the issue tracker for outstanding tasks and use the provided templates.

## Part of the Vision Apps toolkit

ChromaCalm is part of [Vision Apps](https://github.com/markkirby125/vision-apps), a four-tool accessibility kit for low-vision, photophobic and astigmatic readers.

| Project | What it does |
| --- | --- |
| **ChromaCalm** *(this repo)* | Zero-install spectral notch filtering for photophobia, migraine and screen halation. |
| [SoftContrast](https://github.com/markkirby125/softcontrast) | Anti-halation reading palettes built on APCA and OKLCH. |
| [terminal-a11y](https://github.com/markkirby125/terminal-a11y) | Screen-reader, photophobia, braille and sensory-budget modes for the command line. |
| [FocusBeacon](https://github.com/markkirby125/focusbeacon) | High-contrast dual-contour focus ring and a cursor radar for tunnel vision. |

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Sources
- [Noseda R, Burstein R, et al. "Migraine photophobia originating in cone-driven retinal pathways." *Brain*. 2016;139(7):1971–1986. PMID 27207542](https://pubmed.ncbi.nlm.nih.gov/27207542/)
- [Blackburn MK, et al. "FL-41 tint improves blink frequency, light sensitivity, and functional limitations in patients with benign essential blepharospasm." *Ophthalmology*. 2009;116(5):997–1001. PMID 19410958](https://pubmed.ncbi.nlm.nih.gov/19410958/)
- [Berson DM, Dunn FA, Takao M. "Phototransduction by retinal ganglion cells that set the circadian clock." *Science*. 2002;295(5557):1070–1073. PMID 11834835](https://pubmed.ncbi.nlm.nih.gov/11834835/)
