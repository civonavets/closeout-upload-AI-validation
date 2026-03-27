/// <reference types="cypress" />

const LoginPage        = require('../../support/pages/LoginPage')
const ControlPanelPage = require('../../support/pages/ControlPanelPage')
const SitePage         = require('../../support/pages/SitePage')
const data             = require('../../fixtures/credentials.json')

describe('Photo Upload & AI Validation – Accepted', () => {

  after(() => {
    cy.task('cleanupGeneratedImages')
  })

  it('TC-UI-03 | Should upload a hardhat photo and verify it is ACCEPTED', () => {
    cy.task('generateUniqueImage', 'hardhat').then((imagePath) => {
      LoginPage.visit(data.baseUrl).login(data.email, data.password)
      ControlPanelPage.navigate().searchProject(data.project).searchSite(data.site)
      SitePage.openSite(data.site)
              .openPhotoNode(data.photoNode)
              .uploadPhoto(imagePath)
              .assertPhotoAccepted()
    })
  })

})