# ChromaCalm — Implementation Plan

## Overview
ChromaCalm is a clinical-grade, zero-install accessibility web tool and bookmarklet. It provides precise spectral notch filtering using SVG `<feColorMatrix>` primitives to help users suffering from photophobia, migraine, astigmatism, and screen halation. By relying on native browser capabilities and applying research from Harvard Medical School and clinical FL-41 tints, it delivers high-performance filtering across any operating system and device.

## Scope Definition
### In Scope
- Single-file OS-neutral web application (`chromacalm.html`)
- Universal draggable bookmarklet exporter
- 4 SVG spectral matrix presets (Harvard 520nm, FL-41 Rose, Matte Paper, Sleep Prep)
- Fullscreen Green Light Bath mode with Screen Wake Lock
- Halation-proof Document Reader for pasted text and files
- Gradual CSS transition filtering (anti-startle)
- Time-of-day adaptive preset selection
- LocalStorage stimulus journal
- Web Audio API confirmation tone

### Out of Scope
- Native desktop or mobile wrappers (Electron, Tauri, iOS/Android apps)
- Background syncing or cloud accounts
- Browser extension packaging (relying instead on bookmarklet and userscript formats)
- Processing of external images or videos (media remains unfiltered by default or handled carefully)

## Technical Architecture
ChromaCalm leverages a purely client-side architecture contained within a single HTML file. It uses vanilla ES6, inline SVG filters, and CSS variables. No build steps or heavy frameworks are required. The filter is injected using an encoded Data URI (`data:image/svg+xml;utf8,...`) to avoid the `<base>` tag bug in Safari/Firefox. State is maintained transiently in the DOM or persistently in `localStorage`.

## File Map (every file the project will contain)
- `chromacalm.html` (The core web application and tool)
- `README.md` (Project documentation and science)
- `LICENSE` (MIT License)
- `.gitignore`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/labels.yml`
- `.github/milestones.yml`

## Implementation Phases

### Phase 1: ✅ Core SVG Filter Engine
- **Goal:** Implement the fundamental SVG filter injection mechanism via Data URI.
- **Files touched:** `chromacalm.html`
- **Steps:**
  1. Create the `chromacalm.html` skeleton with a basic UI.
  2. Write the JavaScript function to dynamically construct the `<svg><filter><feColorMatrix></feColorMatrix></filter></svg>` string based on matrix values.
  3. Encode the constructed SVG string into a Data URI.
  4. Apply the Data URI to `document.documentElement.style.filter`.
  5. Add CSS transition logic (`transition: filter 1s ease`) for gradual activation.
- **Verification criteria:** Calling the filter function dynamically updates the entire viewport without causing the page to reload or breaking under `<base>` tag constraints.

### Phase 2: ✅ Preset Library
- **Goal:** Encode the exact clinical matrices into selectable presets.
- **Files touched:** `chromacalm.html`
- **Steps:**
  1. Define a JavaScript configuration object containing the matrix values for the four core presets (Harvard 520nm Green, FL-41 Rose, Matte Paper, Sleep Preparation).
  2. Implement a UI toggle/dropdown to switch between presets.
  3. Ensure transitions gracefully fade from identity matrix or current matrix to the new target.
- **Verification criteria:** User can cycle through all four presets, and visual output matches the clinical transmission profiles (e.g., pure green subpixel isolation for Harvard 520nm).

### Phase 3: ✅ UI Shell
- **Goal:** Build the Anti-Halation Document Reader and main control dashboard.
- **Files touched:** `chromacalm.html`
- **Steps:**
  1. Set up the CSS grid/flex layout with the halation-proof palette (`#141416` background, `#D6D0C4` text).
  2. Create the text input/reading area (textarea or contenteditable div) with `line-height: 1.7em`.
  3. Implement drag-and-drop event listeners for `.txt`, `.md`, and `.html` files to load content into the reader.
- **Verification criteria:** Reading area displays text clearly with zero halation; drag-and-drop successfully populates the reader.

### Phase 4: ✅ Bookmarklet Generator
- **Goal:** Provide a draggable bookmarklet and userscript export.
- **Files touched:** `chromacalm.html`
- **Steps:**
  1. Write the minified bookmarklet engine string (IIFE that injects the SVG Data URI).
  2. Create a draggable `<a>` element containing the `javascript:` URI.
  3. Add a copy-to-clipboard button for mobile users.
  4. Generate and display the Tampermonkey Userscript equivalent.
- **Verification criteria:** Dragging the link to the bookmarks bar and clicking it applies the filter on an external site like Wikipedia.

### Phase 5: ✅ Screen Wake Lock Green Light Mode
- **Goal:** Provide a dedicated screen bath mode for acute migraines.
- **Files touched:** `chromacalm.html`
- **Steps:**
  1. Add a "Green Light Bath" button to the UI.
  2. Wire the button to invoke `document.documentElement.requestFullscreen()`.
  3. Request a screen wake lock via `navigator.wakeLock.request('screen')`.
  4. Apply the 520nm Green matrix at maximum coverage.
  5. Add an event listener to release the wake lock and exit fullscreen on escape/tap.
- **Verification criteria:** Entering the mode fills the screen with 520nm green, hides OS chrome, and prevents screen dimming on supported devices.

### Phase 6: ✅ Stimulus Journal (localStorage)
- **Goal:** Record filter usage data locally for the user.
- **Files touched:** `chromacalm.html`
- **Steps:**
  1. Create a logging function that saves `{ timestamp, presetName, duration }` to `localStorage`.
  2. Build a small UI section to view the log history.
  3. Implement a "Download as CSV" button for the log data.
- **Verification criteria:** Toggling filters populates the local log, and the CSV export correctly downloads the formatted history.

### Phase 7: Audio Feedback Engine
- **Goal:** Provide non-visual confirmation when a filter activates.
- **Files touched:** `chromacalm.html`
- **Steps:**
  1. Initialise the Web Audio API context on user interaction.
  2. Create an oscillator node set to a 440 Hz sine wave.
  3. Use an envelope (gain node) to fade the sound in and out over 120ms.
  4. Trigger the audio play alongside the filter application function.
- **Verification criteria:** A soft tone plays exactly when a new filter preset is activated.

### Phase 8: Sleep Preparation Preset + Time-of-Day Auto-Selection
- **Goal:** Implement the melatonin-safe mode and auto-default logic.
- **Files touched:** `chromacalm.html`
- **Steps:**
  1. Add the Sleep Preparation (Red-only) matrix to the preset library.
  2. Write an initialization function that checks `new Date().getHours()`.
  3. Default to Matte Paper (07-12), FL-41 (12-20), or Sleep Prep (20-07) on first load.
- **Verification criteria:** Reloading the app at 22:00 automatically selects the Sleep Preparation preset.

### Phase 9: GitHub Pages Deployment + README
- **Goal:** Prepare the repository for public consumption.
- **Files touched:** `README.md`, `.gitignore`, `LICENSE`, `.github/` config files.
- **Steps:**
  1. Finalize the single-page HTML structure.
  2. Commit to the main branch.
  3. Ensure the README links to the GitHub Pages URL.
- **Verification criteria:** The site is accessible via `https://markkirby125.github.io/chromacalm/` and the bookmarklet functions identically from the live host.

## GitHub Project Setup
### Labels
- `clinical-science`, `filter-preset`, `bookmarklet`, `wake-lock`, `browser-compat`, `photophobia`, `migraine`, `a11y`, `bug`, `enhancement`, `documentation`
### Milestones
- v0.1 (Core filter engine)
- v0.2 (All presets + bookmarklet)
- v0.3 (Green Light Lamp mode)
- v1.0 (Full release)
### Issue Templates
- `bug_report.md`
- `feature_request.md`

## Out-of-scope for v1.0
- WebGL or Canvas-based image processing for media elements
- Integration with OS-level color filters via native daemon
- Browser extension wrappers (manifest v3)
- Multi-page application structure
