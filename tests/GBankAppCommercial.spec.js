const { test } = require('@playwright/test');
import { UnauthenticatedLoginPage } from '../pageObjects/gbank/UnauthenticatedLoginPage.js';
import { MfaPage } from '../pageObjects/gbank/MfaPage.js';
import { AuthenticatedLandingPage } from '../pageObjects/gbank/AuthenticatedLandingPage.js';
const dataSet = JSON.parse(JSON.stringify(require("../utilities/gBankTestData.json")));


test.describe('GBank - Commercial tests', () => {
    let unauthenticatedLoginPage;
    let mfaPage;
    let authenticatedLandingPage;

    // Use beforeEach to perform the common login steps
    test.beforeEach(async ({ page, context }) => {
        // Initialize page objects inside the hook
        unauthenticatedLoginPage = new UnauthenticatedLoginPage(page);
        mfaPage = new MfaPage(page);
        authenticatedLandingPage = new AuthenticatedLandingPage(page, context);

        // Perform the login steps once before each test
        await unauthenticatedLoginPage.goToUnauthenticatedLandingPage(dataSet.gbankCommercialurl);
        await unauthenticatedLoginPage.logintoApplication(dataSet.loginID, dataSet.password);
        await mfaPage.verifyMfaPageElements();
        await mfaPage.selectEmailAuthentication();
    });

    test('Unauthenticated landing page UI elements verification,Login to GBank application with valid credentials,Authenticated landing page UI elements verification', async ({ page }) => {
        await authenticatedLandingPage.verifyAuthenticatedLandingPageElements();
    });

    test('Payments - Loan Payment feature - from Business Checking account to Home Equity LOC account - Regular Payment', async ({ page }) => {
        // Define the paymentDetails object
        const paymentDetails = {
            paymentType: 'Regular Payment',
            amount: '0.10',
            memo: 'Payment completed'
        };

        await authenticatedLandingPage.verifypaymentsMenuListItems();
        await authenticatedLandingPage.makeLoanPayments(paymentDetails);
    });

    test('Payments - Payment Exchange feature, eCheck page UI elements verification', async ({ page, context }) => {
        await authenticatedLandingPage.verifyPaymentExchangePageElements();
    });

    test('Payments - ACH/Wire feature, ACH Wire page UI elements verification', async ({ page }) => {
        await authenticatedLandingPage.verifyACHWirePageElements();
    });

    test('Payments - ACH/Pass-Thru feature, ACH/Pass-Thru page UI elements verification', async ({ page }) => {
        await authenticatedLandingPage.verifyACHPassThruPageElements();
    });

    test('Payments - Recipients feature, Recipients page UI elements verification', async ({ page }) => {
        await authenticatedLandingPage.verifyRecipientsPageElements();
    });

    test('Payments - Tax Payment feature, Tax Payment page UI elements verification', async ({ page }) => {
        await authenticatedLandingPage.verifyTaxPaymentPageElements();
    });

    test('Payments - Wire Activity feature, Wire Activity page UI elements verification', async ({ page }) => {
        await authenticatedLandingPage.verifyWireActivityPageElements();
    });

    test('Transactions - Fund Transfer feature, Fund Transfer UI elements verification - Individual transfers - Business to personal', async ({ page }) => {
        // Define the individual account transferDetails object
        const individualTransfersDetails = {
            amount: '0.10',
            memo: 'Individual fund transfer completed'
        };
        await authenticatedLandingPage.verifyTransactionsMenuListItems();
        await authenticatedLandingPage.individualTransfers(individualTransfersDetails);
    });

    test('Transactions - Fund Transfer feature, Fund Transfer UI elements verification - Multi accounts transfers - Business to personal', async ({ page }) => {
        // Define the multi account transferDetails object
        const multiAccountTransfersDetails = {
            amount: '0.10',
            memo: 'Multi account transfer completed'
        };
        await authenticatedLandingPage.multiAccountTransfers(multiAccountTransfersDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Single Check', async ({ page }) => {
        // Define the single check details object
        const singleChecksDetails = {
            checkNumber: '101',
            checkAmount: '0.10',
            payeeName: 'Automation user',
            note: 'Single check Stop payment note'
        };
        await authenticatedLandingPage.singleCheckStopPayment(singleChecksDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Multiple Checks', async ({ page }) => {
        // Define the multiple check details object
        const multipleChecksDetails = {
            startingCheckNumber: '201',
            endingCheckNumber: '999',
            note: 'Multiple checks Stop payment note'
        };
        await authenticatedLandingPage.multipleChecksStopPayment(multipleChecksDetails);
    });

    test('Activity Center - Online Activity feature, Single transaction', async ({ page }) => {
        await authenticatedLandingPage.singleTransactionActivities();
    });

    test('Activity Center - Online Activity feature, Recurring transactions', async ({ page }) => {
        await authenticatedLandingPage.recurringTransactionsActivities();
    });

    test('Reports - Reports feature, Informational reports', async ({ page }) => {
        await authenticatedLandingPage.reportsValidation();
    });

    test('Messages - Messages-Conversations feature', async ({ page }) => {
        await authenticatedLandingPage.messagesValidation();
    });

    test('Branches - Branches feature', async ({ page }) => {
        await authenticatedLandingPage.branchesValidation();
    });

    test('Privacy Policy - Privacy policy feature', async ({ page, context }) => {
        await authenticatedLandingPage.privacyPolicyValidation();
    });

    test('Services - Statements or notices feature', async ({ page, context }) => {
        await authenticatedLandingPage.statementsOrNoticesValidation();
    });

    test('Services - Remote Deposit Capture feature', async ({ page, context }) => {
        await authenticatedLandingPage.remoteDepositCaptureValidation();
    });

    test('Services - Mobile Authorizations feature', async ({ page, context }) => {
        await authenticatedLandingPage.mobileAuthorizationsValidation();
    });

    test('Services - ACH Reports feature', async ({ page, context }) => {
        await authenticatedLandingPage.achReportsValidation();
    });

    test('Services - Positive Pay feature', async ({ page, context }) => {
        await authenticatedLandingPage.positivePayValidation();
    });

    test('Services - Lockbox feature', async ({ page, context }) => {
        await authenticatedLandingPage.lockboxValidation();
    });

    test('Help - Help search tool feature', async ({ page, context }) => {
        await authenticatedLandingPage.helpSearchToolValidation();
    });

    test('Help - Online Banking Terms and Conditions feature', async ({ page, context }) => {
        await authenticatedLandingPage.onlineBankingTermsConditionsValidation();
    });

    test('Help - ACH Reference Guide feature', async ({ page, context }) => {
        await authenticatedLandingPage.achReferenceGuideValidation();
    });

    test('Help - Fraud Prevention Recommendations feature', async ({ page, context }) => {
        await authenticatedLandingPage.fraudPreventionRecommendationsValidation();
    });

    test('Settings - Home Page Preferences feature', async ({ page }) => {
        await authenticatedLandingPage.homePagePreferencesValidation();
    });

    test('Settings - Account Preferences feature', async ({ page }) => {
        await authenticatedLandingPage.accountPreferencesValidation();
    });

    test('Settings - Security Preferences feature', async ({ page }) => {
        await authenticatedLandingPage.securityPreferencesValidation();
    });

    test('Settings - Alerts feature', async ({ page }) => {
        await authenticatedLandingPage.alertsValidation();
    });

    test('Settings - Users feature', async ({ page }) => {
        await authenticatedLandingPage.usersValidation();
    });

    test('Settings - User Roles feature', async ({ page }) => {
        await authenticatedLandingPage.userRolesValidation();
    });

    test('Settings - Accessibility feature', async ({ page }) => {
        await authenticatedLandingPage.accessibilitySettingsValidation();
    });
});
