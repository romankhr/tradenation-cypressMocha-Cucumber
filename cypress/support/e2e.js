Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('Uncaught exception:', err);
    return false; // Prevent Cypress from failing the test
  });
  