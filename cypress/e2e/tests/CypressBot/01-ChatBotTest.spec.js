import ChatBotPage from "../../pom/PresionYDiamantes/Commons/ChatBotPage";
import HomePage from "../../pom/PresionYDiamantes/LandingPage/HomePage";

let seed; // Available for all tests.

describe('(ChatBot) - User can interact with the ChatBot', () => {
    const chatBot = new ChatBotPage()
    const home = new HomePage()

    before(() => {
        cy.fixture('seeds/chatBot').then((data) => { seed = data })
    })

    beforeEach(() => {
        cy.appVisit()
        home.closeSubscriptionModal()
    })

    it('should open the Presion & Diamantes homepage', () => {
        home.verifyHomePageIsDisplayed()
    })

    it('should interact with the iframe by texting, clicking buttons and verifying the Bot response', () => {
        const { expectedMessages, personalInformation, inputMessages } = seed
        chatBot.displayChatBot()
        chatBot.submitPersonalInfo(inputMessages.greetingMessage, expectedMessages.welcomeMessage, personalInformation.name,
            personalInformation.email, personalInformation.message, expectedMessages.thanksMessage)
    })
})

