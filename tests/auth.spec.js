// NOTE - Want this test to run positive and negative login tests
const { test } = require('../fixtures'); // Import the custom test with fixtures
const { expect } = require('@playwright/test'); // Import expect for assertions
const testData = require('../test-data/users.json');
const { loginPage } = require('../helpers');

// Initial Variables
const users = testData.users;

test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/account/login');

});

test.describe('Checking the authentication functionality', () => {
    test.skip('Login with valid credentials', async ({ page }) => {
        await loginPage(page, 'standard_user');
        await expect(page).toHaveURL('/account');
        // Site appears to have no valid credientials for login
    });
});