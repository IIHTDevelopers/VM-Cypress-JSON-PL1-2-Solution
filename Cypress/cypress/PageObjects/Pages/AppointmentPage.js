import dayjs from "dayjs";

class AppointmentPage {
  constructor() {
    this.appointment = {
      appointmentLink: 'a[href="#/Appointment"]',
      counterItem: "//div[@class='counter-item']",
      appointmentBookingList: 'ul.page-breadcrumb li a[href="#/Appointment/ListAppointment"]',
      visitTypeDropdown: 'select[name="VistType"]',
      fromDate: '(//input[@id="date"])[1]',
      showPatient: '//button[contains(text(),"Show Patient")]',
      visitTypeColumn: 'div[col-id="AppointmentType"]',
    };
  }

  /**
   * @Test1
   * @description This method verifies the 'Visit Type' dropdown functionality and validates 'New Visit' patients.
   */
  verifyVisitTypeDropdown() {

    const fromDate = "01-01-2024";
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );

    // Click on the Appointment link
    cy.get(this.appointment.appointmentLink).click();

    // Wait and check the counter items
    cy.wait(3000);
    cy.xpath(this.appointment.counterItem).then(($counterItems) => {
      const counterCount = $counterItems.length;
      cy.log(`Counter count is ${counterCount}`);
      if (counterCount > 0) {
        cy.wrap($counterItems.first()).click();
        cy.get(this.appointment.appointmentLink).click();
      } else {
        cy.log("No counter items available");
      }
    });

    // Click on the Appointment Booking List link
    cy.get(this.appointment.appointmentBookingList).click();

    // Select "New Patient" from the dropdown
    cy.get(this.appointment.visitTypeDropdown).select("New Patient");

    // Enter "January 2024" in the FROM date field
    cy.xpath(this.appointment.fromDate).clear().type(fromDateFormatted);

    // Click the "Show Patient" button
    cy.xpath(this.appointment.showPatient).click();
    cy.wait(2000);

    // Validate that the "Visit Type" column contains only "New Visit"
    cy.get(this.appointment.visitTypeColumn).not(':first').each(($cell) => {
      cy.wrap($cell).invoke("text").then((text) => {
        expect(text.trim()).to.contain("New");
      });
    });
  }
}

export default AppointmentPage;
