/// <reference types="cypress" />

const LoginPage        = require('../../support/pages/LoginPage')
const ControlPanelPage = require('../../support/pages/ControlPanelPage')
const SitePage         = require('../../support/pages/SitePage')
const data             = require('../../fixtures/credentials.json')

describe('Photo Upload & AI Validation – Rejected', () => {

  after(() => {
    cy.task('cleanupGeneratedImages')
  })

  it('TC-UI-04 | Should upload a no-hardhat photo and verify it is REJECTED', () => {
    cy.task('generateUniqueImage', 'no_hardhat').then((imagePath) => {
      LoginPage.visit(data.baseUrl).login(data.email, data.password)
      ControlPanelPage.navigate().searchProject(data.project).searchSite(data.site)
      SitePage.openSite(data.site)
      SitePage.openPhotoNode(data.photoNode)
      SitePage.uploadPhoto(imagePath)
      SitePage.assertPhotoRejected()
    })
  })

})