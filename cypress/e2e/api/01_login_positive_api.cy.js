/// <reference types="cypress" />

const { generateUUID } = require('../../support/helpers')

const BASE_URL = 'https://closeout-r1.enetelsolutions.com'

const VALID_USER = {
  username: 'tebahe2307@onbap.com',
  password: 'Closeout!123',
  deviceId: generateUUID(),
}

describe('API – Login Positive', () => {

  it('TC-API-01 | Should return 200 and a valid token for valid credentials', () => {
    cy.request({
      method:           'POST',
      url:              `${BASE_URL}/regions/oauth2/token`,
      body:             VALID_USER,
      headers:          { 'Content-Type': 'application/json' },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(200)

      const region = res.body[0]
      expect(region.name).to.eq('Region 1')
      expect(region.base_uri).to.eq('https://closeout-r1.enetelsolutions.com')

      const token = region.tokens[0]
      expect(token.token_type).to.eq('bearer')
      expect(token.tenant_name).to.eq('Testing only')
      expect(token.tenant_id).to.eq(13)
      expect(token.access_token).to.be.a('string').and.have.length.greaterThan(10)
      expect(token.refresh_token).to.be.a('string').and.have.length.greaterThan(10)
    })
  })

})