import NavbarPage from "../../pom/OrangeHRM/Commons/NavbarPage";
import SidebarPage from "../../pom/OrangeHRM/Commons/SidebarPage"
import MyInfoPage from "../../pom/OrangeHRM/MyInfo/MyInfoPage"

let seed; // Available for all tests.

describe('(My Info) - Admin can manage personal and custom information', () => {
    const navbar = new NavbarPage()
    const sidebar = new SidebarPage()
    const myInfo = new MyInfoPage()

    before(() => {
        cy.fixture('seeds/myInfo').then((data) => { seed = data })
    })

    beforeEach(() => {
        cy.loginToOrangeHRM()
        cy.appVisit()
        sidebar.navigateToSidebarSection('MY_INFO')
    })

    it('should display sidebar options and navigate to "My Info > Personal Details" page', () => {
        sidebar.verifySidebarOptions()
        myInfo.verifyPersonalDetailsTitleIsDisplayed()
    })

    it('should complete and save all required fields in "Personal Details" section', () => {
        myInfo.completePersonalDetailsForm(seed.personalDetails)
    })

    it('should complete and save all required fields in "Custom Fields" section', () => {
        myInfo.completeCustomFieldsForm(seed.customFields)
    })

    it('should handle attachments by uploading, editing, downloading and deleting', () => {
        const { addAttachment, editAttachment, deleteAttachment } = seed
        myInfo.addAttachment(addAttachment)
        myInfo.editAttachment(addAttachment.fileName, editAttachment)
        myInfo.downloadAttachment(editAttachment.fileName)
        myInfo.deleteAttachment(editAttachment.fileName, deleteAttachment)
    })

    it('should log out successfully', () => {
        // Ignore ONLY this specific app error in this test
        cy.on('uncaught:exception', (err) => {
            if (err.message?.includes("reading 'response'") ||
                err.message?.toLowerCase().includes('unhandled promise rejection')) {
                return false
            }
        })
        navbar.logout()
    })

    after(() => {
        cy.task('deleteFolder', 'cypress/downloads');
    });
})

