const { test: base } = require('@playwright/test');

const test = base.extend({
    // Define fixtures here if needed
    logToConsole: async ({}, use) => {
        console.log('Starting test...');
        await use();
        console.log('Test finished.');
    },
});

module.exports = { test };