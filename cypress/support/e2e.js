// Global support file — runs before every spec

Cypress.on('uncaught:exception', () => {
  // Prevent third-party script errors from failing tests
  return false
})
