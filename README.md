# 🌐 Cypress E2E Tests

- **OrangeHRM Demo** → https://opensource-demo.orangehrmlive.com  
- **ChatBot (Presión y Diamantes)** → https://www.presionydiamantes.com 

It uses **Cypress** for testing and **GitHub Actions** for CI/CD.  
Test reports are generated with **Mochawesome** (HTML).

## Run tests locally

### OrangeHRM
- **Open in interactive mode (Cypress Test Runner):**
  ```bash
  npm run cy:open:hrm

- **Run in headless mode (CLI):**
  ```bash
  npm run cy:run:hrm:ordered

### E-Commerce (ChatBot)
- **Open in interactive mode (Cypress Test Runner):**
  ```bash
  npm run cy:open:bot

- **Run in headless mode (CLI):**
  ```bash
  npm run cy:run:bot:bot

### Run everything (OrangeHRM + E-Commerce (ChatBot))
- **Run in headless mode sequential (CLI):**
  ```bash
  npm run cy:test:all


## ⚙️ CI/CD with GitHub Actions

**Pipeline file:**  
`.github/workflows/cypress.yml`

### How it runs
- Automatically on every **push** to the `main` branch.
- Automatically on every **Pull Request** targeting `main`.
- Can also be triggered manually:
  1. Go to the **Actions** tab in the GitHub repository.
  2. Select the workflow **“Cypress E2E (OrangeHRM + ChatBot)”**.
  3. Click **“Run workflow”** and choose the branch (example: `main`).

### Results
- Tests generate **JSON reports** which are merged into a **Mochawesome HTML report**.  
- The report is uploaded as an **Artifact** named `mochawesome-report`.  
- To view it:  
  1. Go to **Actions → your workflow run**.  
  2. Download the artifact **`mochawesome-report`**.  
  3. Unzip and open **`report.html`** in your browser. 