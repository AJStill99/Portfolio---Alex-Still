// Helper functions
const { expect } = require('@playwright/test');

async function goToURL(url) {
    await page.goto(url);
    await expect(page).toHaveURL(url);
    // Above line may be redundant but ensures URL is correct
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

async function loginPage(page, userEmailLocator, userEmail, userPasswordLocator, userPassword, loginButton, url) {
    goToURL(url);
    await page.locator(userEmailLocator).fill(userEmail);
    await page.locator(userPasswordLocator).fill(userPassword);
    await page.locator(loginButton).click(middle);
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
    goToURL,
    checkPageTitle,
    checkHeaderText,
    getElement,
    loginPage,
};
