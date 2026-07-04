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

## Reporting & Artifacts

Two reporters run on every execution:

| Reporter | Output | Purpose |
|----------|--------|---------|
| `html`   | `playwright-report/index.html` | Browsable report with screenshots and traces |
| `list`   | stdout | Real-time pass/fail output in the terminal |

**Screenshots** are captured after every test regardless of result and are embedded in the HTML report.

**Traces** are recorded for every test but only retained for failures — open them in the HTML report or with:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

Open the full HTML report locally:

```bash
npx playwright show-report
```

## CI / Jenkins

The `Jenkinsfile` defines the pipeline:

1. **Checkout** — checks out the triggering branch
2. **Install Dependencies** — `npm ci`
3. **Install Playwright Browsers** — installs Chromium with system dependencies
4. **Run Tests** — executes the full suite and generates the HTML report
5. **Post** — publishes the HTML report and archives screenshots and traces on failure

Test results and artifacts are available on the Jenkins build page under *Playwright Test Report*.

## Environment Variables

| Variable   | Description                  | Default                                    |
|------------|------------------------------|--------------------------------------------|
| `BASE_URL` | Base URL for the application | `http://jupiter.cloud.planittesting.com`   |
| `CI`       | Set to `true` in CI          | unset (local)                              |
| `HEADED`   | Set to any value to run headed | unset (headless)                         |

For local overrides, create a `.env` file in the project root (ignored by git)