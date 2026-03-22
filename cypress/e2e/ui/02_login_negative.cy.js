/// <reference types="cypress" />

const LoginPage = require('../../support/pages/LoginPage')

const BASE_URL       = 'https://closeout-r1fe.enetelsolutions.com/'
const WRONG_EMAIL    = 'wrong@example.com'
const WRONG_PASSWORD = 'WrongPassword!99'

describe('Login – Negative', () => {

  it('TC-UI-02 | Should show an error when logging in with invalid credentials', () => {
    LoginPage
      .visit(BASE_URL)
      .login(WRONG_EMAIL, WRONG_PASSWORD)
      .assertLoginFailed()
  })

})
