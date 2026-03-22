class SitePage {

  // Selectors
  get uploadButton() { return cy.get('[ng-reflect-ngb-tooltip="Upload document"]') }
  get fileInput()    { return cy.get('input[type="file"]') }
  get doneButton()   { return cy.get('button.btn-success').contains('Done') }

  siteItem(siteName) {
    return cy.get('jhi-location-item').contains(siteName)
  }

  photoNode(nodeName) {
    return cy.get('jhi-template-tree-node-info').contains(nodeName)
  }

  // Actions
  openSite(siteName) {
    this.siteItem(siteName)
      .should('be.visible')
      .click()
    return this
  }

  openPhotoNode(nodeName) {
    this.photoNode(nodeName)
      .should('be.visible')
      .click()
    return this
  }

  /**
   * Uploads a photo and captures the upload timestamp immediately after.
   * The timestamp is stored as a Cypress alias (@uploadTime) so assertions
   * can scope to the exact document card that was just uploaded.
   *
   * @param {string} imagePath  Full path to the image file
   *                            (returned by the generateUniqueImage task)
   */
  uploadPhoto(imagePath) {
    cy.intercept('POST', '**/placeholders/photos/upload**').as('uploadRequest')

    this.uploadButton
      .should('be.visible')
      .click()

    this.fileInput
      .selectFile(imagePath, { force: true })

    this.doneButton
      .should('be.visible')
      .click()

    cy.wait('@uploadRequest', { timeout: 30000 }).then((interception) => {
      cy.log('Upload response status: ' + interception.response.statusCode)
    })

    // Capture the current time in the same format the app displays
    // e.g. "5:25 PM" — used to scope assertions to this exact upload
    cy.then(() => {
      const now        = new Date()
      const hours      = now.getHours() % 12 || 12
      const minutes    = now.getMinutes().toString().padStart(2, '0')
      const ampm       = now.getHours() >= 12 ? 'PM' : 'AM'
      const uploadTime = `${hours}:${minutes} ${ampm}`
      cy.log('Upload time captured: ' + uploadTime)
      cy.wrap(uploadTime).as('uploadTime')
    })

    return this
  }

  // Assertions

  /**
   * Finds the document card matching the upload timestamp
   * and asserts the green accepted icon is visible inside it.
   */
  assertPhotoAccepted() {
    cy.get('@uploadTime').then((uploadTime) => {
      cy.get('jhi-control-panel-document-view', { timeout: 120000 })
        .contains(uploadTime)
        .closest('jhi-control-panel-document-view')
        .find('[ng-reflect-ngb-tooltip="Accepted"]')
        .should('be.visible')
        .find('img[alt="accepted"]')
        .should('exist')
    })
    return this
  }

  /**
   * Finds the document card matching the upload timestamp
   * and asserts the red rejected icon is visible inside it.
   */
  assertPhotoRejected() {
    cy.get('@uploadTime').then((uploadTime) => {
      cy.get('jhi-control-panel-document-view', { timeout: 120000 })
        .contains(uploadTime)
        .closest('jhi-control-panel-document-view')
        .find('[ng-reflect-ngb-tooltip="Rejected"]')
        .should('be.visible')
        .find('img[alt="rejected"]')
        .should('exist')
    })
    return this
  }
}

module.exports = new SitePage()
