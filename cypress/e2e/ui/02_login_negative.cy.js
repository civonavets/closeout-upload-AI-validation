/// <reference types="cypress" />

const LoginPage = require('../../support/pages/LoginPage')
const data      = require('../../fixtures/credentials.json')

describe('Login – Negative', () => {

  it('TC-UI-02 | Should show an error when logging in with invalid credentials', () => {
    LoginPage
      .visit(data.baseUrl)
      .login(data.invalidEmail, data.invalidPassword)
      .assertLoginFailed()
  })

})