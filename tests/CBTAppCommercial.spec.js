const { test } = require('@playwright/test');
import { CBTUnauthenticatedLoginPage } from '../pageObjects/cbt/CBTUnauthenticatedLoginPage.js';
import { CBTMfaPage } from '../pageObjects/cbt/CBTMfaPage.js';
import { CBTAuthenticatedLandingPage } from '../pageObjects/cbt/CBTAuthenticatedLandingPage.js';
const dataSet = JSON.parse(JSON.stringify(require("../utilities/cbtTestData.json")));


test.describe('CBT - Commercial tests', () => {
    let cbtunauthenticatedLoginPage;
    let cbtmfaPage;
    let cbtauthenticatedLandingPage;

    // Use beforeEach to perform the common login steps
    test.beforeEach(async ({ page, context }) => {
        // Initialize page objects inside the hook
        cbtunauthenticatedLoginPage = new CBTUnauthenticatedLoginPage(page);
        cbtmfaPage = new CBTMfaPage(page);
        cbtauthenticatedLandingPage = new CBTAuthenticatedLandingPage(page, context);

        // Perform the login steps once before each test
        await cbtunauthenticatedLoginPage.goToUnauthenticatedLandingPage(dataSet.cbtCommercialurl);
        await cbtunauthenticatedLoginPage.logintoApplication(dataSet.loginID, dataSet.password);
        await cbtmfaPage.verifyMfaPageElements();
        await cbtmfaPage.selectEmailAuthentication();
    });

    test('Unauthenticated landing page UI elements verification,Login to CBTBank application with valid credentials,Authenticated landing page UI elements verification', async ({ page }) => {
        await cbtauthenticatedLandingPage.verifyAuthenticatedLandingPageElements();
    });


    test('Transactions - Fund Transfer feature, Fund Transfer UI elements verification - Individual transfers - Business to personal', async ({ page }) => {
        // Define the individual account transferDetails object
        const individualTransfersDetails = {
            amount: '0.10',
            memo: 'Individual fund transfer completed'
        };
        await cbtauthenticatedLandingPage.verifyTransactionsMenuListItems();
        await cbtauthenticatedLandingPage.individualTransfers(individualTransfersDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Single Check', async ({ page }) => {
        // Define the single check details object
        const singleChecksDetails = {
            checkNumber: '101',
            checkAmount: '0.10',
            payeeName: 'Automation user',
            note: 'Single check Stop payment note'
        };
        await cbtauthenticatedLandingPage.singleCheckStopPayment(singleChecksDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Multiple Checks', async ({ page }) => {
        // Define the multiple check details object
        const multipleChecksDetails = {
            startingCheckNumber: '201',
            endingCheckNumber: '999',
            note: 'Multiple checks Stop payment note'
        };
        await cbtauthenticatedLandingPage.multipleChecksStopPayment(multipleChecksDetails);
    });

    test('Activity Center - Online Activity feature, Single transaction', async ({ page }) => {
        await cbtauthenticatedLandingPage.singleTransactionActivities();
    });

    test('Activity Center - Online Activity feature, Recurring transactions', async ({ page }) => {
        await cbtauthenticatedLandingPage.recurringTransactionsActivities();
    });

    //test('Reports - Reports feature, Informational reports', async ({ page }) => {
     //   await cbtauthenticatedLandingPage.reportsValidation();
    //});

    test('Messages - Messages-Conversations feature', async ({ page }) => {
        await cbtauthenticatedLandingPage.messagesValidation();
    });

    test('Branches - Branches feature', async ({ page }) => {
        await cbtauthenticatedLandingPage.branchesValidation();
    });

    test('Privacy Policy - Privacy policy feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.privacyPolicyValidation();
    });

    test('Services - Remote Deposit feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.remoteDepositFeature();
    });

    //test('Services - Positive Pay feature', async ({ page, context }) => {
        //await cbtauthenticatedLandingPage.positivePayValidation();
    //});

    test('Services - Lockbox feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.lockboxValidation();
    });

    test('Help - Help search tool feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.helpSearchToolValidation();
    });

    test('Help - Online Banking Terms and Conditions feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.onlineBankingTermsConditionsValidation();
    });

    test('Help - ACH Reference Guide feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.achReferenceGuideValidation();
    });

    test('Help - Fraud Prevention Recommendations feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.fraudPreventionRecommendationsValidation();
    });

    test('Help - Notice of Change Letter feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.noticeOfChangeLetterValidation();
    });

    test('Help - Security Alerts Reference Guide feature', async ({ page, context }) => {
        await cbtauthenticatedLandingPage.securityAlertsReferenceGuideValidation();
    });

    test.only('Settings - Home Page Preferences feature', async ({ page }) => {
        await cbtauthenticatedLandingPage.homePagePreferencesValidation();
    });

    test('Settings - Account Preferences feature', async ({ page }) => {
        await cbtauthenticatedLandingPage.accountPreferencesValidation();
    });

    test('Settings - Security Preferences feature', async ({ page }) => {
        await cbtauthenticatedLandingPage.securityPreferencesValidation();
    });

    test('Settings - Alerts feature', async ({ page }) => {
        await cbtauthenticatedLandingPage.alertsValidation();
    });

    // test('Settings - Users feature', async ({ page }) => {
    //     await cbtauthenticatedLandingPage.usersValidation();
    // });

    test('Settings - Accessibility feature', async ({ page }) => {
        await cbtauthenticatedLandingPage.accessibilitySettingsValidation();
    });

    // test('Settings - User Roles feature', async ({ page }) => {
    //     await cbtauthenticatedLandingPage.userRolesValidation();
    // });
})
