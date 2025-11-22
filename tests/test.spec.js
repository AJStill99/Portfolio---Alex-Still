const { test } = require('../fixtures'); // Import the custom test with fixtures
const { expect } = require('@playwright/test'); // Import expect for assertions

// Need to set the base URL in the config file for these tests to work

test.describe('Example page tests', () => {
    test('Check URL and title', async ({ page }) => {
        await page.goto('/example-domains');
        await expect(page).toHaveURL('https://example.com/example-domains');
        await expect(page).toHaveTitle('Example Domains');
        // Is there a way to make this dynamic rather than hardcoding?
    });

    test('Check for heading text on the page', async ({ page, logToConsole }) => {
        await page.goto('/');
        // Goes to the baseURL set in playwright.config.js
        // Can go to specific paths like '/example-page' as well
    });

    test('Check if heading text is correct', async ({ page }) => {
        page.goto('/');
        const headerText = await page.textContent('h1');
        if(headerText !== 'Example Domains') {
            throw new Error(`Expected header text to be 'Example Domains' but got '${headerText}'`);
        }

        await expect(headerText).toBe('Example Domains');
    });

    test('Navigate from home to a product page', async ({ page }) => {
        // Go to Base URL, navigate to products page, and ensure URL contains sub string
        await page.goto('/');
        await page.click('a[href="/collections/all"]');
        await expect(page).toHaveURL(/\/collections\/all/);
    });

    // this keeps fucking failing and no idea why, pissing me off 
});