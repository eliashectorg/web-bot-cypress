
export class ElementActions {

    asChain(target) {
        return typeof target === 'string' ? cy.get(target) : cy.wrap(target);
    }

    clickElement(target, options = { force: true, scroll: true, timeout: 10000 }) {
        const chain = this.asChain(target);
        if (options.scroll) chain.scrollIntoView();
        chain.should('be.visible').click({ force: !!options.force });
    }

    doubleClickElement(target, options = { force: true, scroll: true }) {
        const chain = this.asChain(target);
        if (options.scroll) chain.scrollIntoView();
        chain.should('be.visible').dblclick({ force: !!options.force });
    }

    enterText(target, text, options = { clear: true, blur: true }) {
        const chain = this.asChain(target);
        chain.should('be.enabled');
        if (options.clear) chain.clear();
        chain.type(text);
        if (options.blur) chain.blur();
    }

    selectCustomDropdownByLabel(label, optionText) {

        cy.contains('label', label)
            .parents('.oxd-input-group')
            .as('fieldGroup')

        cy.get('@fieldGroup')
            .find('.oxd-select-text')
            .should('be.visible')
            .click()

        cy.get('[role="listbox"] .oxd-select-option')
            .contains(optionText)
            .click()
    }

    checkElement(target, options = { force: true }) {
        this.asChain(target).check({ force: !!options.force });
    }

    uncheckElement(target, options = { force: true }) {
        this.asChain(target).uncheck({ force: !!options.force });
    }

    uploadFile(selector, fileName, options = {}) {
        cy.get(selector).selectFile(`cypress/fixtures/images/${fileName}`, options)
    }

    verifyTextEquals(target, expectedText) {
        this.asChain(target)
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(expectedText);
            });
    }

    verifyTextContains(target, expectedText) {
        this.asChain(target)
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.include(expectedText);
            });
    }

    verifyUrlContains(partialUrl) {
        cy.url().should('include', partialUrl)
    }
}