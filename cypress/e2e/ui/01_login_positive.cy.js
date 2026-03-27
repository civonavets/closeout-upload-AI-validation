/// <reference types="cypress" />

const LoginPage = require('../../support/pages/LoginPage')
const data      = require('../../fixtures/credentials.json')

describe('Login – Positive', () => {

  it('TC-UI-01 | Should log in successfully with valid credentials', () => {
    LoginPage
      .visit(data.baseUrl)
      .login(data.email, data.password)
      .assertLoginSuccess()
  })

})