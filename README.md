# Jupiter Planit — Playwright Test Suite

End-to-end test automation for [Jupiter](http://jupiter.cloud.planittesting.com) built with [Playwright](https://playwright.dev) and TypeScript, following the Page Object Model pattern.

## Project Structure

```
├── tests/             # Test specs
├── pages/             # Page Object classes (locators + low-level actions)
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
# Run all tests (headless)
npx playwright test

# Run headed (visible browser)
HEADED=1 npx playwright test

# Run a specific spec
npx playwright test tests/contact-submission.spec.ts

# Run tests matching a keyword
npx playwright test --grep "Submit contact page"

# Repeat a test N times (useful for flakiness checks)
npx playwright test --grep "Submit contact page" --repeat-each=5

# Run in debug mode
npx playwright test --debug
```

## Viewing Reports

After a test run, open the HTML report:

```bash
npx playwright show-report
```

## CI / Jenkins

The `Jenkinsfile` defines the pipeline:

1. **Checkout** — checks out the triggering branch
2. **Install Dependencies** — `npm ci`
3. **Install Playwright Browsers** — installs Chromium with system dependencies
4. **Run Tests** — executes the full suite; generates HTML and JUnit reports
5. **Post** — publishes the HTML report, JUnit results (for trend graphs), and archives traces/screenshots on failure

Test results and artifacts are available on the Jenkins build page under *Playwright Test Report*.

## Environment Variables

| Variable   | Description                  | Default                                    |
|------------|------------------------------|--------------------------------------------|
| `BASE_URL` | Base URL for the application | `http://jupiter.cloud.planittesting.com`   |
| `CI`       | Set to `true` in CI          | unset (local)                              |
| `HEADED`   | Set to any value to run headed | unset (headless)                         |

For local overrides, create a `.env` file in the project root (ignored by git)