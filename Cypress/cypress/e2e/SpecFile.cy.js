// Import the page object for interacting with elements
import LoginPage from "../PageObjects/Pages/LoginPage";
import AppointmentPage from "../PageObjects/Pages/AppointmentPage";
import ProcurementPage from "../PageObjects/Pages/ProcurementPage";
import UtilitiesPage from "../PageObjects/Pages/UtilitiesPage";
import PatientPage from "../PageObjects/Pages/PatientPage";
import ADTPage from "../PageObjects/Pages/ADTPage";
import SettingsPage from "../PageObjects/Pages/SettingsPage";
import OperationTheatrePage from "../PageObjects/Pages/OperationTheatrePage";
import DoctorPage from "../PageObjects/Pages/DoctorPage";
import AdminPage from "../PageObjects/Pages/AdminPage";
import IncentivePage from "../PageObjects/Pages/IncentivePage";
import SubstorePage from "../PageObjects/Pages/SubstorePage";

describe("Automation Suite for Yaksha Application", () => {
  // Create instance of the classes
  const loginPage = new LoginPage();
  const appointment = new AppointmentPage();
  const operationTheatrePage = new OperationTheatrePage();
  const doctorsPage = new DoctorPage();
  const procurementPage = new ProcurementPage();
  const utilitiesPage = new UtilitiesPage();
  const adminPage = new AdminPage();
  const patientPage = new PatientPage();
  const incentivePage = new IncentivePage();
  const settingsPage = new SettingsPage();
  const substorePage = new SubstorePage();
  const adtPage = new ADTPage();

  // Set an acceptable load time in milliseconds
  const acceptableLoadTime = 1000;

  // Run before each test
  beforeEach(() => {
    cy.launchBrowser(); // Launch the browser
    cy.navigatingToBaseURL(); // Hit base URL

    // Login before each test
    loginPage.performLogin();
    cy.wait(3000);

    // Verify login was successful
    verifyUserIsLoggedin();
  });

  // Individual test cases
  it("TS-1 Verify 'Visit Type' Appointment Dropdown Functionality", async () => {
    appointment.verifyVisitTypeDropdown();
    verifyVisitType();
  });

  it("TS-2 Handle Alert for OT Booking Without Patient Selection", async () => {
    operationTheatrePage.handleOtBookingAlert();
  });

  it("TS-3 Verify Patient Overview Page Displayed Correctly", async () => {
    doctorsPage.verifyPatientOverview();
    verifyUserIsOnCorrectURL("Doctors/PatientOverviewMain/PatientOverview");
  });

  it("TS-4 Add Progress Note for In Patient", async () => {
    doctorsPage.addProgressNoteForPatient();
    verifyUserIsOnCorrectURL("Doctors/PatientOverviewMain/NotesSummary/NotesList");
  });

  it("TS-5 Add and Verify New Currency in Settings", async () => {
    procurementPage.addCurrencyAndVerify();
    verifyUserIsOnCorrectURL("ProcurementMain/Settings/CurrencyList");
  });

  it("TS-6 Verify Warning Popup for Mandatory Fields in Scheme Refund", async () => {
    utilitiesPage.verifyMandatoryFieldsWarning();
    verifyUserIsOnCorrectURL("/Utilities/SchemeRefund");
  });

  it("TS-7 Verify Navigation to User Profile Page", async () => {
    adminPage.verifyUserProfileNavigation();
    verifyUserIsOnCorrectURL("Employee/ProfileMain/UserProfile");
  });

  it("TS-8 Verify Patient Profile Picture Upload", async () => {
    patientPage.uploadProfilePicture();
    verifyImageIsUploaded();
  });

  it('TS-9 Verify TDS Percent update for an employee', async () => {
    incentivePage.editTDSForEmployee();
  });

  it("TS-10 Verify Price Category Enable/Disable", async () => {
    settingsPage.togglePriceCategoryStatus();
    verifyUserIsOnCorrectURL("Settings/PriceCategory");
  });

  it("TS-11 Verify to navigate to each sections which are present in the Inventory sub-module", async () => {
    substorePage.verifyNavigationBetweenSubmodules();
    verifyUserIsOnCorrectURL("Inventory/Return");
  });

  it("TS-12 Verify tooltip text on hover in Inventory tab", async () => {
    substorePage.verifyTooltipText();
    isTooltipDisplayed();
  });

  it("TS-13 Capture screenshot of Inventory Requisition section", async () => {
    substorePage.captureInventoryRequisitionScreenshot();
  });

  it("TS-14 Verify field-level error message appears when updating doctor without selection", async () => {
    adtPage.verifyFieldLevelErrorMessage();
    verifyErrorMessage();
  });

  it("TS-15 Verify logout functionality from Admin dropdown", async () => {
    loginPage.verifyLogoutFunctionality();
    verifyUserIsLoggedOut();
  });
});

/**
 * ------------------------------------------------------Helper Methods----------------------------------------------------
 */

function verifyUserIsLoggedin() {
  // Verify successful login by checking if 'admin' element is visible
  cy.xpath('//li[@class="dropdown dropdown-user"]', { timeout: 20000 })
    .should('be.visible')
    .then(() => {
      cy.log("User is successfully logged in.");
    });
}

function verifyUserIsLoggedOut() {
  cy.get('#login').should('be.visible');
}

function verifyVisitType() {
  cy.get('div[col-id="AppointmentType"]').then(($elements) => {
    expect($elements.length).to.be.greaterThan(1);
  });
}

function verifyUserIsOnCorrectURL(expectedURL) {
  cy.url().should("contain", expectedURL);
}

function verifyImageIsUploaded() {
  // Verify that the image is visible
  cy.get('div.wrapper img').should('be.visible');
}

function isTooltipDisplayed() {
  cy.get("div.modal-content").should("be.visible");
}

function verifyErrorMessage() {
  cy.xpath('//span[text()="Select doctor from the list."]').should("be.visible");
}