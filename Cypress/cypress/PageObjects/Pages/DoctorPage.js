import patientData from "../../e2e/Data/PatientName.json";

export default class DoctorPage {
  constructor() {
    this.doctor = {
      doctorLink: 'a[href="#/Doctors"]',
      inPatientTab: 'ul.page-breadcrumb a[href="#/Doctors/InPatientDepartment"]',
      searchBox: 'input#quickFilterInput',
      actionsPreviewIcon: 'a[title="Preview"]',
      patientNameHeading: 'h1.pat-name-hd',
      notesSection: 'a[href="#/Doctors/PatientOverviewMain/NotesSummary"]',
      addNotesButton: '//a[text()="Add Notes"]',
      templateDropdown: 'input[value-property-name="TemplateName"]',
      subjectiveNotesField: '//label[text()="Subjective Notes"]/../div/textarea',
      successConfirmationPopup:
        '//p[contains(text(),"Success")]/../p[contains(text(),"Progress Note Template added.")]',
      saveNotesButton: '//button[contains(text(),"Save")]',
    };
  }

  /**
   * @Test3
   * @description This method searches for a patient and verifies their overview page.
   * @param {string} patientName - Name of the patient to search.
   */
  verifyPatientOverview() {
    const patientName = patientData.PatientNames[0].Patient1 || "";

    // Click on the "Doctors" link
    cy.get(this.doctor.doctorLink).click();

    // Click on the "In Patient Department" tab
    cy.get(this.doctor.inPatientTab).click();

    // Search for the patient in the visible search box
    cy.get(this.doctor.searchBox).each(($el) => {
      if ($el.is(":visible")) {
        cy.wrap($el).type(patientName, { delay: 200 });
        return false; // Exit the loop after typing in the first visible search box
      }
    });

    cy.wait(2000);

    // Click on the preview icon under Actions
    cy.get(this.doctor.actionsPreviewIcon).click();

    // Verify the patient overview page is displayed with the correct patient name
    cy.get(this.doctor.patientNameHeading)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq(patientName);
      });
  }

  /**
   * @Test4
   * @description This method searches for a specific patient in the In Patient Department, navigates to the patient's
   *              overview page, and adds a Progress Note. The method ensures that the note is successfully added
   *              and verifies the confirmation message.
   * @expected
   * The method should successfully add a Progress Note for the patient, and a success confirmation message
   * with the text "Progress Note Template added." should be displayed.
   */
  addProgressNoteForPatient() {
    const patientName = patientData.PatientNames[1].Patient2 || "";
    
    // Click on the "Doctors" link
    cy.get(this.doctor.doctorLink).click();

    // Click on the "In Patient Department" tab
    cy.get(this.doctor.inPatientTab).click();

    // Search for the patient in the visible search box
    cy.get(this.doctor.searchBox).each(($el) => {
      if ($el.is(":visible")) {
        cy.wrap($el).type(patientName);
        return false; // Exit the loop after typing in the first visible search box
      }
    });

    cy.wait(2000);

    // Click on the preview icon under Actions
    cy.get(this.doctor.actionsPreviewIcon).click();

    // Click on Notes section
    cy.get(this.doctor.notesSection).click();

    // Click on Add Notes button
    cy.xpath(this.doctor.addNotesButton).click();

    // Select "Progress Note" from the Template dropdown
    cy.get(this.doctor.templateDropdown).click().type("Progress Note{enter}", { delay: 100 });

    // Enter subjective notes
    cy.xpath(this.doctor.subjectiveNotesField).type("Test Notes");
    cy.wait(1000);

    // Click Save button
    cy.xpath(this.doctor.saveNotesButton).click();
    cy.wait(2000);

    // Verify success confirmation popup
    cy.xpath(this.doctor.successConfirmationPopup)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Progress Note Template added.");
      });
  }
}
