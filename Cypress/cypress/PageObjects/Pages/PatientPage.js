import path from "path";

export default class PatientPage {
  constructor() {
    this.patient = {
      patientLink: 'a[href="#/Patient"]',
      registerPatient: 'ul.page-breadcrumb a[href="#/Patient/RegisterPatient"]',
      newPhotoButton: '//button[contains(text(),"New Photo")]',
      uploadButton: 'label[for="fileFromLocalDisk"]',
      doneButton: '//button[text()="Done"]',
      uploadedImg: 'div.wrapper img',
      profilePictureIcon: 'a[title="Profile Picture"]',
    };
  }

  /**
   * @Test8
   * @description This method verifies the successful upload of a profile picture for a patient by navigating to the "Register Patient" tab
   *              and completing the upload process.
   * @expected
   * Verify that the uploaded image is displayed successfully in the patient's profile.
   */
  uploadProfilePicture() {
    // const imagePath = path.join(__dirname, "../../e2e/TestImage/avatar.png");
    const imagePath = "C:/Users/LENOVO/Desktop/YAKSHA Projects/Cypress/1-Cypress-Javascript-PL 1/cypress/TestImage/avatar.png";
    cy.log(`Image path > ${imagePath}`);

    // Navigate to the Patient page
    cy.get(this.patient.patientLink).click();

    // Click on the "Register Patient" tab
    cy.get(this.patient.registerPatient).click();

    // Select the Profile Picture icon
    cy.get(this.patient.profilePictureIcon).click();

    // Click on "New Photo" button
    cy.xpath(this.patient.newPhotoButton).click();

    // Upload image
    cy.get(this.patient.uploadButton).selectFile(imagePath, { force: true });
    cy.wait(2000); // Wait for 2 seconds

    // Click on the "Done" button
    cy.xpath(this.patient.doneButton).click();

    // Verify success confirmation or image upload
    cy.get(this.patient.uploadedImg).should("be.visible");
  }
}