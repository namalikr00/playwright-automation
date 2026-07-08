const { test } = require('@playwright/test');
import { CSBUnauthenticatedLoginPage } from '../pageObjects/csb/CSBUnauthenticatedLoginPage.js';
import { CSBMfaPage } from '../pageObjects/csb/CSBMfaPage.js';
import { CSBAuthenticatedLandingPage } from '../pageObjects/csb/CSBAuthenticatedLandingPage.js';
const dataSet = JSON.parse(JSON.stringify(require("../utilities/csbTestData.json")));


test.describe('CSB - Commercial tests', () => {
    let csbunauthenticatedLoginPage;
    let csbmfaPage;
    let csbauthenticatedLandingPage;

    // Use beforeEach to perform the common login steps
    test.beforeEach(async ({ page, context }) => {
        // Initialize page objects inside the hook
        csbunauthenticatedLoginPage = new CSBUnauthenticatedLoginPage(page);
        csbmfaPage = new CSBMfaPage(page);
        csbauthenticatedLandingPage = new CSBAuthenticatedLandingPage(page, context);

        // Perform the login steps once before each test
        await csbunauthenticatedLoginPage.goToUnauthenticatedLandingPage(dataSet.csbCommercialurl);
        await csbunauthenticatedLoginPage.logintoApplication(dataSet.loginID, dataSet.password);
        await csbmfaPage.verifyMfaPageElements();
        await csbmfaPage.selectEmailAuthentication();
    });

    test('Unauthenticated landing page UI elements verification,Login to CSBBank application with valid credentials,Authenticated landing page UI elements verification', async ({ page }) => {
        await csbauthenticatedLandingPage.verifyAuthenticatedLandingPageElements();
    });


    test('Transactions - Fund Transfer feature, Fund Transfer UI elements verification - Individual transfers - Business to personal', async ({ page }) => {
        // Define the individual account transferDetails object
        const individualTransfersDetails = {
            amount: '0.10',
            memo: 'Individual fund transfer completed'
        };
        await csbauthenticatedLandingPage.verifyTransactionsMenuListItems();
        await csbauthenticatedLandingPage.individualTransfers(individualTransfersDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Single Check', async ({ page }) => {
        // Define the single check details object
        const singleChecksDetails = {
            checkNumber: '101',
            checkAmount: '0.10',
            payeeName: 'Automation user',
            note: 'Single check Stop payment note'
        };
        await csbauthenticatedLandingPage.singleCheckStopPayment(singleChecksDetails);
    });

    test('Transactions - Stop payments feature, Stop payments UI elements verification - Multiple Checks', async ({ page }) => {
        // Define the multiple check details object
        const multipleChecksDetails = {
            startingCheckNumber: '201',
            endingCheckNumber: '999',
            note: 'Multiple checks Stop payment note'
        };
        await csbauthenticatedLandingPage.multipleChecksStopPayment(multipleChecksDetails);
    });

    test('Activity Center - Online Activity feature, Single transaction', async ({ page }) => {
        await csbauthenticatedLandingPage.singleTransactionActivities();
    });

    test('Activity Center - Online Activity feature, Recurring transactions', async ({ page }) => {
        await csbauthenticatedLandingPage.recurringTransactionsActivities();
    });

    test('Reports - Reports feature, Informational reports', async ({ page }) => {
        await csbauthenticatedLandingPage.reportsValidation();
    });

    test('Messages - Messages-Conversations feature', async ({ page }) => {
        await csbauthenticatedLandingPage.messagesValidation();
    });

    test('Branches - Branches feature', async ({ page }) => {
        await csbauthenticatedLandingPage.branchesValidation();
    });

    test('Privacy Policy - Privacy policy feature', async ({ page, context }) => {
        await csbauthenticatedLandingPage.privacyPolicyValidation();
     });

    //test('Services - Remote Deposit feature', async ({ page, context }) => {
      //  await csbauthenticatedLandingPage.remoteDepositFeature();
    //});

    test('Services - Positive Pay feature', async ({ page, context }) => {
        await csbauthenticatedLandingPage.positivePayValidation();
    });

    //test.only('Services - Lockbox feature', async ({ page, context }) => {
      //  await csbauthenticatedLandingPage.lockboxValidation();
    //});

    test('Help - Help search tool feature', async ({ page, context }) => {
        await csbauthenticatedLandingPage.helpSearchToolValidation();
    });

    test('Help - Online Banking Terms and Conditions feature', async ({ page, context }) => {
        await csbauthenticatedLandingPage.onlineBankingTermsConditionsValidation();
    });

    test('Help - ACH Reference Guide feature', async ({ page, context }) => {
        await csbauthenticatedLandingPage.achReferenceGuideValidation();
    });

    test('Help - Fraud Prevention Recommendations feature', async ({ page, context }) => {
        await csbauthenticatedLandingPage.fraudPreventionRecommendationsValidation();
    });

    test('Help - Notice of Change Letter feature', async ({ page, context }) => {
        await csbauthenticatedLandingPage.noticeOfChangeLetterValidation();
    });

    //test('Help - Security Alerts Reference Guide feature', async ({ page, context }) => {
      //  await csbauthenticatedLandingPage.securityAlertsReferenceGuideValidation();
    //});

    test('Settings - Home Page Preferences feature', async ({ page }) => {
        await csbauthenticatedLandingPage.homePagePreferencesValidation();
    });

    test('Settings - Account Preferences feature', async ({ page }) => {
        await csbauthenticatedLandingPage.accountPreferencesValidation();
    });

    test('Settings - Security Preferences feature', async ({ page }) => {
        await csbauthenticatedLandingPage.securityPreferencesValidation();
    });

    test('Settings - Alerts feature', async ({ page }) => {
        await csbauthenticatedLandingPage.alertsValidation();
    });

    test('Settings - Users feature', async ({ page }) => {
        await csbauthenticatedLandingPage.usersValidation();
    });

    //test.only('Settings - Accessibility feature', async ({ page }) => {
      //  await csbauthenticatedLandingPage.accessibilitySettingsValidation();
    //});

     test('Settings - User Roles feature', async ({ page }) => {
         await csbauthenticatedLandingPage.userRolesValidation();
     });
})
