const { test } = require('@playwright/test');
import { QCBTUnauthenticatedLoginPage } from '../pageObjects/qcbt/QCBTUnauthenticatedLoginPage.js';
import { QCBTMfaPage } from '../pageObjects/qcbt/QCBTMfaPage.js';
import { QCBTAuthenticatedLandingPage } from '../pageObjects/qcbt/QCBTAuthenticatedLandingPage.js';
const dataSet = JSON.parse(JSON.stringify(require("../utilities/qcbtTestData.json")));


test.describe('QCBT - Commercial tests', () => {
    let qcbtunauthenticatedLoginPage;
    let qcbtmfaPage;
    let qcbtauthenticatedLandingPage;

    // Use beforeEach to perform the common login steps
    test.beforeEach(async ({ page, context }) => {
        // Initialize page objects inside the hook
        qcbtunauthenticatedLoginPage = new QCBTUnauthenticatedLoginPage(page);
        qcbtmfaPage = new QCBTMfaPage(page);
        qcbtauthenticatedLandingPage = new QCBTAuthenticatedLandingPage(page, context);

        // Perform the login steps once before each test
        await qcbtunauthenticatedLoginPage.goToUnauthenticatedLandingPage(dataSet.qcbtCommercialurl);
        await qcbtunauthenticatedLoginPage.logintoApplication(dataSet.loginID, dataSet.password);
        await qcbtmfaPage.verifyMfaPageElements();
        await qcbtmfaPage.selectEmailAuthentication();
    });

    test('Unauthenticated landing page UI elements verification,Login to QCBTBank application with valid credentials,Authenticated landing page UI elements verification', async ({ page }) => {
        await qcbtauthenticatedLandingPage.verifyAuthenticatedLandingPageElements();
    });


    test('Transactions - Fund Transfer feature, Fund Transfer UI elements verification - Individual transfers - Business to personal', async ({ page }) => {
        // Define the individual account transferDetails object
        const individualTransfersDetails = {
            amount: '0.10',
            memo: 'Individual fund transfer completed'
        };
        await qcbtauthenticatedLandingPage.verifyTransactionsMenuListItems();
        await qcbtauthenticatedLandingPage.individualTransfers(individualTransfersDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Single Check', async ({ page }) => {
        // Define the single check details object
        const singleChecksDetails = {
            checkNumber: '101',
            checkAmount: '0.10',
            payeeName: 'Automation user',
            note: 'Single check Stop payment note'
        };
        await qcbtauthenticatedLandingPage.singleCheckStopPayment(singleChecksDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Multiple Checks', async ({ page }) => {
        // Define the multiple check details object
        const multipleChecksDetails = {
            startingCheckNumber: '201',
            endingCheckNumber: '999',
            note: 'Multiple checks Stop payment note'
        };
        await qcbtauthenticatedLandingPage.multipleChecksStopPayment(multipleChecksDetails);
    });

    test('Activity Center - Online Activity feature, Single transaction', async ({ page }) => {
        await qcbtauthenticatedLandingPage.singleTransactionActivities();
    });

    test('Activity Center - Online Activity feature, Recurring transactions', async ({ page }) => {
        await qcbtauthenticatedLandingPage.recurringTransactionsActivities();
    });

    test('Reports - Reports feature, Informational reports', async ({ page }) => {
        await qcbtauthenticatedLandingPage.reportsValidation();
    });

    test('Messages - Messages-Conversations feature', async ({ page }) => {
        await qcbtauthenticatedLandingPage.messagesValidation();
    });

    test('Branches - Branches feature', async ({ page }) => {
        await qcbtauthenticatedLandingPage.branchesValidation();
    });

    // test('Privacy Policy - Privacy policy feature', async ({ page, context }) => {
    //     await qcbtauthenticatedLandingPage.privacyPolicyValidation();
    // });

    test('Services - Remote Deposit feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.remoteDepositFeature();
    });

    test('Services - Positive Pay feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.positivePayValidation();
    });

    test('Services - Lockbox feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.lockboxValidation();
    });

    test.only('Help - Help search tool feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.helpSearchToolValidation();
    });

    test('Help - Online Banking Terms and Conditions feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.onlineBankingTermsConditionsValidation();
    });

    test('Help - ACH Reference Guide feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.achReferenceGuideValidation();
    });

    test('Help - Fraud Prevention Recommendations feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.fraudPreventionRecommendationsValidation();
    });

    test('Help - Notice of Change Letter feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.noticeOfChangeLetterValidation();
    });

    test('Help - Security Alerts Reference Guide feature', async ({ page, context }) => {
        await qcbtauthenticatedLandingPage.securityAlertsReferenceGuideValidation();
    });

    test('Settings - Home Page Preferences feature', async ({ page }) => {
        await qcbtauthenticatedLandingPage.homePagePreferencesValidation();
    });

    test('Settings - Account Preferences feature', async ({ page }) => {
        await qcbtauthenticatedLandingPage.accountPreferencesValidation();
    });

    test('Settings - Security Preferences feature', async ({ page }) => {
        await qcbtauthenticatedLandingPage.securityPreferencesValidation();
    });

    test('Settings - Alerts feature', async ({ page }) => {
        await qcbtauthenticatedLandingPage.alertsValidation();
    });

     test('Settings - Users feature', async ({ page }) => {
         await qcbtauthenticatedLandingPage.usersValidation();
     });

    test('Settings - Accessibility feature', async ({ page }) => {
        await qcbtauthenticatedLandingPage.accessibilitySettingsValidation();
    });

     test('Settings - User Roles feature', async ({ page }) => {
         await qcbtauthenticatedLandingPage.userRolesValidation();
     });
})
