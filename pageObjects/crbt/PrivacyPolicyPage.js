import { expect } from '@playwright/test';

export class PrivacyPolicyPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = this.page.getByRole('heading', { name: 'Privacy Notice', level: 1 });
    }

    // Define locators for elements on the new tab
    get header() {
        return this.page.locator('h1');
    }

    // Add other locators as needed
    get someButton() {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    // Define methods to interact with the new tab
    async verifyHeader(expectedText) {
        await this.pageTitle.waitFor({ state: 'visible' });
        await expect(this.pageTitle).toHaveText(new RegExp(expectedText), { ignoreCase: true });
    }

    async clickSomeButton() {
        await this.someButton.click();
    }

    async verifyPageTitle(expectedPageTitle) {
        await expect(this.page).toHaveTitle(expectedPageTitle);
    }
}
