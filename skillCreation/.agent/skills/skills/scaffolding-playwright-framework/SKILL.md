---
name: scaffolding-playwright-framework
description: Creates a complete, production-ready Playwright automation framework in Javascript. Includes Page Object Model (POM) architecture, custom reporters, and adherence to creating robust automation guidelines. Use when the user wants to scaffold a new testing project, sets up a framework "from scratch", or requests a specific domain automation setup.
---

# Scaffolding Playwright Framework

## When to use this skill
- User wants to start a new Playwright project from scratch.
- User needs a production-ready POM architecture.
- User requests a framework with custom reporting and robust guidelines.
- Scaffolding a specific domain automation setup (e.g., "build an e-commerce test suite").

## Workflow

1.  **Project Initialization**:
    - [ ] Create project directory and initialize `npm`.
    - [ ] Install Playwright and dependencies.
2.  **Configuration**:
    - [ ] Setup `playwright.config.js` with best practices (headless, retries, etc.).
    - [ ] Configure multiple browsers and viewports.
3.  **Architecture Setup**:
    - [ ] Create `pages/` directory for POM.
    - [ ] Create `tests/` directory for spec files.
    - [ ] Create `utils/` or `reporters/` for custom logic.
4.  **Base Components**:
    - [ ] Implement `BasePage` for common actions.
    - [ ] Implement a sample Page Object and Test Spec.
5.  **Custom Reporter**:
    - [ ] Implement a basic custom reporter for enhanced visibility.
6.  **Validation**:
    - [ ] Run a sample test to confirm setup.

## Instructions

### 1. Robust Automation Guidelines
*   **Locators**: Prefer User-Facing Locators (e.g., `getByRole`, `getByText`) over CSS/XPath which are prone to change.
*   **Auto-waiting**: Leverage Playwright's built-in auto-waiting; avoid hard-coded `sleep` or `waitForTimeout`.
*   **Isolation**: Each test should be independent. Use `beforeEach` for setup and `afterEach` for cleanup.
*   **Data-Driven**: Externalize test data into JSON or environment variables for maintainability.

### 2. File Templates

#### Playwright Configuration (`playwright.config.js`)
```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['./reporters/custom-reporter.js']
  ],
  use: {
    baseURL: 'https://example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
```

#### Base Page Object (`pages/BasePage.js`)
```javascript
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '') {
    await this.page.goto(path);
  }

  async click(locator) {
    await locator.click();
  }

  async type(locator, text) {
    await locator.fill(text);
  }

  async getText(locator) {
    return await locator.innerText();
  }
}

module.exports = { BasePage };
```

#### Custom Reporter (`reporters/custom-reporter.js`)
```javascript
class CustomReporter {
  onBegin(config, suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test) {
    console.log(`>> Starting test: ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`<< Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result) {
    console.log(`Finished the run: ${result.status}`);
  }
}

module.exports = CustomReporter;
```

## Resources
- [Scripts directory](scripts/)
- [Playwright Documentation](https://playwright.dev/)
- [POM Best Practices](https://playwright.dev/docs/pom)
