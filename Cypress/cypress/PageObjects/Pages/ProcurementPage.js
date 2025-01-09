class ProcurementPage {
  constructor() {
    this.procurement = {
      procurementLink: 'a[href="#/ProcurementMain"]',
      settings: '//a[contains(text(),"Settings")]',
      currencySubTab: 'a[routerlink="CurrencyList"]',
      addCurrencyButton1: 'input[value="Add Currency"]',
      addCurrencyButton2: 'input#AddCurrency',
      currencyCode: 'input#CurrencyCode',
      currencyDescriptionField: 'input#Description',
      searchBar: 'input#quickFilterInput',
      currecnyCodeColum: 'div[col-id="CurrencyCode"]',
    };
  }

  /**
   * @Test5
   * @description This method navigates to the Purchase Request page, accesses the Currency Settings,
   *              adds a new currency with a unique code and description, and verifies that the new
   *              currency is successfully added to the table.
   *
   * @expected
   * The new currency should be added successfully and displayed in the table with the correct currency
   * code and description.
   */
  addCurrencyAndVerify() {
    const uniqueCurrencyCode = `CURR_${Math.floor(Math.random() * 9999)}`; // Generate a unique currency code
    const description = "Test Currency Description";

    // Navigate to the Currency Settings
    cy.get(this.procurement.procurementLink).click();
    cy.xpath(this.procurement.settings).click();
    cy.get(this.procurement.currencySubTab).click();

    // Click "Add Currency" button
    cy.get(this.procurement.addCurrencyButton1).click();

    // Fill in currency details
    cy.get(this.procurement.currencyCode).type(uniqueCurrencyCode);
    cy.get(this.procurement.currencyDescriptionField).click();
    cy.get(this.procurement.currencyDescriptionField).type(description);

    // Click "Add Currency"
    cy.get(this.procurement.addCurrencyButton2).click();

    // Wait for table to load
    cy.wait(2000);

    cy.get(this.procurement.searchBar).type(uniqueCurrencyCode, { delay: 100 });
    cy.wait(2000);

    // Verify newly added currency is in the table
    cy.get(this.procurement.currecnyCodeColum)
      .eq(1)
      .should('have.text', uniqueCurrencyCode);
  }
}

export default ProcurementPage;