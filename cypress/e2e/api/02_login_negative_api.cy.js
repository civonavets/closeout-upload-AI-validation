/// <reference types="cypress" />

const { generateUUID } = require('../../support/helpers')
const data             = require('../../fixtures/credentials.json')

const INVALID_USER = {
  username: data.invalidEmail,
  password: data.invalidPassword,
  deviceId: generateUUID(),
}

describe('API – Login Negative', () => {

  it('TC-API-02 | Should return 400 and error body for invalid credentials', () => {
    cy.request({
      method:           'POST',
      url:              `${data.apiUrl}/regions/oauth2/token`,
      body:             INVALID_USER,
      headers:          { 'Content-Type': 'application/json' },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error_code).to.be.a('string').and.have.length.greaterThan(0)
      expect(res.body.details).to.be.a('string').and.have.length.greaterThan(0)
      expect(res.body.tokens).to.be.undefined
    })
  })

})