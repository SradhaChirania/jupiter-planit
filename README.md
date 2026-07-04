# Jupiter Planit — Playwright Test Suite

End-to-end test automation for [Jupiter](http://jupiter.cloud.planittesting.com) built with [Playwright](https://playwright.dev) and TypeScript, following the Page Object Model pattern.

## Project Structure

```
├── tests/             # Test specs
├── pages/             # Page Object classes (locators only)
├── steps/             # Step classes (reusable business-level actions)
├── verifications/     # Assertion/verification classes
├── playwright.config.ts
└── Jenkinsfile
```

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

```bash
npm ci
npx playwright install --with-deps chromium
```

## Running Tests

```bash
# Run all tests
npm test

# Run a specific spec
npx playwright test tests/shop-cart.spec.ts

# Run tests matching a keyword
npx playwright test --grep "Submit contact page"

# Repeat a test N times (useful for flakiness checks)
npx playwright test --grep "Submit contact page" --repeat-each=5

# Run in debug mode
npx playwright test --debug
```

## Reporting

Tests generate raw results in `allure-results/`. To build and open the Allure report locally:

```bash
npm run report
```

**Screenshots** are captured after every test and embedded in the report.  
**Traces** are retained on failure and can be opened with:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

## CI / Jenkins

The `Jenkinsfile` defines the pipeline:

1. **Checkout** — checks out the triggering branch
2. **Install Dependencies** — `npm ci`
3. **Install Playwright Browsers** — installs Chromium with system dependencies
4. **Run Tests** — executes the full suite and writes results to `allure-results/`
5. **Generate Allure Report** — builds the HTML report from `allure-results/`
6. **Post** — publishes the Allure report; archives raw results and traces on failure

The report is available on the Jenkins build page under *Allure Test Report*.

## Environment Variables

| Variable   | Description                    | Where set                  |
|------------|--------------------------------|----------------------------|
| `BASE_URL` | Base URL for the application   | `.env` locally, Jenkins env |
| `CI`       | Enables headless mode + retries | Jenkins env                |

For local overrides, create a `.env` file in the project root (ignored by git):

```
BASE_URL=http://jupiter.cloud.planittesting.com
```
