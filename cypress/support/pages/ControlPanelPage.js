class ControlPanelPage {

  // Selectors
  get controlPanelLink()   { return cy.get('[ng-reflect-router-link="/control-panel"]') }
  get projectSearchInput() { return cy.get('input[placeholder="Search projects"]') }
  get siteSearchInput()    { return cy.get('input[placeholder="Search Sites"]') }

  // Actions
  navigate() {
    this.controlPanelLink.click()
    return this
  }

  searchProject(projectName) {
    this.projectSearchInput
      .should('exist')
      .type(projectName, { force: true })
    return this
  }

  searchSite(siteName) {
    this.siteSearchInput
      .should('exist')
      .type(siteName, { force: true })
    return this
  }
}

module.exports = new ControlPanelPage()
