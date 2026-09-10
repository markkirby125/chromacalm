import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const html = readFileSync(new URL('../chromacalm.html', import.meta.url), 'utf8');

function load() {
    return new JSDOM(html, {
        url: 'https://markkirby125.github.io/chromacalm/',
        runScripts: 'dangerously',
        pretendToBeVisual: true,
        beforeParse(window) {
            // jsdom lacks matchMedia; stub reduced-motion so the filter applies synchronously.
            window.matchMedia = (query) => ({
                matches: true,
                media: query,
                onchange: null,
                addListener() {},
                removeListener() {},
                addEventListener() {},
                removeEventListener() {},
                dispatchEvent() { return false; }
            });
        }
    });
}

test('page initializes without throwing and applies a preset', () => {
    const dom = load();
    const { window } = dom;
    const doc = window.document;

    assert.equal(doc.title, 'ChromaCalm');
    // regression: the leftover <base> tag must never come back (broke Pages deploy)
    assert.equal(doc.querySelectorAll('base').length, 0);

    // core controls present
    assert.ok(doc.getElementById('status'), 'status region present');
    assert.ok(doc.getElementById('journal-panel'), 'journal panel present');
    assert.ok(doc.getElementById('bath-stop-overlay'), 'stop overlay present');
    assert.equal(doc.querySelectorAll('#preset-select option').length, 5, '5 presets');

    // pure helper still works and returns an encoded SVG data URI
    assert.equal(typeof window.constructSVGDataURI, 'function');
    const uri = window.constructSVGDataURI('1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');
    assert.ok(uri.startsWith('data:image/svg+xml;utf8,'), 'SVG data URI');

    // time-of-day preset was auto-selected and applied to the documentElement filter
    assert.ok(doc.documentElement.style.filter.includes('chromacalm-filter'), 'filter applied');
});

test('meta description, favicon and JSON-LD are present', () => {
    const dom = load();
    const doc = dom.window.document;

    assert.ok(doc.querySelector('meta[name="description"]'), 'meta description');
    assert.ok(doc.querySelector('link[rel="icon"]'), 'favicon');

    const script = doc.querySelector('script[type="application/ld+json"]');
    assert.ok(script, 'JSON-LD script');
    const ld = JSON.parse(script.textContent);
    assert.equal(ld['@type'], 'WebApplication');
    assert.equal(ld.name, 'ChromaCalm');
});
