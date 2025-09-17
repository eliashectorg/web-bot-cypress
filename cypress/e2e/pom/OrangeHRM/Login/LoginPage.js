import { ElementActions } from "../../../../support/actions/ElementActions"

class LoginPage {

    constructor() {
        this.actions = new ElementActions()

        /************************************************
        *                  PAGE OBJECTS
        ************************************************/
        this.titleLogin = 'h5.orangehrm-login-title:contains("Login")';
        this.txtUsername = 'input[name="username"]';
        this.txtPassword = 'input[name="password"]';
        this.btnLogin = 'button.orangehrm-login-button';
        this.lblErrorMessage = '.oxd-alert-content--error .oxd-alert-content-text';
    }

    /************************************************
    *                  PAGE ACTIONS
    ************************************************/

    enterUsername(username) {
        this.actions.enterText(this.txtUsername, username)
        return this
    }

    enterPassword(password) {
        this.actions.enterText(this.txtPassword, password)
        return this
    }

    clickLogin() {
        this.actions.clickElement(this.btnLogin)
        return this
    }

    signIn(username, password) {
        this.enterUsername(username)
            .enterPassword(password)
            .clickLogin()
        return this
    }

    /************************************************
    *                  PAGE ASSERTIONS
    ************************************************/

    verifyLoginTitleIsDisplayed() {
        this.actions.verifyTextEquals(this.titleLogin, 'Login')
        return this
    }

    verifyLoginErrorMessageIsDisplayed(expectedMessage) {
        this.actions.verifyTextEquals(this.lblErrorMessage, expectedMessage)
        return this
    }

    verifyCurrentUrl(expectedPart) {
        this.actions.verifyUrlContains(expectedPart)
        return this
    }
}

export default LoginPage