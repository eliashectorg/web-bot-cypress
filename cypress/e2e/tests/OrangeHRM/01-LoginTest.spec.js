import LoginPage from "../../pom/OrangeHRM/Login/LoginPage"

let seed;

describe('Login functionality', () => {
    const loginPage = new LoginPage()

    before(() => {
        Cypress.session.clearAllSavedSessions()
        cy.fixture('seeds/credentials').then((data) => { seed = data })
    })

    it('should not be able to log in with invalid credentials', () => {
        const { invalidCredentials } = seed
        cy.appVisit()
        loginPage.signIn(invalidCredentials.username, invalidCredentials.password)
        loginPage.verifyLoginErrorMessageIsDisplayed(invalidCredentials.errorMessage)
        loginPage.verifyCurrentUrl('/auth/login')
    })

    it('should be able to log in with valid credentials', () => {
        cy.loginToOrangeHRM()
        cy.appVisit()
    })
})

