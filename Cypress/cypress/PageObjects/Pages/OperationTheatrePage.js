export default class OperationTheatrePage {
    constructor() {
      this.otBooking = {
        operationTheatreLink: 'a[href="#/OperationTheatre"]',
        newOtBookingButton: '//button[contains(text(),"New OT Booking")]',
        addNewOtButton: 'input[value="Add New OT"]',
        modalHeading: 'div.modelbox-div',
      };
    }
  
    /**
     * @Test2
     * @description This method verifies and handles the alert for OT booking without patient selection.
     */
    handleOtBookingAlert() {
      // Click on the "Operation Theatre" link
      cy.get(this.otBooking.operationTheatreLink).click();
  
      // Click on the "New OT Booking" button
      cy.xpath(this.otBooking.newOtBookingButton).click();
  
      // Verify the modal is displayed
      cy.get(this.otBooking.modalHeading).should("be.visible");
  
      // Click on the "Add New OT" button
      cy.get(this.otBooking.addNewOtButton).click();
  
      // Wait for and handle the alert
      cy.on("window:alert", (alertMessage) => {
        cy.log("Alert message: " + alertMessage);
        expect(alertMessage).to.contain(
          "Patient not Selected! Please Select the patient first!"
        );
      });
    }
  }
  