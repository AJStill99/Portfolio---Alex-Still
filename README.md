# Alex Still - Playwright QA Automation Portfolio

[![Release](https://img.shields.io/github/v/release/alexstill/playwright-qa-portfolio?style=flat-square)](https://github.com/alexstill/playwright-qa-portfolio/releases)

This repository contains a QA automation portfolio project built using **Playwright**.  
It demonstrates practical, real-world end-to-end testing against a live e-commerce site.
This project intentionally avoids over-engineering in favour of clarity and maintainability.
The tests are run against a live e-commerce site, Sauce Demo, to simulate real-world e-commerce scenarios.

The focus of this project is on **test structure, reliability, and maintainability**, rather than exhaustive feature coverage.

## Tech Stack
- **Playwright**
- **JavaScript (Node.js)**
- **Playwright Test Runner**
- **GitHub Actions (CI)**

## Project Goals
- Demonstrate modern QA automation practices
- Apply the Page Object Model and helper abstractions
- Cover both positive and negative test scenarios
- Keep tests readable, maintainable, and easy to extend

## Test Coverage
The project includes the following test suites:

- **Auth** – login and authentication scenarios  
- **Cart** – add/remove products and cart validation  
- **Checkout** – happy path checkout flow  
- **Checkout Validation** – form validation and error handling  
- **Navigation** – site navigation and routing  
- **Products** – product listing and product detail checks  
- **Smoke** – critical path tests to verify site availability  

## Test Data
Reusable test data is stored separately to keep tests clean and realistic:
- Users
- Products
- Checkout details
- Error messages

## Environment
- **Base URL:** https://sauce-demo.myshopify.com/

## Running the Tests

**Install dependencies**  
`npm install` – Installs project packages

**Install Playwright browsers**  
`npx playwright install` – Sets up the required browsers for Playwright

**Run all tests**  
`npx playwright test` – Executes all test suites in headless mode

**Run tests in UI mode**  
`npx playwright test --ui` – Opens the Playwright Test Runner UI for interactive test execution

**Show HTML report**  
`npx playwright show-report` – Opens the HTML test report in your default browser


## Documentation

- [Test Strategy](docs/test-strategy.md)
- [Exploratory Test Report](docs/exploratory-testing-report.md)

