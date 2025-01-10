export default class AdminPage {
    constructor() {
        this.admin = {
            adminDropdown: '//li[@class="dropdown dropdown-user"]',
            myProfileOption: 'a[routerlink="Employee/ProfileMain"]',
            userProfileHeader: 'a[routerlink="User Profile"]',
        };
    }

    /**
     * @Test7
     * @description This method verifies that the user is successfully navigated to the "User  Profile" page
     *              after selecting the "My Profile" option from the Admin dropdown.
     * @expected
     * Verify that the user is redirected to the "User  Profile" page and the page header or title confirms this.
     */
    verifyUserProfileNavigation() {
        // Click on Admin dropdown
        cy.xpath(this.admin.adminDropdown)
            .should("be.visible", { timeout: 20000 }) // Wait for element to be visible
            .then(() => {
                cy.wait(10000);
                cy.xpath(this.admin.adminDropdown).click();
            });

        // Select "My Profile" option
        cy.get(this.admin.myProfileOption).click();

        // Wait for User Profile page to load
        cy.get(this.admin.userProfileHeader)
            .should("be.visible")
            .then(() => {
                // Verify that the User Profile page is displayed
                cy.get(this.admin.userProfileHeader)
                    .invoke("text")
                    .then((headerText) => {
                        expect(headerText.trim()).to.equal("User  Profile"); // Update with the actual header text
                    });
            });
    }
}