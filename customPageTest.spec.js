const { test } = require('./fixtures'); // Import the custom test with fixtures
const { expect } = require('@playwright/test'); // Import expect for assertions

test.describe('Running tests on custom HTML page written by myself with some CSS and JavaScript', () => {
    test.skip('Check URL and title of local HTML page', async ({ page }) => {
        await page.goto('http://127.0.0.1:5500/index.html');
        // Unsure if this would work here? As this is a local file, not on a server
        // May need to host this file somewhere to showcase this - perhaps GitHub Pages?
        await expect(page.url()).toBe('http://127.0.0.1:5500/index.html');
        await expect(page.title()).toBe('Test Document');
    });

    test.skip('Check for heading text on the page', async ({ page }) => {
        await page.goto('http://127.0.0.1:5500/index.html');
        // Goes to the local HTML file
        const headerText = await page.textContent('h1');
        console.log(`Header text found: ${headerText}`);
    });
});

// NOTE - Have outside test scope for now, as these tests are skipped