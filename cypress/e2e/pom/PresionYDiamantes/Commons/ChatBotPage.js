import { ElementActions } from "../../../../support/actions/ElementActions";

class ChatBotPage {

    constructor() {
        this.actions = new ElementActions()

        /************************************************
        *                  PAGE OBJECTS
        ************************************************/
        this.titleChatBot = 'h2[data-hook="title"]';
        this.iframeChatBot = 'iframe[title="Wix Chat"]';
        this.btnOpenChatBot = 'button#minimized-chat';
        this.txtAreaChatMessage = 'textarea[aria-label="Type your message. Hit enter to submit."]';
        this.txtName = 'input[id="name"]';
        this.txtEmailAddress = 'input[id="email"]';
        this.txtAreaMessage = 'textarea[id="message"]';
        this.btnSubmit = 'button[class="dUbg3"]';
        this.msgWelcomeBubble = 'div[data-hook="bubble"] .aGtJq';
        this.msgThanksBubble = 'div[data-hook="lcf-thank-you-text"]';

    }

    /************************************************
    *                  PAGE ACTIONS
    ************************************************/

    displayChatBot() {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.btnOpenChatBot)
            .then(chatBotOpenButton => this.actions.clickElement(chatBotOpenButton))
        return this
    }

    enterChatMessage(chatMessage) {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.txtAreaChatMessage)
            .then(chatMessageInput => this.actions.enterText(chatMessageInput, `${chatMessage}{enter}`, {blur: false }))
        return this
    }

    enterName(name) {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.txtName)
            .then(nameInput => this.actions.enterText(nameInput, name, { blur: false }))
        return this
    }

    enterEmailAddress(emailAddress) {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.txtEmailAddress)
            .then(emailAddressInput => this.actions.enterText(emailAddressInput, emailAddress, { blur: false }))
        return this
    }

    enterMessage(message) {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.txtAreaMessage)
            .then(messageInput => this.actions.enterText(messageInput, `${message}{enter}`, { blur: false }))
        return this
    }

    clickSubmit() {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.btnSubmit)
            .then(submitButton => this.actions.clickElement(submitButton))
        return this
    }

    submitPersonalInfo(chatMessage, welcomeMessage, name, email, message, thanksMessage) {
        this.verifyChatBotTitleIsDisplayed()
            .enterChatMessage(chatMessage)
            .verifyChatBotWelcomeMessage(welcomeMessage)
            .enterName(name)
            .enterEmailAddress(email)
            .enterMessage(message)
            .clickSubmit()
            .verifyThanksMessage(thanksMessage)
        return this
    }


    /************************************************
    *                  PAGE ASSERTIONS
    ************************************************/

    verifyChatBotTitleIsDisplayed() {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.titleChatBot)
            .then(title => this.actions.verifyTextEquals(title, 'Presión & Diamantes'))
        return this
    }

    verifyChatBotWelcomeMessage(message) {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.msgWelcomeBubble)
            .then(welcomeMessage => this.actions.verifyTextEquals(welcomeMessage, message))
        return this
    }

    verifyThanksMessage(message) {
        cy.get(this.iframeChatBot)
            .should('be.visible')
            .iframe()
            .find(this.msgThanksBubble)
            .then(thankfulMessage => this.actions.verifyTextEquals(thankfulMessage, message))
        return this
    }
}

export default ChatBotPage