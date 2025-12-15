const { test: base } = require('@playwright/test');

const users = require('./test-data/users.json');
const products = require('./test-data/products.json');
const checkoutInfo = require('./test-data/checkout.json');
const errors = require('./test-data/errors.json');

const test = base.extend({
    // Define fixtures here if needed
    logToConsole: async ({}, use) => {
        console.log('Starting test...');
        await use();
        console.log('Test finished.');
    },
    // Logs to the console before and after each test -- similar to how a beforeEach and afterEach would work
    testData: async ({}, use) => {
        await use({ users, products, checkoutInfo, errors });
    }
    // Call this in tests the same way logToConsole would be called
});

module.exports = { test };