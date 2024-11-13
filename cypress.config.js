const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').default;
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function deleteReportsFolder() {
  const reportsPath = path.join(__dirname, 'cypress/reports');
  if (fs.existsSync(reportsPath)) {
    fs.readdirSync(reportsPath).forEach((file) => {
      const curPath = path.join(reportsPath, file);
      if (file !== 'merged-report.json' && fs.statSync(curPath).isFile()) {
        console.log(`Deleting file: ${curPath}`);
        fs.unlinkSync(curPath);
      }
    });
  }
}

module.exports = defineConfig({
  e2e: {
     setupNodeEvents(on, config) {
      const bundler = createBundler({ plugins: [createEsbuildPlugin(config)] });
      on('file:preprocessor', bundler);

      on('before:run', () => {
        deleteReportsFolder();
      });

      on('after:run', () => {
        try {
          execSync('npm run merge-report', { stdio: 'inherit' });
        } catch (error) {
          console.error('Failed to run the merge-report script:', error);
        }
      });

      on('after:screenshot', (details) => {
        console.log(`Screenshot taken: ${details.path}`);
        try {
          const videoPath = details.path
            .replace('screenshots', 'videos')
            .replace('.png', '.mp4');
          console.log(`Video path: ${videoPath}`);
        } catch (error) {
          console.error('Error processing screenshot path:', error);
        }
      });

       addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.feature',
    supportFile: 'cypress/support/index.js',
    stepDefinitions: 'cypress/StepDefinitions/**/*.cy.js',
    reporter: "cypress-multi-reporters", 
    reporterOptions: {
      reporterEnabled: "mochawesome", 
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports", 
        overwrite: false, 
        html: true, 
        json: true,
        inline: true, 
      },
    },
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
