const { test, expect } = require('@playwright/test');

// Need to set the base URL in the config file for these tests to work

test.describe('Example page tests', () => {
    test('Check URL and title', async ({ page }) => {
        await page.goto('/example-page');
});