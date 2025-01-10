import path from "path";

export default class SubstorePage {
    constructor() {
        this.substore = {
            substoreLink: 'a[href="#/WardSupply"]',
            selectSubstore: '(//span[@class="report-name"])[1]',
            inventoryRequisition: 'a[href="#/WardSupply/Inventory/InventoryRequisitionList"]',
            consumption: 'a[href="#/WardSupply/Inventory/Consumption"]',
            reports: 'a[href="#/WardSupply/Inventory/Reports"]',
            patientConsumption: 'a[href="#/WardSupply/Inventory/PatientConsumption"]',
            return: 'a[href="#/WardSupply/Inventory/Return"]',
            inventory: 'ul.page-breadcrumb a[href="#/WardSupply/Inventory"]',
            signoutCursor: 'i.fa-sign-out',
            tooltip: 'div.modal-content h6',
        }
    }

    /**
     * @Test11
     * @description : This method verifies that the user is able to navigate between the sub modules.
     * @expected : Ensure that it should navigate to each sections of the "substore" module 
     */
    verifyNavigationBetweenSubmodules() {
        // Step 1: Click on the "Substore" link
        cy.get(this.substore.substoreLink).click();

        // Step 2: Select the substore
        cy.xpath(this.substore.selectSubstore).click();

        // Step 3: Click on the "Inventory Requisition" tab
        cy.xpath(this.substore.inventoryRequisition).click();
        cy.url().should('contain', "Inventory/InventoryRequisitionList");

        // Step 4: Click on the "Consumption" tab
        cy.xpath(this.substore.consumption).click();
        cy.url().should('contain', "Inventory/Consumption/ConsumptionList");

        // Step 5: Click on the "Reports" tab
        cy.xpath(this.substore.reports).click();
        cy.url().should('contain', "Inventory/Reports");

        // Step 6: Click on the "Patient Consumption" tab
        cy.xpath(this.substore.patientConsumption).click();
        cy.url().should('contain', "Inventory/PatientConsumption/PatientConsumptionList");

        // Step 7: Click on the "Return" tab
        cy.xpath(this.substore.return).click();
        cy.url().should('contain', "Inventory/Return");
    }

    /**
    * @Test12
    * @description This method verifies the tooltip text displayed when hovering over the cursor icon in the Inventory tab.
    * @expected
    * Tooltip text should contain: **"To change, you can always click here."**
    */
    verifyTooltipText() {
        // Step 1: Click on the "Substore" link
        cy.get(this.substore.substoreLink).click();

        // Step 2: Select the substore
        cy.xpath(this.substore.selectSubstore).click();

        // Step 3: Click on the "Inventory" tab
        cy.get(this.substore.inventory).click();

        // Step 4: Hover over the cursor icon
        cy.get(this.substore.signoutCursor).trigger('mouseover');

        // Step 5: Verify the tooltip text
        cy.get(this.substore.tooltip)
            .invoke("text")
            .then((tooltipText) => {
                expect(tooltipText.trim()).to.contain("To change, you can always click here.");
            });
    }

    /**
     * @Test13
     * @description This method navigates to the Inventory Requisition section, captures a screenshot of the page, 
     *              and saves it in the screenshots folder.
     * @expected
     * Screenshot of the page is captured and saved successfully.
     */
    captureInventoryRequisitionScreenshot() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const screenshotPath = `../../screenshots/inventory-requisition-${timestamp}.png`;
        // const screenshotPath = path.join(__dirname, `../screenshots/inventory-requisition-${timestamp}.png`);

        // Step 1: Click on the "Substore" link
        cy.get(this.substore.substoreLink).click();

        // Step 2: Select the substore
        cy.xpath(this.substore.selectSubstore).click();

        // Step 3: Click on the "Inventory" tab
        cy.get(this.substore.inventory).click();

        // Step 4: Click on the "Inventory Requisition" section
        cy.xpath(this.substore.inventoryRequisition).click();
        cy.url().should('contain', "Inventory/InventoryRequisitionList");

        // Step 5: Take a screenshot of the current page
        cy.screenshot(screenshotPath, { capture: 'fullPage' });
    }
}