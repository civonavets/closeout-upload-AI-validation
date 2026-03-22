/// <reference types="cypress" />

const LoginPage        = require('../../support/pages/LoginPage')
const ControlPanelPage = require('../../support/pages/ControlPanelPage')
const SitePage         = require('../../support/pages/SitePage')

const BASE_URL   = 'https://closeout-r1fe.enetelsolutions.com/'
const EMAIL      = 'tebahe2307@onbap.com'
const PASSWORD   = 'Closeout!123'
const PROJECT    = 'Test Project 843'
const SITE       = 'Test Site 7'
const PHOTO_NODE = 'test photo'

describe('Photo Upload & AI Validation – Accepted', () => {

  after(() => {
    cy.task('cleanupGeneratedImages')
  })

  it('TC-UI-03 | Should upload a hardhat photo and verify it is ACCEPTED', () => {
    cy.task('generateUniqueImage', 'hardhat').then((imagePath) => {
      LoginPage.visit(BASE_URL).login(EMAIL, PASSWORD)
      ControlPanelPage.navigate().searchProject(PROJECT).searchSite(SITE)
      SitePage.openSite(SITE)
      SitePage.openPhotoNode(PHOTO_NODE)
      SitePage.uploadPhoto(imagePath)
      SitePage.assertPhotoAccepted()
    })
  })

})
