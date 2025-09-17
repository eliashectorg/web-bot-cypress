const { defineConfig } = require("cypress")
const fs = require("fs-extra")
const path = require("path")

function removeFolder(folderName) {
  return fs.remove(path.join(__dirname, folderName)).then(() => null)
}

module.exports = defineConfig({
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions: {
  reportDir: 'reports/mochawesome',
  overwrite: false,
  html: true,
  json: true,
  embeddedScreenshots: true,
  inlineAssets: true,
  reportFilename: '[status]-[name]-[datetime]'
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        deleteFolder(folderName) {
          return removeFolder(folderName)
        },
      })

      // Read the target environment passed from CLI (--env target=OrangeHRMWeb)
      const target = config.env.target;
      if (!target) {
        throw new Error("You must specify --env target=OrangeHRMWeb or --env target=EcommerceWeb");
      }

      // Load all environments defined in cypress.env.json
      const targets = config.env;

      // Validate that the provided target exists in cypress.env.json
      if (!targets[target]) {
        throw new Error(`Configuration for target '${target}' was not found in cypress.env.json`);
      }

      // Set the baseUrl dynamically based on the selected target
      config.baseUrl = targets[target].url;

      // If username/password exist for the target, inject them into Cypress.env
      if (targets[target].username) config.env.username = targets[target].username;
      if (targets[target].password) config.env.password = targets[target].password;

      // Return the updated config
      return config;
    },
    downloadsFolder: "cypress/downloads",
    specPattern: "cypress/e2e/**/*.spec.js",
  },
})