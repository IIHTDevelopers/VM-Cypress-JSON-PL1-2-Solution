export default class SettingsPage {
  constructor() {
    this.settings = {
      settingsLink: 'a[href="#/Settings"]',
      moreDropdown: '//a[contains(text(),"More...")]',
      priceCategoryTab: 'ul.dropdown-menu a[href="#/Settings/PriceCategory"]',
      disableButton: (code) => `//div[text()="${code}"]/../div/span/a[@danphe-grid-action="deactivatePriceCategorySetting"]`,
      enableButton: (code) => `//div[text()="${code}"]/../div/span/a[@danphe-grid-action="activatePriceCategorySetting"]`,
      activateSuccessMessage: '//p[contains(text(),"success")]/../p[text()="Activated."]',
      deactivateSuccessMessage: '//p[contains(text(),"success")]/../p[text()="Deactivated."]',
    }
  }

  /**
   * @Test10
   * @description This method verifies disabling and enabling a price category code in the table.
   * @expected
   * A success message is displayed for both actions: "Deactivated." for disabling and "Activated." for enabling.
   */
  togglePriceCategoryStatus() {
    // Step 1: Click on the "Settings" link
    cy.get(this.settings.settingsLink).click();

    // Step 2: Open the "more..." dropdown and select the "Price Category" tab
    cy.xpath(this.settings.moreDropdown).click();
    cy.get(this.settings.priceCategoryTab).click();

    // Step 3: Disable the specified code
    cy.xpath(this.settings.disableButton("NHIF-1")).click();

    // Step 4: Verify the "Deactivated." success message
    cy.xpath(this.settings.deactivateSuccessMessage)
      .should("be.visible")
      .then(($deactivateMessage) => {
        const deactivateMessage = $deactivateMessage.text().trim();
        expect(deactivateMessage).to.equal("Deactivated.");
      });

    // Step 5: Enable the same code
    cy.xpath(this.settings.enableButton("NHIF-1")).click();

    // Step 6: Verify the "Activated." success message
    cy.xpath(this.settings.activateSuccessMessage)
      .should("be.visible")
      .then(($activateMessage) => {
        const activateMessage = $activateMessage.text().trim();
        expect(activateMessage).to.equal("Activated.");
      });
  }
}