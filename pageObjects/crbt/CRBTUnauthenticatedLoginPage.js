const { expect } = require('@playwright/test');

export class CRBTUnauthenticatedLoginPage {

    constructor(page) {
        this.page = page;
        this.fdicBanner = page.locator("[class='quicktip-container']");
        this.gBankLogo = page.locator('#ember18');
        this.complianceLogo = page.locator('.complianceLogoImg');
        this.locationsLink = page.getByRole('link', { name: 'Locations' });
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' });
        this.forGotPasswordLink = page.locator('.forgot-pw');
        this.loginIdInput = page.getByRole('textbox', { name: 'Login ID' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.showPasswordButton = page.locator('.btn-visibility-toggle');
        this.rememberMeLabel = page.getByText('Remember me');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.secureCodeLabel = page.getByText('Enter your Secure Access Code');
        this.backButton = page.getByText('Back');
        this.submitButton = page.getByText('Submit');
        this.tokenInput = page.locator('#input-guid-1003');
        this.showTokenButton = page.locator('.btn-visibility-toggle');
        this.customerNameText = page.locator('.customer-name');
    }

    async goToUnauthenticatedLandingPage(gbankCommercialurl) {
        await this.page.goto(gbankCommercialurl, { timeout: 60000 });
        await this.page.waitForURL(gbankCommercialurl);
    }

    async verifyUnautheticatedLandingPageElements() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Guaranty Bank");
        await expect(this.fdicBanner).toBeVisible();
        await expect(this.gBankLogo).toBeVisible();
        await expect(this.complianceLogo).toBeVisible();
        await expect(this.locationsLink).toBeVisible();
        await expect(this.privacyPolicyLink).toBeVisible();
        await expect(this.forGotPasswordLink).toBeVisible();
        await expect(this.loginIdInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.showPasswordButton).toBeVisible();
        await expect(this.rememberMeLabel).toBeVisible();
        expect(await this.rememberMeLabel.isChecked).toBeTruthy();
    }

    async logintoApplication(loginID, password) {
        await this.loginIdInput.fill(loginID);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
