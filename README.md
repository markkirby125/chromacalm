# ChromaCalm 🌿

ChromaCalm is a clinical-grade, zero-install accessibility web tool and bookmarklet. It provides precise spectral notch filtering using SVG `<feColorMatrix>` primitives to help users suffering from photophobia, migraine, astigmatism, and screen halation.

By relying on native browser capabilities and applying research from Harvard Medical School, ChromaCalm delivers high-performance optical filtering across any operating system and device without requiring extensions or native app installation.

## The Science

Conventional dark modes (pure white text on a pitch-black background) frequently exacerbate visual distress. Extreme contrast causes **halation** (light scattering across the retina) for users with astigmatism or cataracts. Furthermore, standard display dimmers flatten contrast without altering the underlying spectral spikes—specifically the 480nm–500nm blue-cyan emissions that hyperactivate intrinsically photosensitive retinal ganglion cells (ipRGCs).

ChromaCalm implements three meticulously calibrated optical matrices:

1. **Harvard Narrow-Band Green (~520nm):** Isolates the precise optical wavelength identified by Dr. Rami Burstein (Harvard Medical School) to bypass thalamic nociceptive pathways and reduce migraine headache intensity.
2. **Clinical FL-41 Rose Tint:** Digitally simulates the optical notch filter that attenuates 480nm–500nm wavelengths to relieve photophobia, benign essential blepharospasm, and post-concussion ocular fatigue.
3. **Matte Paper / E-Ink Dynamic Range Clamping:** Compresses peak luminance while elevating black points to eliminate halation and veiling glare, providing a warm, comfortable reading experience.

*(See our [clinical research documentation](./research/chromacalm-research.md) for full sources and methodology).*

## Features

- **Spectral Filter Presets:** Harvard 520nm Green, FL-41 Rose, Matte Paper E-Ink, and Sleep Preparation (melatonin-safe red-only) filters.
- **Time-of-Day Auto-Selection:** On first load, ChromaCalm automatically chooses Matte Paper for morning (07:00–12:00), FL-41 for daytime (12:00–20:00), and Sleep Preparation for evening/night (20:00–07:00).
- **Audio Feedback Engine:** A brief, non-intrusive 440 Hz tone confirms when a filter preset is activated via user interaction.
- **Draggable Bookmarklet & Userscript Export:** Works universally on Chrome, Firefox, Safari, and Edge. Drag the bookmarklet to your bar, or copy the Tampermonkey userscript for automatic site filtering.
- **Green Light Bath:** Turn your display into a 520nm therapy lamp during an acute migraine. Uses the Screen Wake Lock API to prevent dimming.
- **Anti-Halation Reader:** A distraction-free reading canvas for pasting raw text, Markdown, or HTML files during high-sensitivity episodes.
- **Stimulus Journal:** Locally tracks which filter presets you use and for how long, with a CSV export option for personal symptom pattern analysis.
- **Zero Install, Zero Privacy Loss:** Everything runs locally in your browser. No accounts, no telemetry, no tracking.

## Usage & Installation

### Web App
Open `https://[your-username].github.io/chromacalm/` (or open `chromacalm.html` directly from your filesystem).

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

## Screenshots

*(Placeholder for future screenshots showing the FL-41 matrix applied to Wikipedia, and the Green Light Bath mode in action)*

## Contributing

We welcome contributions from the community, especially from those with lived experience of photophobia, migraine, or low vision.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please check the issue tracker for outstanding tasks and use the provided templates.

## License

Distributed under the MIT License. See `LICENSE` for more information.
