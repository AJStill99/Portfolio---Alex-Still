/* 
    Helper functions: 
    - Have these to make reptitive tasks easier to call
    - e.g. going to the base URL, or going to a specific page by URL extension
*/

const users = require('./test-data/users.json');
const products = require('./test-data/products.json');
const checkoutInfo = require('./test-data/checkout.json');
const errors = require('./test-data/errors.json');

async function goToBaseURL(page) { 
    await page.goto('/');
}

async function goTo(page, URL_extension) {
    await page.goto(`/${URL_extension}`);
}

async function clickProduct(page, productName) {
    const product = products[productName].name;
    await page.locator(`text=${product}`).click();
}

async function goToCart(page) {
  await page.locator('#cart-target-desktop').click();
}

async function fillCustomerDetails(page, userKey = 'standard_user_checkout') {
    // Default to standard_user_checkout if no userKey is provided
    // Makes this function more fullproof
    const data = checkoutInfo[userKey].shipping;

    await page.fill('#checkout_email', data.email);
    await page.fill('#checkout_shipping_address_first_name', data.firstName);
    await page.fill('#checkout_shipping_address_last_name', data.lastName);
    await page.fill('#checkout_shipping_address_address1', data.address1);
    await page.fill('#checkout_shipping_address_city', data.city);
    await page.fill('#checkout_shipping_address_zip', data.zip);
}

async function checkPageTitle(expectedTitle) {
    const title = await page.title();
    expect(title).toBe(expectedTitle);
}

async function checkHeaderText(expectedText) {
    const headerText = await page.textContent('h1');
    expect(headerText).toBe(expectedText);
}

async function getElement(page, elementID) {
    await page.locator(elementID);
}

async function loginPage(page, userKey = 'standard_user') {
    // Default to standard_user_checkout if no userKey is provided
    // Makes this function more fullproof
    const user = users[userKey];

    await page.goto('/account/login');
    await page.fill('#customer_email', user.username);
    await page.fill('#customer_password', user.password);
    await page.click('input[type="submit"][value="Sign In"]');
    // Need to find a valid email and password for this
}

async function checkForSuccessElement(page, successElement, failureElement) {
    const successLocator = page.locator(successElement);
    const failureLocator = page.locator(failureElement);

    if (await successLocator.isVisible()) {
        await expect(successLocator).toBeVisible();
    } else {
        await expect(failureLocator).toBeVisible();
    } 
}




module.exports = { 
    goToBaseURL, 
    goTo,
    clickProduct,
    goToCart,
    fillCustomerDetails,
    checkPageTitle,
    checkHeaderText,
    getElement,
    loginPage,
    checkForSuccessElement
};