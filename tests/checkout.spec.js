const { test } = require('../fixtures'); // Import the custom test with fixtures
const { expect } = require('@playwright/test'); // Import expect for assertions
const testData = require('../test-data/users.json');
const { loginPage } = require('../helpers');

test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/account/login');
    await loginPage(page, 'standard_user');
});

test.describe('Checking the checkout functionality', () => {
    test('Go to checkout page and verify URL', async ({ page }) => {
        await page.goto('/checkout');
        await expect(page).toHaveURL(/checkout/);
    });
});