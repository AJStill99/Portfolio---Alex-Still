// Sauce Demo Landing Page

const { test } = require('../fixtures'); // import custom fixtures (if needed)
const { expect } = require('@playwright/test');

test.describe('Running tests on the Sauce Demo landing page - showcasing some basic UI automation, and the use of baseURL', () => {
    test.skip('Go to landing page', async ({ page }) => {
        await page.goto('./'); // Have set the base URL in the config file to be sauce demo
        await expect(page.title()).toBe('Sauce Demo');
    }) // Opted to do this manually rather than my helper function to showcase the base URL
})