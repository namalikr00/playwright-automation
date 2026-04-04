import { expect } from '@playwright/test';

export class OnlineBankingTermsConditionsPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = this.page.getByRole('heading', { name: 'Services Agreement and Disclosure', exact: true });
    }

    // Define locators for elements on the new tab
    get header() {
        return this.page.locator('h1');
    }

    // Define methods to interact with the new tab
    async verifyPageTitle(expectedText) {
        await this.pageTitle.waitFor({ state: 'visible' });
        await expect(this.pageTitle).toHaveText(expectedText);
    }

    async verifyHeader(expectedText) {
        await expect(this.page.getByText(expectedText).first()).toBeVisible();
    }

    async verifyWelcomeMessage() {
        await expect(this.page.getByText('Welcome to the online help')).toBeVisible();
    }

    async verifyPageTitle(expectedPageTitle) {
        await expect(this.page).toHaveTitle(expectedPageTitle);
    }
}
