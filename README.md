# Playwright Automation Powered by AI


This repository contains Playwright automation tests enhanced with AI-based validation using Gemini AI.

---

## Prerequisites

Before setting up the project, ensure you have the following installed and configured:

1. **Node.js & npm**  
   - Download and install Node.js (LTS version recommended) from [https://nodejs.org/](https://nodejs.org/).  

2. **Java SDK**  
   - Install JDK 11 or higher.  
   - Set the `JAVA_HOME` environment variable to your JDK installation folder.  
   - Add `%JAVA_HOME%\bin` (Windows) or `$JAVA_HOME/bin` (Mac/Linux) to your system **PATH**.  
   - Required for running Allure reports.  

### Setup & Installation
Initialize your local environment with the following:

* `npm install`
* `npx playwright install`

### Running Tests
To execute the automation suite:
* `npx playwright test`

### Reporting
To view the execution results in Allure:
* `npx allure serve allure-results`

---

## Framework Coding Standards

To maintain a clean and consistent codebase, all contributors must strictly follow these rules:

### 1. Quote Guidelines
We distinguish between quote types based on **intent**:

| Quote Type | Rule | Example |
| :--- | :--- | :--- |
| **Single Quotes** (`' '`) | Use for **all static strings**, labels, and selectors. | `page.locator('#login-btn')` |
| **Backticks** (`` ` ` ``) | Use **ONLY** for string interpolation (adding variables). | `` `screenshots/${image}.png` `` |
| **Double Quotes** (`" "`) | **Do not use** at the top level. Use only nested inside `' '`. | `'[placeholder="Name"]'` |

### 2. Version Control & Pushing
* **Scoped Pushes:** Only stage and push the specific folder(s) that you have modified.
* **No `package.json` Updates:** **Do not** stage or push changes to `package.json` or `package-lock.json`. These files must remain untouched to prevent environment drift.

---

### Git Workflow Tip
To ensure you only push your specific changes and ignore the `package.json`, use specific path staging:

1. **Check status:** `git status`
2. **Stage your specific folder:** `git add 'tests/your-folder/'`
3. **Commit & Push:** `git commit -m 'feat: update specific tests' && git push`