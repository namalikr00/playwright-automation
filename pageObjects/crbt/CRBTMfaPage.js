const { expect } = require('@playwright/test');
export class CRBTMfaPage {
    constructor(page) {
        this.page = page;
        this.quickTipContainer = page.locator("[class='quicktip-container']");
        this.deliveryMethodTipText = page.locator('.tip-text');
        this.selectTargetTitle = page.getByText('Please select a target:');
        this.backButton = page.getByText('Back');
        this.submitButton = page.getByText('Submit');
        this.emailMeButton = page.getByRole('button', { name: 'E-mail: xxxxxxidinne@xxrh.com' });
        this.textMeButton = page.getByRole('button', { name: 'Text: (XXX) XXX-6500' });
        this.securityCodeInput = page.getByPlaceholder('Secure Access Code');
        this.fdicBanner = page.locator("[class='quicktip-container']");
        this.secureCodeLabel = page.getByText('Enter your Secure Access Code');
        this.tokenInput = page.locator('#input-guid-1003');
        this.microsoftSignInButton = page.locator('#c-shellmenu_custom_outline_signin_bhvr100_right');
        this.microsofUserEmailIdButton = page.locator('.table-cell.text-left.content').first();
        this.microsoftEmailIdInput = page.locator('#i0116');
        this.microsoftNextButton = page.locator('#idSIButton9');
        this.microsoftPasswordInput = page.locator('#i0118');
        this.msSignInButton = page.locator('#idSIButton9')
    }

    async verifyMfaPageElements() {
        await expect(this.quickTipContainer).toBeVisible();
        await expect(this.deliveryMethodTipText).toBeVisible();
        await expect(this.deliveryMethodTipText).toHaveText("Choose a delivery method you can readily access. Add code delivery options in Security Preferences under SETTINGS.");
        await expect(this.selectTargetTitle).toBeVisible();
        await expect(this.emailMeButton).toBeVisible();
        await expect(this.textMeButton).toBeVisible();
    }

    async selectEmailAuthentication() {
        await this.textMeButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.fdicBanner).toBeVisible();
        await expect(this.secureCodeLabel.first()).toBeVisible();
        await expect(this.backButton).toBeVisible();
        await expect(this.submitButton).toBeVisible();
        await expect(this.tokenInput).toBeVisible();
    }
}
