import { ElementActions } from "../../../../support/actions/ElementActions";
import { WaitElements } from "../../../../support/actions/WaitElements";

class MyInfoPage {

    constructor() {
        this.actions = new ElementActions()
        this.waitElements = new WaitElements()

        /************************************************
        *                  PAGE OBJECTS
        ************************************************/
        this.titlePersonalDetails = 'h6.orangehrm-main-title:contains("Personal Details")';
        this.titleCustomFields = 'h6.orangehrm-main-title:contains("Custom Fields")';
        this.titleAddAttachment = 'h6.orangehrm-main-title:contains("Add Attachment")';
        this.txtFirstName = 'input[name="firstName"]';
        this.txtMiddleName = 'input[name="middleName"]';
        this.txtLastName = 'input[name="lastName"]';
        this.lblEmployeeId = 'label.oxd-label:contains("Employee Id")';
        this.lblOtherId = 'label.oxd-label:contains("Other Id")';
        this.lblDriverLicenseNumber = 'label.oxd-label:contains("License Number")';
        this.lblLicenseExpiryDate = 'label.oxd-label:contains("License Expiry Date")';
        this.lblDateOfBirth = 'label.oxd-label:contains("Date of Birth")';
        this.formContainer = 'form.oxd-form';
        this.saveButton = '.oxd-form-actions > button[type="submit"]';
        this.toastSuccessMessage = '.oxd-toast-content .oxd-text--toast-message';
        this.lblTestField = 'label.oxd-label:contains("Test_Field")';
        this.txtUploadFile = 'input[type="file"]';
        this.txtAreaComment = 'textarea[placeholder="Type comment here"]';
    }

    /************************************************
    *                  PAGE ACTIONS
    ************************************************/

    enterFirstName(firstName) {
        this.actions.enterText(this.txtFirstName, firstName)
        return this
    }

    enterMiddleName(middleName) {
        this.actions.enterText(this.txtMiddleName, middleName)
        return this
    }

    enterLastName(lastName) {
        this.actions.enterText(this.txtLastName, lastName)
        return this
    }

    enterEmployeeId(employeeId) {
        cy.get(this.lblEmployeeId)
            .parents('.oxd-input-group')
            .find('input')
            .then((employeeField) => this.actions.enterText(employeeField, employeeId))
        return this
    }

    enterOtherId(otherId) {
        cy.get(this.lblOtherId)
            .parents('.oxd-input-group')
            .find('input')
            .then((otherIdField) => this.actions.enterText(otherIdField, otherId))
        return this
    }

    enterDriverLicenseNumber(driverLicenseNumber) {
        cy.get(this.lblDriverLicenseNumber)
            .parents('.oxd-input-group')
            .find('input')
            .then((driverLicenseNumberField) => this.actions.enterText(driverLicenseNumberField, driverLicenseNumber))
        return this
    }

    enterLicenseExpiryDate(licenseExpiryDate) {
        cy.get(this.lblLicenseExpiryDate)
            .parents('.oxd-input-group')
            .find('input')
            .then((licenseExpiryDateField) => this.actions.enterText(licenseExpiryDateField, licenseExpiryDate))
        return this
    }

    selectNationality(country) {
        this.actions.selectCustomDropdownByLabel('Nationality', country)
        return this
    }

    selectMaritalStatus(maritalStatus) {
        this.actions.selectCustomDropdownByLabel('Marital Status', maritalStatus)
        return this
    }

    enterDateOfBirth(dateOfBirth) {
        cy.get(this.lblDateOfBirth)
            .parents('.oxd-input-group')
            .find('input')
            .then((dateOfBirthField) => this.actions.enterText(dateOfBirthField, dateOfBirth))
        return this
    }

    selectGender(value) {
        const rdoGender = `input[type="radio"][value="${value}"]`
        this.actions.checkElement(rdoGender)
        return this
    }

    savePersonalDetailsForm() {
        cy.contains('h6', 'Personal Details')
            .nextAll('form.oxd-form')
            .first()
            .find('.oxd-form-actions > button[type="submit"]')
            .then((savePersonalDetailsButton) => this.actions.clickElement(savePersonalDetailsButton))
        return this
    }

    saveCustomFieldsForm() {
        cy.contains('h6', 'Custom Fields')
            .nextAll('form.oxd-form')
            .first()
            .find('.oxd-form-actions > button[type="submit"]')
            .then((saveCustomFieldsButton) => this.actions.clickElement(saveCustomFieldsButton))
        return this
    }

    saveAttachment() {
        cy.contains('h6', 'Add Attachment')
            .nextAll('form.oxd-form')
            .first()
            .find('.oxd-form-actions > button[type="submit"]')
            .then((saveAttachmentButton) => this.actions.clickElement(saveAttachmentButton))
        return this
    }

    saveEditAttachment() {
        cy.contains('h6', 'Edit Attachment')
            .nextAll('form.oxd-form')
            .first()
            .find('.oxd-form-actions > button[type="submit"]')
            .then((saveEditAttachmentButton) => this.actions.clickElement(saveEditAttachmentButton))
        return this
    }

    enterBloodType(bloodType) {
        this.actions.selectCustomDropdownByLabel('Blood Type', bloodType)
        return this
    }

    enterTestField(testField) {
        cy.get(this.lblTestField)
            .parents('.oxd-input-group')
            .find('input')
            .then((testFieldInput) => this.actions.enterText(testFieldInput, testField))
        return this
    }

    clickAdd() {
        cy.contains('h6', 'Attachments')
            .parent()
            .find('button')
            .then((addButton) => this.actions.clickElement(addButton))
        return this
    }

    uploadFile(fileName) {
        this.actions.uploadFile(this.txtUploadFile, fileName, { force: true })
        return this
    }

    addAttachment(data) {
        this.clickAdd()
            .uploadFile(data.fileName)
            .enterComment(data.comment)
            .saveAttachment()
            .verifyToastSuccessMessage(data.expectedMessage)
            .verifyRecordIsDisplayed(data.fileName, data.comment)
        return this

    }

    editAttachment(currentFileName, newData) {
        this.clickAttachmentAction(currentFileName, 'edit')
        this.uploadFile(newData.fileName)
            .enterComment(newData.comment)
            .saveEditAttachment()
            .verifyToastSuccessMessage(newData.expectedMessage)
            .verifyRecordIsDisplayed(newData.fileName, newData.comment)
        return this
    }

    downloadAttachment(currentFileName) {
        this.clickAttachmentAction(currentFileName, 'download')
        const downloadsFolder = 'cypress/downloads'
        cy.readFile(`${downloadsFolder}/${currentFileName}`, { timeout: 15000 }).should('exist')
        return this
    }

    deleteAttachment(currentFileName, data) {
        this.clickAttachmentAction(currentFileName, 'delete')

        cy.get('.orangehrm-dialog-popup').within(() => {
            cy.contains('button', 'Yes, Delete')
                .then((btnDelete) => this.actions.clickElement(btnDelete))
        })

        this.verifyToastSuccessMessage(data.expectedMessage)
        cy.contains('.oxd-table-row', currentFileName).should('not.exist')
        return this
    }

    enterComment(comment) {
        this.actions.enterText(this.txtAreaComment, comment)
        return this
    }

    clickAttachmentAction(currentFileName, action) {
        cy.contains('.oxd-table-row', currentFileName).should('exist').within(() => {
            switch (action) {
                case 'edit':
                    cy.get('i.bi-pencil-fill').click()
                    break
                case 'delete':
                    cy.get('i.bi-trash').click()
                    break
                case 'download':
                    cy.get('i.bi-download').click()
                    break
                default:
                    throw new Error(`Unsupported action: ${action}. Use edit | delete | download`)
            }
        })
    }

    completePersonalDetailsForm(data) {

        this.waitElements.waitForSpinnerToDisappear()
        this.enterFirstName(data.firstName)
            .enterMiddleName(data.middleName)
            .enterLastName(data.lastName)
            .enterEmployeeId(data.employeeId)
            .enterOtherId(data.otherId)
            .enterDriverLicenseNumber(data.driverLicenseNumber)
            .enterLicenseExpiryDate(data.licenseExpiryDate)
            .selectNationality(data.nationality)
            .selectMaritalStatus(data.maritalStatus)
            .enterDateOfBirth(data.dateOfBirth)
            .selectGender(data.gender)
            .savePersonalDetailsForm()
            .verifyToastSuccessMessage(data.expectedMessage)
        return this
    }

    completeCustomFieldsForm(data) {
        this.enterBloodType(data.bloodType)
            .enterTestField(data.testField)
            .saveCustomFieldsForm()
            .verifyToastSuccessMessage(data.expectedMessage)
        return this
    }

    /************************************************
    *                  PAGE ASSERTIONS
    ************************************************/

    verifyPersonalDetailsTitleIsDisplayed() {
        cy.get(this.formContainer)
            .prevAll(this.titlePersonalDetails)
            .then((personalDetailsTitle) => this.actions.verifyTextEquals(personalDetailsTitle, "Personal Details"))
        return this
    }

    verifyCustomFieldsTitleIsDisplayed() {
        cy.get(this.formContainer)
            .prevAll(this.titleCustomFields)
            .then((customFieldsTitle) => this.actions.verifyTextEquals(customFieldsTitle, "Custom Fields"))
        return this
    }

    verifyAddAttachmentTitleIsDisplayed() {
        cy.get(this.formContainer)
            .prevAll(this.titleAddAttachment)
            .then((addAttachmentTitle) => this.actions.verifyTextEquals(addAttachmentTitle, "Add Attachment"))
        return this
    }

    verifyToastSuccessMessage(expectedMessage) {
        this.actions.verifyTextEquals(this.toastSuccessMessage, expectedMessage)
        this.waitElements.waitForToastToDisappear()
        return this
    }

    verifyRecordIsDisplayed(fileName, description) {
        this.waitElements.waitForSpinnerToDisappear()
        cy.get('.oxd-table')
            .contains('div.oxd-table-cell', fileName)
            .parents('.oxd-table-row')
            .within(() => {

                // File Name
                cy.contains('div.oxd-table-cell', fileName)
                    .then((fileNameCell) => this.actions.verifyTextEquals(fileNameCell, fileName))

                // Description
                cy.contains('div.oxd-table-cell', description)
                    .then((descriptionCell) => this.actions.verifyTextEquals(descriptionCell, description))
            })
        return this
    }
}

export default MyInfoPage