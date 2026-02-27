# PlaywrightAutomation

### Setup & Installation
Initialize your local environment with the following:

* `npm install`
* `npx playwright install`

### Running Tests
To execute the automation suite:
* `npx playwright test`

### Reporting
To view the execution results in Allure:
* `npx allure serve 'allure-results'`

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