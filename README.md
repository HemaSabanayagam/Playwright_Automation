# Playwright Automation Framework

This project is built using **Playwright**, **TypeScript**, and **Cucumber (BDD)** to automate both UI and API testing.

For UI automation, I used the **SauceDemo** application to automate the complete purchase flow, along with positive and negative scenarios. For API automation, I used the **Restful Booker API** to practice CRUD operations. The framework follows the **Page Object Model (POM)** to keep the code easy to maintain and reuse, and also includes **data-driven testing, visual (snapshot) testing, cross-browser execution, parallel execution, reporting, and Azure DevOps CI/CD**.

---

## Tech Stack

- Playwright (UI + API testing)
- TypeScript
- Page Object Model (POM)
- Visual Testing
- Cucumber (BDD)
- HTML and Allure (for reporting)
- Node.js
- Git & GitHub
- Azure DevOps (CI/CD)

---

## Project Features

### UI Automation
- Login validation — positive and negative scenarios
- Add products to cart
- Complete checkout flow
- Verify order confirmation
- Page Object Model (POM)
- Cucumber feature files and step definitions
- Data-driven testing using Scenario Outline and Examples
- Tags (`@e2e`, `@regression`, `@critical`, etc.) for selective test execution

### API Automation
- Create Booking
- Get Booking
- Update Booking
- Delete Booking
- APIRequestContext

### Visual Testing
- Screenshot comparison for key pages/flows
- Snapshots stored and compared under the `visual-testing` folder

### Cross Browser & Parallel Execution
- Tests can run across Chrome, Safari, and Firefox
- Parallel execution using multiple workers

---

## Framework Configuration

- Chrome is enabled by default in the Playwright configuration. Safari and Firefox are also configured and can be run as needed.
- Tests run with **1 retry** and a **30-second timeout** per test.
- On test failure, Playwright automatically captures:
  - Screenshot
  - Video (on retry)
  - Trace
- These artifacts, along with the HTML and Allure reports, make debugging failures a lot faster.

---

## Project Structure

```text
playwright-ecommerce-framework
│
├── api
├── features
├── pages
├── reports
├── screenshots
├── test-data
├── utils
├── visual-testing
├── playwright.config.ts
├── playwright.yml
├── package.json
└── README.md
```
---

## Getting Started

### Clone the repository
```bash
git clone <repository-url>
```

### Install dependencies
```bash
npm install
```

### Install Playwright browsers
```bash
npx playwright install
```

---

## Running the Tests

### Run UI Tests
```bash
npm run regression
```

### Run API Tests
```bash
npm run API
```

### Run in parallel (via command line)
```bash
npx playwright test --workers=3
```

### Run by tag
```bash
npx cucumber-js --tags "@regression"
```

---

## Test Reports

After test execution, the framework generates:

- Cucumber HTML Report
- Allure Report
- Playwright Trace
- Screenshots (on failure)
- Video Recording (on retry)

These reports are excluded from version control (see `.gitignore`) and are meant to be generated locally or picked up as pipeline artifacts in CI/CD.

---

## Environment Variables

The project uses a `.env` file to store environment-specific values such as URLs.

Example:
```env
BASE_URL=https://www.saucedemo.com/
API_BASE_URL=https://restful-booker.herokuapp.com
```

The `.env` file is not committed to GitHub. A `.env.example` file is provided instead, as a reference for what values are needed.

---

## CI/CD

This project is integrated with **Azure DevOps Pipelines** for Continuous Integration and Continuous Deployment.

The pipeline:
- Installs project dependencies
- Installs Playwright browsers
- Runs the automation tests
- Publishes the test results

The pipeline configuration is available in the `playwright.yml` file.

---
