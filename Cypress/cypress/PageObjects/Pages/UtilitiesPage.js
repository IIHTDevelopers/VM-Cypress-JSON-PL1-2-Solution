export default class UtilitiesPage {
  constructor() {
    this.utilities = {
      utilitiesLink: "//span[text()='Utilities']",
      schemeRefundTab: 'ul.page-breadcrumb a[href="#/Utilities/SchemeRefund"]',
      counterItem: "//div[@class='counter-item']",
      newSchemenRefundEntryButton: "//a[contains(text(),'New Scheme Refund Entry')]",
      saveSchemeRefundButton: "button#savebutton",
      warningPopup: "//p[contains(text(),'warning')]/../p[contains(text(),'Please fill all the mandatory fields.')]",
    };
  }

  /**
   * @Test6
   * @description This method verifies that a warning popup is displayed when attempting to save a new
   *              Scheme Refund Entry without filling in mandatory fields.
   * @expected
   * A warning popup should appear with the message: "Please fill all the mandatory fields."
   */
  verifyMandatoryFieldsWarning() {
    // Navigate to Utilities and open Scheme Refund tab
    cy.xpath(this.utilities.utilitiesLink).click();
    cy.get(this.utilities.schemeRefundTab).click();

    // Select first counter item if available
    cy.wait(3000); // Wait for 3 seconds
    cy.xpath(this.utilities.counterItem)
      .then(($counterItems) => {
        const counterCount = $counterItems.length;
        console.log("counter count is " + counterCount);
        if (counterCount > 0) {
          cy.wrap($counterItems.first()).click();
        } else {
          console.log("No counter items available");
        }
      });

    // Click "New Scheme Refund Entry" button
    cy.xpath(this.utilities.newSchemenRefundEntryButton).click();

    // Click Save without filling any fields
    cy.get(this.utilities.saveSchemeRefundButton).click();

    // Wait for warning popup and verify its visibility
    cy.xpath(this.utilities.warningPopup)
      .should("be.visible")
      .then(($warningPopup) => {
        const popupMessage = $warningPopup.text().trim();
        console.log(`popup >> ${popupMessage}`);
        expect(popupMessage).to.equal("Please fill all the mandatory fields.");
      });
  }
}