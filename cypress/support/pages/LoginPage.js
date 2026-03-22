class LoginPage {

  // Selectors
  get emailInput()    { return cy.get('input[type="email"]') }
  get passwordInput() { return cy.get('input[name="password"]') }
  get submitButton()  { return cy.get('button[type="submit"]') }
  get errorMessage()  { return cy.get('.text-danger') }

  // Actions
  visit(url) {
    cy.visit(url)
    return this
  }

  login(email, password) {
    this.emailInput.type(email)
    this.passwordInput.type(password)
    this.submitButton.click()
    return this
  }

  // Assertions
  assertLoginSuccess() {
    cy.get('.dropdown-toggle', { timeout: 15000 }).should('be.visible')
    return this
  }

  assertLoginFailed() {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', 'Failed to sign in!')
    return this
  }
}

module.exports = new LoginPage()
