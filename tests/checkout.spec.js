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
        await page.goto('/');
        await page.locator('text=Grey jacket').click();
        await page.locator('.add-to-cart').click();

        // Reusing a test from cart.spec.js
        await page.locator('#cart-target-desktop').waitFor({ state: 'visible', timeout: 5000 });
        await expect(page.locator('#cart-target-desktop')).toHaveText(/\(\d+\)/);
        await page.waitForTimeout(4000);

        await page.goto('/cart');
        await expect(page).toHaveURL(/cart/);

        const checkoutButtonID = page.locator('#checkout');
        await checkoutButtonID.waitFor({ state: 'visible', timeout: 5000 });
        await Promise.all([
            page.waitForURL(/checkout/i),
            checkoutButtonID.click()
        ]);

        await expect(page).toHaveURL(/checkout/);
    });

    // Page was not navigating properly when you route straight to /checkout from base URL
    // reused a test from cart.spec.js to get there
});
