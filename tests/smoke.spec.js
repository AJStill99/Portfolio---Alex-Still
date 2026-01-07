const { test, expect } = require('@playwright/test');
const { goToBaseURL, clickProduct, goToCart } = require('../helpers');

test.describe('Smoke tests', () => {

  test('Home page loads', async ({ page }) => {
    await goToBaseURL(page);
    await expect(page).toHaveTitle(/^Sauce Demo$/i); 
    // Using regex to ignore case sensitivity, but ensuring full title match
  });

  test('Can view product page', async ({ page }) => {
    await goToBaseURL(page);
    await clickProduct(page, 'grey_jacket');
    await expect(page.locator('h1[itemprop="name"]')).toHaveText(/Grey jacket/i);

  });

  test('Can add product to cart', async ({ page }) => {
    await goToBaseURL(page);
    await clickProduct(page, 'grey_jacket');
    await page.locator('#add').click();

    await goToCart(page);

    const cartCount = page.locator('#cart-target-desktop');
    await cartCount.waitFor(); // Wait for the cart count to update
    await expect(cartCount).toHaveText(/1/); // Sub string check for 1 item in cart

    await expect(page.locator('h1', { hasText: 'Grey jacket' })).toBeVisible(); // more specific selector
    // await expect(page.locator('text=Grey jacket')).toBeVisible();
    // Above line resolves to 4 items, need to narrow down selector
  });

  test('Cart page loads and shows checkout button', async ({ page }) => {
    await goToBaseURL(page);
    await clickProduct(page, 'grey_jacket');
    await page.locator('#add').click();
    await goToCart(page);
    await expect(page.locator('text=Check out')).toBeVisible();
  });

  test('Can navigate to checkout page', async ({ page }) => {
    await goToBaseURL(page);
    await clickProduct(page, 'grey_jacket');
    await page.locator('#add').click();
    await page.waitForTimeout(2000); // Wait for cart to update
    await goToCart(page);
    await page.locator('text=Check out').click();
    await expect(page.locator('#checkout')).toBeVisible();
  });

});
