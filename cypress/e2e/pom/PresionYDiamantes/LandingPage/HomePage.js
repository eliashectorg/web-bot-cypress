import { ElementActions } from "../../../../support/actions/ElementActions";
import { WaitElements } from "../../../../support/actions/WaitElements";

class HomePage {

    constructor() {
        this.actions = new ElementActions()
        this.waits = new WaitElements()

        /************************************************
        *                  PAGE OBJECTS
        ************************************************/
        this.btnBackToSite = "div[aria-label='Volver al sitio']";
        this.imgLogo = 'a img[alt="2 PYD Circulo Negro b copia.png"]';
        this.iframeChatBot ='iframe[title="Wix Chat"]';
        this.btnChat = 'button#minimized-chat';
        this.txtAreaMessage = 'textarea[aria-label="Type your message. Hit enter to submit."]';
        
    }

    /************************************************
    *                  PAGE ACTIONS
    ************************************************/

    closeSubscriptionModal() {
        this.waits.waitForModalToAppear()
        this.actions.clickElement(this.btnBackToSite)
        return this
    }

    /************************************************
    *                  PAGE ASSERTIONS
    ************************************************/

    verifyHomePageIsDisplayed() {
        cy.get(this.imgLogo).should('be.visible')
        return this
    }

    verifyCurrentUrl(expectedPart) {
        this.actions.verifyUrlContains(expectedPart)
        return this
    }
}

export default HomePage