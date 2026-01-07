const { test, expect } = require('@playwright/test');
const {
  goToBaseURL,
  clickProduct,
  goToCart,
} = require('../helpers');

test.describe('Checkout validation', () => {

  test('Shows error when all required fields are empty', async ({ page }) => {
    await goToBaseURL(page);

    await clickProduct(page, 'grey_jacket');
    await page.locator('#add').click();

    await page.waitForTimeout(5000); // wait for animation to complete

    await goToCart(page);
    await page.locator('text=Check out').click();
    await page.locator('#checkout').click();

    // Submit without filling anything
    await page.locator('#checkout-pay-button').click();

    await page.waitForTimeout(2000); // wait for errors to appear

    const allErrors = page.locator('p[id^="error-for-"]'); // Checks for p elements with id starting with error-for-
    const count = await allErrors.count();

    let visibleErrors = 0;

    for (let i = 0; i < count; i++) {
    const error = allErrors.nth(i);
    if (await error.isVisible()) {
        visibleErrors++;
        const text = await error.textContent();
        const id = await error.getAttribute('id'); // e.g., "error-for-email"
        const field = id?.replace('error-for-', '').replace(/-/g, ' ') || 'unknown field';
        console.log(`Error ${i + 1} for ${field}: "${text}" is visible`);
        }
    }

    expect(visibleErrors).toBe(0); // Will fail if more than 1 error is visible
    // This is set to fail on purpose to show errors are being captured
  });

  test('Shows error for invalid email format', async ({ page }) => {
    await goToBaseURL(page);

    await clickProduct(page, 'grey_jacket');
    await page.locator('#add').click();

    await page.waitForTimeout(5000); // wait for animation to complete

    await goToCart(page);
    await page.locator('text=Check out').click();
    await page.locator('#checkout').click();

    await page.fill('#email', 'not-an-email');

    await page.locator('#checkout-pay-button').click();

    const emailError = page.locator('#error-for-email'); 
    await expect(emailError).toBeVisible();

    await expect(emailError).toHaveText('Enter a valid email');
});


});
