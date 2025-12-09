const { test } = require('../fixtures'); // Import the custom test with fixtures
const { expect } = require('@playwright/test'); // Import expect for assertions
const customerData = require('../test-customer-data.json');
const { fillCustomerDetails, goToCart } = require('../helpers');

test.describe('Filling in customer data during checkout', () => {
    test('Go to cart and fill in customer details', async ({ page }) => {
        await page.goto('/');
        await page.locator('text=Grey jacket').click();
        await page.locator('.add-to-cart').click();


        await page.locator('#cart-target-desktop').waitFor({ state: 'visible', timeout: 5000 });
        await expect(page.locator('#cart-target-desktop')).toHaveText(/\(\d+\)/); // Check for at least 1 item in cart, rather than hardcoding 1
        // This is make sure the animation has finished before clicking checkout
        // This is a regular expression to match text, not a literal string. d+ means one or more digits between the brackets

        await page.waitForTimeout(4000); // 4s pause to allow any animations to complete, as this was causing a LOT of issues

        await page.goto('/cart');
        await expect(page).toHaveURL(/cart/);

        const checkoutButtonID = page.locator('#checkout');
        await checkoutButtonID.waitFor({ state: 'visible', timeout: 5000 });

        await Promise.all([
            page.waitForURL(/checkout/i),  // wait for matching /cart
            checkoutButtonID.click()
        ]);

        await expect(page).toHaveURL(/checkout/i);

        // Might need to go over this again, ran into a LOT of issues here
    });

    test('Cart assertions', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle('Sauce Demo');
        await page.locator('text=Grey jacket').click();
        await page.locator('.add-to-cart').click();
        await expect(page.locator('#cart-target-desktop')).toHaveText(/1/);
    });
});