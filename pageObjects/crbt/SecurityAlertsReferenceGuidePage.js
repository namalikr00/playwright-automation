import { expect } from '@playwright/test';

export class SecurityAlertsReferenceGuidePage {
    constructor(page) {
        this.page = page;
        this.pageTitle = this.page.getByRole('heading', { name: 'Additional Resources', exact: true });
    }

    // Define locators for elements on the new tab
    get header() {
        return this.page.locator('h1');
    }

    // Define methods to interact with the new tab
    async verifyHeader(expectedText) {
        await this.pageTitle.waitFor({ state: 'visible' });
        await expect(this.pageTitle).toHaveText(expectedText);
    }

    async verifyPageTitle(expectedPageTitle) {
        await expect(this.page).toHaveTitle(expectedPageTitle);
    }
}
