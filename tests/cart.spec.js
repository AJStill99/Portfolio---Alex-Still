const { test } = require('../fixtures'); // Import the custom test with fixtures
const { expect } = require('@playwright/test'); // Import expect for assertions
const Products = require('../components/products');

test.describe('Checking the add to cart functionality', () => {
    test('Go to URL and check it is stable', async ({ page }) => {
        test.setTimeout(10000);
        // Setting timeout to 10 seconds. Realistically, this should be loading within this time frame easily
        
        // Go to Base URL
        await page.goto('/');
    });

    test('Add the first product on the page to the cart and check cart amount is correct', async ({ page }) => {
        const products = Products(page);
        await page.goto('/collections/frontpage');

        const allProducts = await products.captureProducts(); // Needs this line to make sure cachedProducts is populated
        // Might be a better way to do this

        const firstProduct = products.getFirstProduct();
        await products.addProductToCart(firstProduct);
        console.log(`Added first product: ${firstProduct.title}`);

        // Seems to fail as it's checking it too fast

        const cartCount = page.locator('#cart-target-desktop');
        await cartCount.waitFor(); // Wait for the cart count to update
        await expect(cartCount).toHaveText(/1/); // Sub string check for 1 item in cart
        // Done this as string contains brackets, rather focus on the number itself
        // NOTE - Might be better to make this number dynamic in future tests
    });

    test('Product to checkout flow', async ({ page }) => {
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
});