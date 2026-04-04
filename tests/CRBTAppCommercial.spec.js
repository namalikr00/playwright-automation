const { test } = require('@playwright/test');
import { CRBTUnauthenticatedLoginPage } from '../pageObjects/crbt/CRBTUnauthenticatedLoginPage.js';
import { CRBTMfaPage } from '../pageObjects/crbt/CRBTMfaPage.js';
import { CRBTAuthenticatedLandingPage } from '../pageObjects/crbt/CRBTAuthenticatedLandingPage.js';
const dataSet = JSON.parse(JSON.stringify(require("../utilities/crbtTestData.json")));


test.describe('CRBT - Commercial tests', () => {
    let crbtunauthenticatedLoginPage;
    let crbtmfaPage;
    let crbtauthenticatedLandingPage;

    // Use beforeEach to perform the common login steps
    test.beforeEach(async ({ page, context }) => {
        // Initialize page objects inside the hook
        crbtunauthenticatedLoginPage = new CRBTUnauthenticatedLoginPage(page);
        crbtmfaPage = new CRBTMfaPage(page);
        crbtauthenticatedLandingPage = new CRBTAuthenticatedLandingPage(page, context);

        // Perform the login steps once before each test
        await crbtunauthenticatedLoginPage.goToUnauthenticatedLandingPage(dataSet.crbtCommercialurl);
        await crbtunauthenticatedLoginPage.logintoApplication(dataSet.loginID, dataSet.password);
        await crbtmfaPage.verifyMfaPageElements();
        await crbtmfaPage.selectEmailAuthentication();
    });

    test('Unauthenticated landing page UI elements verification,Login to GBank application with valid credentials,Authenticated landing page UI elements verification', async ({ page }) => {
        await crbtauthenticatedLandingPage.verifyAuthenticatedLandingPageElements();
    });


    test('Transactions - Fund Transfer feature, Fund Transfer UI elements verification - Individual transfers - Business to personal', async ({ page }) => {
        // Define the individual account transferDetails object
        const individualTransfersDetails = {
            amount: '0.10',
            memo: 'Individual fund transfer completed'
        };
        await crbtauthenticatedLandingPage.verifyTransactionsMenuListItems();
        await crbtauthenticatedLandingPage.individualTransfers(individualTransfersDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Single Check', async ({ page }) => {
        // Define the single check details object
        const singleChecksDetails = {
            checkNumber: '101',
            checkAmount: '0.10',
            payeeName: 'Automation user',
            note: 'Single check Stop payment note'
        };
        await crbtauthenticatedLandingPage.singleCheckStopPayment(singleChecksDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Multiple Checks', async ({ page }) => {
        // Define the multiple check details object
        const multipleChecksDetails = {
            startingCheckNumber: '201',
            endingCheckNumber: '999',
            note: 'Multiple checks Stop payment note'
        };
        await crbtauthenticatedLandingPage.multipleChecksStopPayment(multipleChecksDetails);
    });

    test('Activity Center - Online Activity feature, Single transaction', async ({ page }) => {
        await crbtauthenticatedLandingPage.singleTransactionActivities();
    });

    test('Activity Center - Online Activity feature, Recurring transactions', async ({ page }) => {
        await crbtauthenticatedLandingPage.recurringTransactionsActivities();
    });

    test('Reports - Reports feature, Informational reports', async ({ page }) => {
        await crbtauthenticatedLandingPage.reportsValidation();
    });

    test('Messages - Messages-Conversations feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.messagesValidation();
    });

    test('Branches - Branches feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.branchesValidation();
    });

    test('Privacy Policy - Privacy policy feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.privacyPolicyValidation();
    });

    test('Services - Mobile Authorizations feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.mobileAuthorizationsValidation();
    });

    test('Services - Positive Pay feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.positivePayValidation();
    });

    test('Services - Lockbox feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.lockboxValidation();
    });

    test('Help - Help search tool feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.helpSearchToolValidation();
    });

    test('Help - Online Banking Terms and Conditions feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.onlineBankingTermsConditionsValidation();
    });

    test('Help - ACH Reference Guide feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.achReferenceGuideValidation();
    });

    test('Help - Fraud Prevention Recommendations feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.fraudPreventionRecommendationsValidation();
    });

    test('Help - Notice of Change Letter feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.noticeOfChangeLetterValidation();
    });

    test('Help - Security Alerts Reference Guide feature', async ({ page, context }) => {
        await crbtauthenticatedLandingPage.securityAlertsReferenceGuideValidation();
    });

    test('Settings - Home Page Preferences feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.homePagePreferencesValidation();
    });

    test('Settings - Account Preferences feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.accountPreferencesValidation();
    });

    test('Settings - Security Preferences feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.securityPreferencesValidation();
    });

    test('Settings - Alerts feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.alertsValidation();
    });

    test('Settings - Users feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.usersValidation();
    });

    test('Settings - Accessibility feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.accessibilitySettingsValidation();
    });

    test('Settings - User Roles feature', async ({ page }) => {
        await crbtauthenticatedLandingPage.userRolesValidation();
    });
})
