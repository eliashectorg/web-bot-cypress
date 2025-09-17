

export class WaitElements {

    constructor() {
        this.spinner = '.oxd-loading-spinner-container';
        this.toast = '.oxd-toast';
        this.lblPerseverancia = "span.wixui-rich-text__text:contains('Perseverancia bajo presión')";
    }

    waitForSpinnerToDisappear() {
        cy.get(this.spinner, { timeout: 10000 })
            .should('not.exist')
    }

    waitForToastToDisappear() {
        cy.get(this.toast, { timeout: 10000 })
            .should('not.exist')
    }

    waitForModalToAppear() {
        cy.get(this.lblPerseverancia, { timeout: 20000 })
            .should('be.visible');
    }
}