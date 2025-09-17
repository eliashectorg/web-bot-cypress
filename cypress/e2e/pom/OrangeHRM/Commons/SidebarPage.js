import { ElementActions } from "../../../../support/actions/ElementActions"

const actions = new ElementActions()

const MENU = {
    ADMIN: { label: 'Admin', path: '/admin' },
    PIM: { label: 'PIM', path: '/pim' },
    LEAVE: { label: 'Leave', path: '/leave' },
    TIME: { label: 'Time', path: '/time' },
    RECRUITMENT: { label: 'Recruitment', path: '/recruitment' },
    MY_INFO: { label: 'My Info', path: '/pim/viewPersonalDetails' },
    PERFORMANCE: { label: 'Performance', path: '/performance' },
    DASHBOARD: { label: 'Dashboard', path: '/dashboard/index' },
    DIRECTORY: { label: 'Directory', path: '/directory' },
    MAINTENANCE: { label: 'Maintenance', path: '/maintenance' },
    CLAIM: { label: 'Claim', path: '/claim' },
    BUZZ: { label: 'Buzz', path: '/buzz' }
}

class SidebarPage {

    /************************************************
    *                  PAGE OBJECTS
    ************************************************/
    constructor() {
        this.sidebar = 'ul.oxd-main-menu'
        this.menuItem = `${this.sidebar} span.oxd-main-menu-item--name`
    }

    /************************************************
    *                  PAGE ACTIONS
    ************************************************/

    navigateToSidebarSection(menuKey) {
        const item = MENU[menuKey]

        cy.get(this.menuItem)
            .contains(item.label).then(($el) => {
                actions.clickElement($el)
            })
        actions.verifyUrlContains(item.path)
    }

    /************************************************
    *                  PAGE ASSERTIONS
    ************************************************/

    verifySidebarOptions() {
        const options = [
            'Admin',
            'PIM',
            'Leave',
            'Time',
            'Recruitment',
            'My Info',
            'Performance',
            'Dashboard',
            'Directory',
            'Maintenance',
            'Claim',
            'Buzz'
        ]

        cy.get(this.menuItem).each(($el, index) => {
            actions.verifyTextEquals($el, options[index])
        })
    }
}

export { MENU }
export default SidebarPage