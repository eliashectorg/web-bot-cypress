import LoginPage from '../e2e/pom/OrangeHRM/Login/LoginPage'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

//Manage iframes
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.ready(function () {
            resolve($iframe.contents().find('body'));
        });
    });
});

// Navigate to a given URL
Cypress.Commands.add("appVisit", (path = "/") => {
    cy.visit(path);
});

// Login to Orange HRM
Cypress.Commands.add("loginToOrangeHRM", () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");

    if (!username || !password) {
        throw new Error("username/password not found in cypress.env.json");
    }

    cy.session("orangehrm-session", () => {
        cy.appVisit("/web/index.php/auth/login");

        const login = new LoginPage()

        // Fill the login form
        login.signIn(username, password)

        // Verify login success
        login.verifyCurrentUrl('/dashboard/index')
    }, {
        cacheAcrossSpecs: true
    });
});




