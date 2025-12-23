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

// Below tests will not work currently, but have written them as a template for when valid credentials are available

test.describe('Checking the authentication functionality', () => {
    test.skip('Login with valid credentials', async ({ page }) => {
        await loginPage(page, 'standard_user');
        await expect(page).toHaveURL('/account');
        // Site appears to have no valid credientials for login
        // This will pass as there I have not added a proper assertion yet, set to skip for now until I can fix
    });

    test.skip('Login with invalid credentials', async ({ page }) => {
        await loginPage(page, 'invalid_user');
        const errorMessage = page.locator('.errors li');
        await expect(errorMessage).toHaveText(/Invalid email or password/);
        // Site appears to have no valid credientials for login
        // This will pass as there I have not added a proper assertion yet, set to skip for now until I can fix
    });

    test.skip('Logout after login', async ({ page }) => {
        await loginPage(page, 'standard_user');
        await expect(page).toHaveURL('/account');
        const logoutButton = page.locator('text=Logout');
        await logoutButton.click();
        await expect(page).toHaveURL('/account/login');
        // Site appears to have no valid credientials for login
        // This will pass as there I have not added a proper assertion yet, set to skip for now until I can fix
    });
});