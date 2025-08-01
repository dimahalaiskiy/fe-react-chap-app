// ***********************************************************
// This is a support file that will run before all tests.
// You can use it to set up your testing environment and add custom commands.
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively, you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app.document.createElement("style");
  style.innerHTML = ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");
  app.document.head.appendChild(style);
}

// Prevent TypeScript errors
Cypress.on("uncaught:exception", (err) => {
  // returning false here prevents Cypress from failing the test
  if (err.message.includes("ResizeObserver loop limit exceeded")) {
    return false;
  }
  return true;
});
