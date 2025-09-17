import { ElementActions } from "../../../../support/actions/ElementActions";

class NavbarPage {

    constructor() {
        this.actions = new ElementActions()

        /************************************************
        *                  PAGE OBJECTS
        ************************************************/
        this.userDropdown = '.oxd-userdropdown-tab';
        this.logoutLink = '.oxd-userdropdown-link:contains("Logout")';
    }

    /************************************************
    *                  PAGE ACTIONS
    ************************************************/

    openUserDropdown() {
        this.actions.clickElement(this.userDropdown)
        return this
    }

    clickLogout() {
        this.actions.clickElement(this.logoutLink)
        return this
    }

    logout() {
        this.openUserDropdown()
        this.clickLogout()
        this.actions.verifyUrlContains('/auth/login')
        return this
    }
}

export default NavbarPage