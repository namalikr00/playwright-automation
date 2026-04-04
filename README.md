# playwright-automation
Playwright automation framework

# Playwright E2E Test Automation Framework

This repository contains the end-to-end (E2E) automated tests for the **GBank Commercial**, **CRBT Commercial** applications, built using the Playwright framework. The framework is designed to be robust, maintainable, and easy to use.

## Table of Contents

*   [Features](#features)
*   [Prerequisites](#prerequisites)
*   [Installation](#installation)
*   [Configuration](#configuration)
    *   [Environment Variables](#environment-variables)
*   [Running the Tests](#running-the-tests)
    *   [Run All Tests](#run-all-tests)
    *   [Run in Headed Mode](#run-in-headed-mode)
    *   [Run a Specific Test File](#run-a-specific-test-file)
    *   [Run in UI Mode](#run-in-ui-mode)
    *   [Run with Debugging](#run-with-debugging)
*   [Viewing Test Reports](#viewing-test-reports)
*   [Project Structure](#project-structure)

## Features

*   **Cross-Browser Testing:** Tests are configured to run on Chromium, Firefox, and WebKit.
*   **Page Object Model (POM):** Promotes code reusability and maintainability by separating test logic from UI locators.
*   **Environment Configuration:** Supports different environments (e.g., Dev, QA, Production) through `.env` files.
*   **CI/CD Ready:** Includes a GitHub Actions workflow for automated test execution.
*   **HTML Reporting:** Generates detailed HTML reports with test results, traces, screenshots, and videos.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
*   Node.js (v18 or higher recommended)
*   NPM or Yarn

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repo_url>
    cd your-repo-name
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    This command downloads the browser binaries (Chromium, Firefox, WebKit) needed for testing.
    ```bash
    npx playwright install
    ```

## Configuration

### Environment Variables
The framework uses environment variables to manage test configuration for different environments (e.g., base URL, user credentials).

1.  Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```

2.  Update the `.env` file with the appropriate values for your test environment:
    ```dotenv
    # Base URL of the application under test
    BASE_URL=https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/login
    ```

## Running the Tests

You can run the tests using various commands depending on your needs.

### Run All Tests
This command runs all tests in headless mode across all configured browsers.
```bash
npx playwright test

Run in Headed Mode
To watch the tests execute in a browser window, run them in headed mode.
bash
npx playwright test --headed

Run a Specific Test File
To run a single test file, specify its path.
bash
npx playwright test tests/your-test-file.spec.js

Run in UI Mode
Playwright's UI Mode provides a powerful time-traveling debugger.
bash
npx playwright test --ui

Run with Debugging
To debug a test step-by-step, use the --debug flag.
bash
npx playwright test --debug

Viewing Test Reports
After each test run, an HTML report is automatically generated in the playwright-report directory.
To view the latest report, run the following command:
bash
npx playwright show-report

Project Structure
The project follows a standard structure for scalability and maintainability.
.
├── .github/workflows/      # CI/CD configuration (e.g., GitHub Actions)
├── pageObjects/            # Page Object Model classes
├── tests/                  # Test files (`.spec.js`)
├── test-data/              # Test data files (e.g., JSON fixtures)
├── .env                    # Environment variables (local, not committed)
├── .env.example            # Example environment file
├── playwright.config.js    # Playwright configuration file
└── README.md
