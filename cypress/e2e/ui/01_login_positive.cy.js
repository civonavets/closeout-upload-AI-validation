/// <reference types="cypress" />

const LoginPage = require('../../support/pages/LoginPage')

const BASE_URL = 'https://closeout-r1fe.enetelsolutions.com/'
const EMAIL    = 'tebahe2307@onbap.com'
const PASSWORD = 'Closeout!123'

describe('Login – Positive', () => {

  it('TC-UI-01 | Should log in successfully with valid credentials', () => {
    LoginPage
      .visit(BASE_URL)
      .login(EMAIL, PASSWORD)
      .assertLoginSuccess()
  })

})
