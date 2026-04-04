const { expect } = require('@playwright/test');
import { PaymentExchangePage } from '../gbank/PaymentExchangePage';
import { PrivacyPolicyPage } from '../gbank/PrivacyPolicyPage';
import { StatementsNoticesPage } from '../gbank/StatementsNoticesPage';
import { RemoteDepositCapturePage } from '../gbank/RemoteDepositCapturePage';
import { ACHReportsPage } from '../gbank/ACHReportsPage';
import { LockBoxPage } from '../gbank/LockBoxPage';
import { HelpSearchToolPage } from '../gbank/HelpSearchToolPage';
import { OnlineBankingTermsConditionsPage } from '../gbank/OnlineBankingTermsConditionsPage';
import { ACHReferenceGuidePage } from '../gbank/ACHReferenceGuidePage';
import { FraudPreventionRecommendationsPage } from '../gbank/FraudPreventionRecommendationsPage';

export class AuthenticatedLandingPage {

    constructor(page, context) {
        this.page = page;
        this.context = context;

        // --- Main Page Locators ---
        this.customerNameText = page.locator('.customer-name');
        this.homeHeader = page.getByRole('heading', { name: 'Home', level: 1 });
        this.paymentsMenu = page.locator('.menu-text').getByText('Payments', { exact: true });
        this.transactionsMenu = page.locator('.menu-text').getByText('Transactions', { exact: true });
        this.activityCenterMenu = page.locator('.menu-text').getByText('Activity Center', { exact: true });
        this.privacyPolicyMenu = page.locator('.menu-text').getByText('Privacy Policy', { exact: true });
        this.reportsMenu = page.locator('.menu-text').getByText('Reports', { exact: true });
        this.messagesMenu = page.locator('.menu-text').getByText('Messages', { exact: true });
        this.branchesMenu = page.locator('.menu-text').getByText('Branches', { exact: true });
        this.servicesMenu = page.locator('.menu-text').getByText('Services', { exact: true });
        this.helpMenu = page.locator('.menu-text').getByText('Help', { exact: true });
        this.settingsMenu = page.locator('.menu-text').getByText('Settings', { exact: true });
        this.brandingImage = page.locator('.branding');
        this.navbarBranding = page.locator('.navbar-branding');
        this.tipText = page.locator('.tip-text', { hasText: 'Please click the account tile to view your Account History. You may also click the three dots in the right hand corner of the tile to complete a Quick Transfer between accounts.' });
        this.accountHeader = page.getByRole('heading', { name: 'Accounts', level: 2 });
        this.lockedLoginsHeader = page.getByRole('heading', { name: 'Locked Logins' });
        this.transactionApprovalsHeader = page.getByRole('heading', { name: 'Transaction Approvals' });
        this.favoriteReportsHeader = page.getByRole('heading', { name: 'Favorite Reports' });
        this.toolTip = page.locator('.quick-tip.quick-tip-visible.ember-view');
        this.quickTransferLink = page.getByRole('link', { name: 'Quick Transfer' });
        this.transactionProcessedHeader = this.page.locator('#q2-ui-modal-title').filter({ hasText: 'Transaction Authorized' });
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.confirmIcon = this.page.locator('ui-modal-icon');
        this.modalTitle = this.page.getByTestId('lblModalTitle').filter({ hasText: 'Please confirm the details of your transfer:' });
        this.closeButton = this.page.getByRole('button', { name: 'Close' });
        this.confirmationModal = this.page.locator('.ui-modal-body ');
        this.modalContentBody = this.page.locator('div.ui-modal-content-body');
        this.fromAccountValue = this.modalContentBody.locator('dd').nth(0);
        this.toAccountValue = this.modalContentBody.locator('dd').nth(1);
        this.paymentTypeValue = this.modalContentBody.locator('dd').nth(2);
        this.paymentAmountValue = this.modalContentBody.locator(':text("Amount:") + dd');
        this.memoValue = this.modalContentBody.locator(':text("Memo:") + dd');
        this.transactionIDValue = this.modalContentBody.locator(':text("Transaction ID:") + dd');
        this.processedModal = this.page.getByRole('dialog', { name: 'Transaction Authorized' });
        this.activityCenterButton = this.processedModal.getByRole('button', { name: 'Activity Center' });
        this.paymentSubmissionSubHeader = this.page.locator('#q2-ui-modal-content > div.ui-modal-header > p');
        this.transactionDetailsHeader = this.page.locator('.header-wrapper').getByText('Transaction Details');
        this.transactionListHeader = this.page.locator('#transactionHeaderWrapper > div > div.q2-col.sub-details > h3');
        this.paymentDetailsHeader = this.page.locator('#title > h2').getByText('Payment Details');
        this.transactionProcessHeader = this.page.locator('#title > h2').getByText('Transaction Process');
        this.paymentsHubHeader = this.page.getByRole('heading', { level: 1, name: 'Payments Hub' });
        this.newPaymentButton = this.page.locator('button.ui-dropdown-toggle.btn.btn-primary.ember-view[test-id="btnUIDropdownToggle"]');
        this.searchTemplatesTextBox = this.page.getByPlaceholder('Search templates');
        this.templateContainer = this.page.locator('div.clearfix.templates.pad-B-xxl');
        this.templateNewPaymentContainer = this.page.locator('div.template-new-payment-container');
        this.templateNewTemplateContainer = this.page.locator('div.template-new-template-container');
        this.achPassThruHeader = this.page.getByRole('heading', { level: 1, name: 'ACH Pass-Thru' });
        this.importFileLabel = this.page.getByText('Import File');
        this.processDateLabel = this.page.getByLabel('Process Date');
        this.achmemoLabel = this.page.getByRole('textbox', { name: 'Memo' });
        this.draftButton = this.page.getByText('Draft');
        this.approveButton = this.page.getByText('Approve');
        this.passThruUploadLogHeader = this.page.getByRole('heading', { name: 'Pass-Thru Upload Log' });
        this.createAlertButton = this.page.getByText('Create Alert', { exact: true });
        this.recipientsHeader = this.page.getByRole('heading', { name: 'Recipients', level: 1 });
        this.newRecipientButton = this.page.locator('.btn.btn-btn.btn-primary.pull-left.ember-view');
        this.searchRecipientsTextBox = this.page.getByRole('search', { placeholder: 'Search recipients' });
        this.recipientsTable = this.page.locator('table table-default-active');
        this.taxPaymentsHeader = this.page.getByRole('heading', { name: 'Tax Payments', level: 1 });
        this.stateOrFederalAuthorityLabel = this.page.getByText('State or Federal Authority');
        this.selectAuthorityInput = this.page.getByPlaceholder('Select Authority');
        this.filterFormsTextBox = this.page.locator('.form-control.pad-L-xxl.pad-R-xxl.search-input.ember-text-field.ember-view');
        this.selectTaxFormLabel = this.page.getByText('Select a tax form to begin');
        this.wireActivity = this.page.getByRole('heading', { name: 'Wire Activity', level: 1 });
        this.outgoinghTab = this.page.getByRole('tab', { name: 'Outgoing' });
        this.incomingTab = this.page.getByRole('tab', { name: 'Incoming' });

        // Reusable locator for the main content iframe
        this.iframeLocator = page.frameLocator('iframe[test-id="outletIframe"]').first();

        // --- Loan Payments Form Locators (within iframe) ---
        this.loanPaymentsHeader = this.iframeLocator.getByText('Loan Payments', { exact: true });
        this.loanPaymentsSubHeader = this.iframeLocator.locator('app-main').getByText('Use this form to submit loan payments.');
        this.fromLabel = this.iframeLocator.getByLabel('From');
        this.toLabel = this.iframeLocator.getByLabel('To');
        this.clearButton = this.iframeLocator.getByRole('button', { name: 'Clear' });
        this.submitButton = this.iframeLocator.getByRole('button', { name: 'Submit' });
        this.fromAccountList = this.iframeLocator.getByRole('combobox', { name: 'From' });
        const staticFromAccountText = 'XXXXXX1111 - Global Nickname -';
        this.fromAccountOption = this.iframeLocator.getByRole('option', { name: new RegExp(`^${staticFromAccountText}`), });
        this.toAccountList = this.iframeLocator.getByRole('combobox', { name: 'To' });
        const staticToAccountText = 'XXXXXX7445 - Commerical/Ag RE';
        this.toAccountOption = this.iframeLocator.getByRole('option', { name: new RegExp(`^${staticToAccountText}`), });
        this.toAccountHadesRow = this.iframeLocator.locator('app-main .toAccountHades.row');
        this.paymentTypeLabel = this.iframeLocator.getByLabel('Payment Type');
        this.paymentTypeList = this.iframeLocator.getByRole('combobox', { name: 'Payment Type' });
        this.paymentAmountLabel = this.iframeLocator.getByLabel('Payment Amount');
        this.amountInput = this.iframeLocator.locator('[test-id="inputField"].input-field[autocomplete="transaction-amount"]');
        this.recurringTransactionLabel = this.iframeLocator.getByLabel('Make this a recurring transaction');
        this.selectPaymentFrequencyLabel = this.iframeLocator.getByLabel('Select Payment Frequency');
        this.recurringTransactionCheckBox = this.iframeLocator.locator('label.label-control:has(svg.checkbox-icon)');
        this.selectPaymentFrequencyList = this.iframeLocator.getByRole('combobox', { name: 'Select Payment Frequency' });
        const monthlyFrequencyText = 'Monthly';
        this.selectMonthlyFrequencyOption = this.iframeLocator.getByRole('option', { name: new RegExp(`^${monthlyFrequencyText}`), });
        this.startDateLabel = this.iframeLocator.getByLabel('Start Date (MM/DD/YYYY)');
        this.endDateLabel = this.iframeLocator.getByLabel('End Date (MM/DD/YYYY)');
        this.startDateTextBox = this.iframeLocator.getByRole('combobox', { name: 'Start Date (MM/DD/YYYY)' });
        this.endDateTextBox = this.iframeLocator.getByRole('combobox', { name: 'End Date (MM/DD/YYYY)' });
        this.dateLabel = this.iframeLocator.getByLabel('Date (MM/DD/YYYY)');
        this.memoLabel = this.iframeLocator.getByLabel('Memo');
        this.memoOptionalLabel = this.iframeLocator.locator('.optional-tag');
        this.memoListItem = this.iframeLocator.getByRole('textbox', { name: 'Memo(optional)' });

        // --- Funds Transfer form locator(within iframe) 
        this.fundsTransferHeader = this.page.getByRole('heading', { name: 'Funds Transfer', level: 1 });
        this.individualTransfersLink = this.page.locator('.active.pointer');
        this.multiAccountTransfersLink = this.page.locator('.inactive.pointer');
        this.fromAccountLabel = this.page.getByLabel('From Account');
        this.toAccountLabel = this.page.getByLabel('To Account');
        this.transferFundsButton = this.page.getByRole('button', { name: 'Transfer Funds' });
        this.transfersFromAccountList = this.page.getByRole('combobox', { name: 'From Account' });
        this.transfersToAccountList = this.page.getByRole('combobox', { name: 'To Account' });
        this.transactionsAmountLabel = this.page.getByLabel('Amount');
        this.transactionsFrequencyLabel = this.page.getByLabel('Frequency');
        this.transfersFrequencyList = this.page.getByRole('combobox', { name: 'Frequency' });
        this.transfersAmountInput = this.page.locator('.input-field[autocomplete="transaction-amount"]');
        this.transfersMemoLabel = this.page.getByLabel('Memo');
        this.transfersMemoListItem = this.page.getByRole('textbox', { name: 'Memo(optional)' });
        this.transfersMemoOptionalLabel = this.page.locator('.optional-tag');
        this.availableTemplatesHeader = this.page.getByRole('heading', { name: 'Available Templates' });
        this.searchTemplateTextBox = this.page.getByRole('search', { name: 'Search templates' });
        this.createTemplateButton = this.page.getByRole('button', { name: 'Create Template' });
        this.originationDetailsHeader = page.getByRole('heading', { name: 'Origination Details' });
        this.transferDateTextBox = this.page.locator('.pseudo-input-container');
        this.dateLocator = this.page.locator('td.is-valid').filter({ hasText: '30' });
        this.multiTransferMemoLabel = this.page.locator('#transferMemoAllLabel');
        this.multiTransferMemoTextBox = this.page.locator('div', { hasText: 'Memo' }).getByRole('textbox');
        this.multiTransferAccountsComboBox = this.page.locator('.search-select-input');
        this.globalAccount = this.page.locator('.col-xs-12.pad-T-xs.ellipsize[title="Global Nickname"]');
        this.seniorCheckingAccount = this.page.locator('.col-xs-12.pad-T-xs.ellipsize[title="Senior Checking"]');
        this.multiTransfersAmountTextBox = this.page.locator('input.input-field[aria-label="Amount"][placeholder="0.00"]')
        this.multiTransfersSubmitButton = this.page.getByRole('button', { name: 'Submit' });
        this.multiTransfersProcessedModal = this.page.getByRole('dialog', { name: 'Transaction Approved' });
        this.multiTransfersActivityCenterButton = this.multiTransfersProcessedModal.getByRole('button', { name: 'Activity Center' });

        // Stop payments locators
        this.stopPaymentHeader = this.page.getByRole('heading', { name: 'Stop Payment' });
        this.stopPaymentSubHeader = this.page.getByText('Complete the fields below to make a stop payment request based on known payment information.');
        this.requestTypeLabel = this.page.getByText('Request type');
        this.singleCheckLabel = this.page.getByText('Single Check');
        this.multipleChecksLabel = this.page.getByText('Multiple Checks');
        this.accountLabel = this.page.getByLabel('Account');
        this.checkNumberLabel = this.page.getByLabel('Check number');
        this.checkAmountLabel = this.page.getByLabel('Check amount');
        this.checkDateLabel = this.page.getByLabel('Check date');
        this.payeeNameLabel = this.page.getByLabel('Payee name');
        this.noteLabel = this.page.getByLabel('Note');
        this.accountDropdown = page.getByRole('combobox', { name: 'Account' });
        const staticAccountText = 'Business Interest	XXXXXX0671';
        this.accountOption = this.page.getByRole('option', { name: new RegExp(`^${staticAccountText}`), });
        this.checkNumberTextBox = this.page.getByRole('textbox', { name: 'Check number' });
        this.checkAmountTextBox = this.page.getByRole('textbox', { name: 'Check amount' });
        this.checkDateTextBox = this.page.locator('.pseudo-input-container');
        this.checkDateValue = this.page.locator('td.is-valid').filter({ hasText: '30' });
        this.payeeNameValue = this.page.getByRole('textbox', { name: 'Payee name' })
        this.payeeNoteValue = this.page.getByRole('textbox', { name: 'Note' })
        this.requestStopPaymentButton = this.page.getByRole('button', { name: 'Request stop payment' });
        this.stopPaymentProcessedModal = this.page.getByRole('dialog', { name: 'Stop Payment Successful' });
        this.stopPaymentActivityCenterButton = this.stopPaymentProcessedModal.getByRole('button', { name: 'View in Activity Center' });
        this.startingCheckNumberLabel = this.page.getByLabel('Starting check number');
        this.endingCheckNumberLabel = this.page.getByLabel('Ending check number');
        this.startingCheckDateLabel = this.page.getByLabel('Starting date');
        this.endingCheckDateLabel = this.page.getByLabel('Ending date');
        this.startingCheckNumberTextBox = this.page.getByRole('textbox', { name: 'Starting check number' });
        this.endingCheckNumberTextBox = this.page.getByRole('textbox', { name: 'Ending check number' });
        this.startingDateTextBox = this.page.getByRole('button', { name: 'Starting date' });
        this.endingDateTextBox = this.page.getByRole('button', { name: 'Ending date' });
        this.todaysDate = this.page.locator('q2-popover td.is-valid.is-today.is-selected')

        // Activity Center locators
        this.onlineActivityHeader = this.page.getByRole('heading', { name: 'Online Activity' });
        this.onlineActivitytooltip = this.page.getByRole('tooltip', { name: 'Transactions originated within your online banking platform.' });
        this.singleTransactionsTab = this.page.getByRole('tab', { name: 'Single Transactions' });
        this.recurringTransactionsTab = this.page.getByRole('tab', { name: 'Recurring Transactions' });
        this.activityCenterTransactionsList = this.page.locator('#txtActivityCenterTransactionList');
        this.filterButton = this.page.getByRole('button', { name: 'Filter' });
        this.favoritesButton = this.page.getByRole('button', { name: 'Favorites' });
        this.exportButton = this.page.getByRole('button', { name: 'Export' });
        this.printButton = this.page.getByRole('button', { name: 'Print' });
        this.activityCenterSearchInput = this.page.getByPlaceholder('Search Transactions');
        this.singleTransactionsCreditLabel = this.page.locator('.ac-credit-amount');
        this.singleTransactionsDebitLabel = this.page.locator('.ac-debit-amount');

        // Reports locators
        this.reportsHeader = this.page.getByRole('heading', { name: 'Reports' });
        this.informationReportsTab = this.page.getByRole('tab', { name: 'Information Reports' });
        this.reportsSearchInput = this.page.getByPlaceholder('Search');
        this.allReportsButton = this.page.locator('.total-available-reports');
        this.filtersButton = this.page.locator('.badge-filter');
        this.filterByAllButton = this.page.getByRole('button', { name: 'Click to filter reports by All' });
        this.filterByPrivateButton = this.page.getByRole('button', { name: 'Click to filter reports by Private' });
        this.filterBySharedButton = this.page.getByRole('button', { name: 'Click to filter reports by Shared' });
        this.newReportButton = this.page.getByRole('button', { name: 'New Report' });

        // Messages locators
        this.conversationsHeader = this.page.getByRole('heading', { name: 'Conversations' });
        this.newConversationButton = this.page.getByRole('button', { name: 'New Conversation' });
        this.deleteMultipleMessagesButton = this.page.locator('.deleteMultipleContainer');
        this.createNewMessageLink = this.page.getByRole('link', { name: 'click here to create a message.' });

        // Branches locators
        this.branchesHeader = this.page.getByRole('heading', { name: 'Branches' });
        this.regionMap = this.page.getByRole('region', { name: 'Map' });
        this.branchesSearchInput = this.page.getByPlaceholder('Search branches');
        this.locationsButton = this.page.getByRole('button', { name: 'Locations' });
        this.branchesTab = this.page.getByRole('tab', { name: 'Branches' });
        this.atmTab = this.page.getByRole('tab', { name: 'ATMs' });

        // Mobile authorizations locators
        this.mobileAuthorizationsHeader = this.page.getByRole('heading', { name: 'Mobile Authorizations' });
        this.mobileAuthorizationsSubHeader = this.page.getByText('Enter your desired Mobile Authorization Code and choose the transaction types for which you agree to be an eligible approver.');
        this.mobileAuthorizationAlert = this.page.getByText('NOTE: You must enter a Mobile Authorization Code to use for verification.');
        this.mobileAuthorizationCodeLabel = this.page.getByText('Mobile Authorization Code');
        this.mobileAuthorizationInput = this.page.getByPlaceholder('Enter a Mobile Authorization Code');
        this.mobileAuthorizationsInputNote = this.page.getByText('Your new code should be numeric and exactly 4 digits in length.');
        this.addEmailButton = this.page.getByRole('button', { name: 'Add Email' });
        this.addPhoneButton = this.page.getByRole('button', { name: 'Add Phone' });
        this.mobileAuthorizationsSubmitButton = this.page.getByRole('button', { name: 'Submit' });
        this.requiredFieldsLabel = this.page.getByText('Indicates required field');
        this.enrollmentLabel = this.page.getByText('Enrollment');
        this.eligibleTransactionsTypesLabel = this.page.getByText('Choose eligible transaction types:');
        this.selectAllButton = this.page.getByRole('button', { name: 'Select All' });
        this.clearAllButton = this.page.getByRole('button', { name: 'Clear All' });
        this.fundsTransferListItem = this.page.getByRole('checkbox', { name: 'Funds Transfer' });
        this.wireTransferListItem = this.page.getByRole('checkbox', { name: 'Wire Transfer' });
        this.achPaymentsListItem = this.page.getByRole('checkbox', { name: 'ACH Payments' });
        this.eftpsListItem = this.page.getByRole('checkbox', { name: 'EFTPS' });
        this.payrollListItem = this.page.getByRole('checkbox', { name: 'Payroll' });
        this.achCollectionsListItem = this.page.getByRole('checkbox', { name: 'ACH Collections' });
        this.internationalWireListItem = this.page.getByRole('checkbox', { name: 'International Wire' });
        this.achPassThruListItem = this.page.getByRole('checkbox', { name: 'ACH PassThru' });
        this.emailAddressLabel = this.page.getByLabel('Email Address');
        this.emailInput = this.page.getByRole('textbox', { name: 'Email Address' });
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.closeIcon = this.page.locator('ui-btn ember-view');
        this.countryLabel = this.page.getByText('Country');
        this.phoneNumberLabel = this.page.getByText('Phone Number');
        this.countryList = this.page.getByRole('combobox', { name: 'Country' });
        const staticCountryText = 'United States';
        this.countryOption = this.page.getByRole('option', { name: new RegExp(`^${staticCountryText}`), });
        this.phoneNumberInput = this.page.getByRole('textbox', { name: 'Phone Number' });
        const positivePayFrame = this.page.frameLocator('iframe');
        this.positivePayHeader = positivePayFrame.getByRole('heading', { name: 'Positive Pay' });

        //Home Page Preferences locators
        this.homePagePreferencesHeader = this.page.getByRole('heading', { name: 'Home Page Preferences' });
        this.rightMenuQuickLinksLabel = this.page.getByText('Right Menu Quick Links');
        this.rightMenuWidgetsLabel = this.page.getByText('Right Menu Widgets');
        this.accountListLabel = this.page.getByRole('heading', { name: 'Account List' });
        this.mainContentWidgetsLabel = this.page.getByText('Main Content Widgets');

        //Account Preferences locators
        this.accountPreferencesHeader = this.page.getByRole('heading', { name: 'Account Preferences' });
        this.accountPreferencesSubHeader = this.page.getByText('Click anywhere on the account row if you would like to add/edit an account nickname, enable SMS/Text banking or view account details.  Group and sort accounts as they are displayed on the homepage.');
        this.preferenceHeader = this.page.locator('.pref-header');
        this.editableTitle = this.page.locator('.editable-title');

        //Security Preferences locators
        this.securityPreferencesHeader = this.page.getByRole('heading', { name: 'Security Preferences' });
        this.changePasswordLink = this.page.locator('a[href="#/settings/security/changePassword"]');
        this.backToSecurityPreferencesLink = this.page.locator('a[href="#/settings/security"]');
        this.changePasswordLabel = this.page.getByRole('heading', { name: 'Change Password' });
        this.passwordChangeWarningMessage = this.page.getByText('Password may not be the same as current password or previous 10 passwords.');
        this.passwordRequirementsHeader = this.page.getByRole('heading', { name: 'Password requirements:' });
        this.currentPasswordLabel = this.page.getByLabel('Current Password');
        this.newPasswordLabel = this.page.getByLabel('New Password', { exact: true });
        this.confirmPasswordLabel = this.page.getByLabel('Confirm New Password', { exact: true });
        this.changePasswordButton = this.page.getByRole('button', { name: 'Change Password' });
        this.changeLoginIdLink = this.page.locator('a[href="#/settings/security/changeLogin"]');
        this.changeLoginIDHeader = this.page.getByRole('heading', { name: 'Change Login ID' });
        this.newLoginIDWarningSubHeader = this.page.getByText('Type your desired new Login ID in the field below.');
        this.loginIdRequirementsHeader = this.page.getByRole('heading', { name: 'Login ID Requirements:', level: 2 });
        this.newLoginIDLabel = this.page.getByLabel('New Login ID');
        this.saveNewLoginIDButton = this.page.getByRole('button', { name: 'Save new Login ID' });
        this.securityDeliveryLink = this.page.locator('a[href="#/settings/security/mfaTargets"]');
        this.securityLink = this.page.locator('a[href="#/settings/security"]');
        this.securityDeliveryHeader = this.page.getByRole('heading', { name: 'Secure Delivery Contact Information' });
        this.securityDeliverySubHeader = this.page.getByText('Enter your preferred contact information, which will be used for Secure Access Code delivery.');
        this.securityEmailAddressLabel = this.page.getByLabel('Email Address');
        this.voiceNumberLabel = this.page.getByLabel('Edit Voice Number');
        this.smsTextNumber = this.page.getByLabel('SMS Text Number');

        //Settings -> Alerts locators
        this.alertsHeader = this.page.getByRole('heading', { name: 'Alerts' });
        this.alertsToolTip = this.page.getByText('Create and manage alerts for your accounts. Enable/Disable security alerts for account activity and edit delivery preferences for receiving alerts.');
        this.newAlertButton = this.page.getByRole('button', { name: 'New Alert' });

        //Settings -> Users locators
        this.userManagementHeader = this.page.getByRole('heading', { name: 'User Management' });
        this.searchUsersTextBox = this.page.getByPlaceholder('Search Users');
        this.addUserButton = this.page.getByRole('button', { name: 'Add User' });

        //Settings -> User Roles locators
        this.mainContentFrame = this.page.frameLocator('iframe');
        this.userRolesHeader = this.mainContentFrame.getByRole('heading', { level: 1, name: 'User Roles' });
        this.searchUserRolesTextBox = this.mainContentFrame.getByRole('search', { name: 'Search' });
        this.createRuleButton = this.mainContentFrame.getByRole('button', { name: 'Create Role' });

        //Settings -> Accessibility locators
        this.accessibilitySettingsHeader = this.page.getByRole('heading', { name: 'Accessibility Settings' });
        this.accessibilitySettingsSubHeader = this.page.getByText('We are committed to providing online banking that is usable and accessible to everyone. On this page, you will find tools and settings that can enhance your online banking experience.');
        this.enableHighContrastModeLabel = this.page.getByLabel('Enable high contrast mode');
        this.enableHighContrastModeCheckBox = this.page.locator('.checkbox-icon');
    }

    // --- Helper Methods for Dynamic Locators ---
    /**
     * Gets a locator for an item in the payments menu.
     * @param {string} name - The exact text of the menu item (e.g., "Loan Payments").
     * @returns {Locator}
     */
    getMenuItem(name) {
        return this.page.getByRole('link', { name, exact: true });
    }

    /**
     * Gets a locator for a generic list item option.
     * @param {string} name - The text of the option to find.
     * @returns {Locator}
     */
    getOption(name) {
        return this.iframeLocator.locator('q2-option', { hasText: name });
    }

    async verifyAuthenticatedLandingPageElements() {
        const visibleLocators = [
            this.homeHeader,
            this.customerNameText,
            this.brandingImage,
            this.navbarBranding,
            this.tipText,
            this.accountHeader,
            this.quickTransferLink
        ];

        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocators.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));

        // Use toHaveCount for elements that appear multiple times
        await expect(this.lockedLoginsHeader).toHaveCount(2);
        await expect(this.transactionApprovalsHeader).toHaveCount(2);
        await expect(this.favoriteReportsHeader).toHaveCount(2);
        await expect(this.toolTip).toContainText('Please click the account tile to view your Account History. You may also click the three dots in the right hand corner of the tile to complete a Quick Transfer between accounts.');
        await expect(this.page).toHaveURL('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/landingPage');
    }

    async verifypaymentsMenuListItems() {
        await this.paymentsMenu.click();
        const menuItems = [
            "Loan Payments", "Payment Exchange", "ACH/Wire",
            "ACH Pass-Thru", "Recipients", "Tax Payment", "Wire Activity", "Business Bill Pay"
        ];
        const visibilityChecks = menuItems.map(item =>
            expect(this.getMenuItem(item)).toBeVisible()
        );
        await Promise.all(visibilityChecks);
    }

    async verifyTransactionsMenuListItems() {
        await this.transactionsMenu.click();
        const menuItems = [
            "Funds Transfer", "Stop Payments"
        ];
        const visibilityChecks = menuItems.map(item =>
            expect(this.getMenuItem(item)).toBeVisible()
        );
        await Promise.all(visibilityChecks);
    }

    /**
     * Completes the entire loan payment flow using provided details.
     * @param {object} paymentDetails
     * @param {string} paymentDetails.fromAccount - Text to identify the 'From' account.
     * @param {string} paymentDetails.toAccount - Text to identify the 'To' account.
     * @param {string} paymentDetails.paymentType - The type of payment (e.g., "Regular Payment").
     * @param {string} paymentDetails.amount - The payment amount.
     * @param {string} paymentDetails.memo - The text for the memo field.
     */
    async makeLoanPayments(paymentDetails) {
        // Navigate to the Loan Payments page
        await this.paymentsMenu.click();
        await this.getMenuItem('Loan Payments').click();
        await expect(this.page).toHaveURL('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/extension/CGBA_LoanPaymentsTCT_JH2/Main');
        await expect(this.loanPaymentsHeader).toBeVisible();
        await expect(this.loanPaymentsSubHeader).toBeVisible();
        await expect(this.fromLabel.first()).toBeVisible();
        await expect(this.toLabel.first()).toBeVisible();
        await expect(this.clearButton).toBeVisible();
        await expect(this.submitButton).toBeVisible();

        // Select 'From' account
        await this.fromAccountList.click();
        await this.fromAccountOption.click();

        // Select 'To' account
        await this.toAccountList.click();
        await this.toAccountOption.click();
        await expect(this.toAccountHadesRow).toBeVisible({ timeout: 20000 });

        // Select Payment Type
        await expect(this.paymentTypeLabel.first()).toBeVisible();
        //await expect(this.paymentAmountLabel).toBeVisible();
        await this.paymentTypeList.click();
        await this.getOption(paymentDetails.paymentType).click();

        // Fill form details
        await expect(this.paymentAmountLabel).toBeVisible();
        await this.amountInput.clear();
        await this.amountInput.pressSequentially(paymentDetails.amount);
        await expect(this.recurringTransactionLabel).toBeVisible();
        await this.recurringTransactionCheckBox.click();
        await expect(this.selectPaymentFrequencyLabel.first()).toBeVisible({ timeout: 3000 });
        await this.selectPaymentFrequencyList.click();
        await this.selectMonthlyFrequencyOption.click();
        await expect(this.startDateLabel.first()).toBeVisible();
        await expect(this.endDateLabel.first()).toBeVisible();
        await this.startDateTextBox.clear();
        await this.startDateTextBox.pressSequentially('02/27/2026');
        await this.endDateTextBox.pressSequentially('12/30/2026');
        //await expect(this.dateLabel.first()).toBeVisible();
        await expect(this.memoLabel.first()).toBeVisible();
        await expect(this.memoOptionalLabel.first()).toBeVisible();
        await this.memoListItem.fill(paymentDetails.memo);

        //Submit and confirm the payment
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Enter');

        //await this.page.pause();
        await expect(this.confirmationModal).toBeVisible({ timeout: 20000 });
        await expect(this.fromAccountValue).toContainText('XXXXXX1111 - Global Nickname -');
        await expect(this.toAccountValue).toContainText('XXXXXX7445 - Commerical/Ag RE -');
        await expect(this.paymentTypeValue).toContainText(paymentDetails.paymentType);
        await expect(this.paymentAmountValue).toContainText(`$${paymentDetails.amount}`);
        await expect(this.memoValue).toContainText(paymentDetails.memo);
        await this.confirmButton.click();

        // Verify success and close
        await expect(this.transactionProcessedHeader).toBeVisible({ timeout: 120000 });
        await expect(this.paymentSubmissionSubHeader).toBeVisible();
        await expect(this.transactionIDValue).not.toBeNull();
        await this.activityCenterButton.click();

        // Activity Center
        await expect(this.transactionDetailsHeader).toBeVisible({ timeout: 20000 });
        await expect(this.transactionListHeader).toBeVisible();
        await expect(this.paymentDetailsHeader).toBeVisible();
        await expect(this.transactionProcessHeader).toBeVisible();
    }

    async individualTransfers(individualTransfersDetails) {
        // Navigate to the Transactios - individual transfers page
        await this.transactionsMenu.click();
        await this.getMenuItem('Funds Transfer').click();
        await expect(this.page).toHaveURL('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/transfer');
        await expect(this.toolTip).toContainText('View online transfer history in the Activity Center or Right Hand Pane of Funds Transfer page.');
        await expect(this.fundsTransferHeader).toBeVisible({ timeout: 20000 });
        await expect(this.individualTransfersLink).toBeVisible();
        await expect(this.multiAccountTransfersLink).toBeVisible();
        await expect(this.fromAccountLabel).toBeVisible();
        await expect(this.toAccountLabel).toBeVisible();
        await expect(this.transferFundsButton).toBeVisible();

        // Select 'From' account
        await this.transfersFromAccountList.click();
        //await this.transfersFromAccountOption.click();
        await this.page.getByRole('option').nth(1).click();

        // Select 'To' account
        await this.transfersToAccountList.click();
        //await this.transfersToAccountOption.click();
        await this.page.getByRole('option').nth(1).click();

        // Fill form details
        await expect(this.transactionsAmountLabel).toBeVisible();
        await this.transfersAmountInput.clear();
        await this.transfersAmountInput.pressSequentially(individualTransfersDetails.amount);
        await expect(this.transactionsFrequencyLabel).toBeVisible();

        // Select Frequency
        await this.transfersFrequencyList.click();
        await this.page.getByRole('option').nth(0).click();
        await expect(this.transfersMemoLabel).toBeVisible();
        await expect(this.transfersMemoOptionalLabel).toBeVisible();
        await this.transfersMemoListItem.fill(individualTransfersDetails.memo);
        await this.transferFundsButton.click();
    }


    async multiAccountTransfers(multiAccountTransfersDetails) {
        // Navigate to the Transactions - individual transfers page
        await this.transactionsMenu.click();
        await this.page.getByRole('link', { name: 'Funds Transfer' }).click();
        await expect(this.page).toHaveURL(/.*\/transfer/);
        await expect(this.page.getByText('View online transfer history in the Activity Center')).toBeVisible();
        await expect(this.fundsTransferHeader).toBeVisible();
        await expect(this.individualTransfersLink).toBeVisible();
        await expect(this.multiAccountTransfersLink).toBeVisible();
        await expect(this.fromAccountLabel).toBeVisible();
        await expect(this.toAccountLabel).toBeVisible();
        await expect(this.transferFundsButton).toBeVisible();
        await this.multiAccountTransfersLink.click();
        await expect(this.availableTemplatesHeader).toBeVisible();
        await expect(this.searchTemplateTextBox).toBeVisible();
        await expect(this.createTemplateButton).toBeVisible();
        await this.transferFundsButton.click();
        await expect(this.originationDetailsHeader).toBeVisible();
        await expect(this.transferDateTextBox).toBeVisible();
        await this.transferDateTextBox.click();
        await this.dateLocator.click({ timeout: 10000 });
        await expect(this.multiTransferMemoLabel).toBeVisible();
        await (this.multiTransferMemoTextBox.first()).fill(multiAccountTransfersDetails.memo);
        await (this.multiTransferAccountsComboBox.first()).click();
        await (this.globalAccount.first()).click({ timeout: 10000 });
        await (this.multiTransferAccountsComboBox.nth(1)).click();
        await (this.seniorCheckingAccount.first()).waitFor({ state: 'visible', timeout: 10000 });
        await (this.seniorCheckingAccount.first()).click({ timeout: 10000 });
        await (this.multiTransfersAmountTextBox.first()).fill(multiAccountTransfersDetails.amount);
        await this.multiTransfersSubmitButton.click();
        await expect(this.confirmationModal).toBeVisible();
        await this.multiTransfersActivityCenterButton.click();
        // Activity Center (Consolidated Expectations)
        await expect(this.page.getByRole('heading', { name: 'Transaction Details' })).toBeVisible();
        await expect(this.transactionListHeader).toBeVisible();
        await expect(this.paymentDetailsHeader).toBeVisible();
        await expect(this.transactionProcessHeader).toBeVisible();
    }

    async singleCheckStopPayment(singleChecksDetails) {
        await this.transactionsMenu.click();
        await this.page.getByRole('link', { name: 'Stop Payments' }).click();
        await expect(this.page).toHaveURL(/.*\/stopPayment/);
        await expect(this.page.getByText('Stop Payment Orders expire after 6 months. To continue the Stop Order, you must re-enter the request after the expiration. See our Fee Schedule for applicable Stop Payment fees.')).toBeVisible();
        await expect(this.stopPaymentHeader).toBeVisible();
        await expect(this.stopPaymentSubHeader).toBeVisible();
        await expect(this.requestTypeLabel).toBeVisible();
        await expect(this.singleCheckLabel).toBeVisible();
        await expect(this.multipleChecksLabel).toBeVisible();
        await expect(this.accountLabel).toBeVisible();
        await expect(this.checkNumberLabel).toBeVisible();
        await expect(this.checkAmountLabel).toBeVisible();
        await expect(this.checkDateLabel).toBeVisible();
        await expect(this.payeeNameLabel).toBeVisible();
        await expect(this.noteLabel).toBeVisible();
        await expect(this.requestStopPaymentButton).toBeVisible();
        await this.accountDropdown.selectOption({ index: 1 });
        await this.checkNumberTextBox.fill(singleChecksDetails.checkNumber);
        await this.checkAmountTextBox.fill(singleChecksDetails.checkAmount);
        await this.checkDateTextBox.click();
        await this.checkDateValue.click({ timeout: 10000 });
        await this.payeeNameValue.fill(singleChecksDetails.payeeName);
        await this.payeeNoteValue.fill(singleChecksDetails.note);
        await this.requestStopPaymentButton.click();
        await expect(this.stopPaymentProcessedModal).toBeVisible();
        await this.stopPaymentActivityCenterButton.click();
        // Activity Center (Consolidated Expectations)
        await expect(this.page.getByRole('heading', { name: 'Transaction Details' })).toBeVisible();
        await expect(this.transactionListHeader).toBeVisible();
        await expect(this.paymentDetailsHeader).toBeVisible();
        await expect(this.transactionProcessHeader).toBeVisible();
    }

    async multipleChecksStopPayment(multipleChecksDetails) {
        await this.transactionsMenu.click();
        await this.page.getByRole('link', { name: 'Stop Payments' }).click();
        await expect(this.page).toHaveURL(/.*\/stopPayment/);
        await expect(this.page.getByText('Stop Payment Orders expire after 6 months. To continue the Stop Order, you must re-enter the request after the expiration. See our Fee Schedule for applicable Stop Payment fees.')).toBeVisible();
        await expect(this.stopPaymentHeader).toBeVisible();
        await expect(this.stopPaymentSubHeader).toBeVisible();
        await expect(this.requestTypeLabel).toBeVisible();
        await expect(this.singleCheckLabel).toBeVisible();
        await expect(this.multipleChecksLabel).toBeVisible();
        await this.multipleChecksLabel.click();
        await expect(this.accountLabel).toBeVisible();
        await expect(this.startingCheckNumberLabel).toBeVisible();
        await expect(this.endingCheckNumberLabel).toBeVisible();
        await expect(this.startingCheckDateLabel).toBeVisible();
        await expect(this.endingCheckDateLabel).toBeVisible();
        await expect(this.noteLabel).toBeVisible();
        await expect(this.requestStopPaymentButton).toBeVisible();
        await this.accountDropdown.selectOption({ index: 1 });
        await this.startingCheckNumberTextBox.fill(multipleChecksDetails.startingCheckNumber);
        await this.endingCheckNumberTextBox.fill(multipleChecksDetails.endingCheckNumber);
        await this.startingDateTextBox.click();
        await (this.todaysDate.first()).click();
        await this.endingDateTextBox.click();
        await (this.todaysDate.nth(1)).click();
        await this.payeeNoteValue.fill(multipleChecksDetails.note);
        await this.requestStopPaymentButton.click();
        await expect(this.stopPaymentProcessedModal).toBeVisible();
        await this.stopPaymentActivityCenterButton.click();
        // Activity Center (Consolidated Expectations)
        await expect(this.page.getByRole('heading', { name: 'Transaction Details' })).toBeVisible();
        await expect(this.transactionListHeader).toBeVisible();
        await expect(this.paymentDetailsHeader).toBeVisible();
        await expect(this.transactionProcessHeader).toBeVisible();
    }

    async singleTransactionActivities() {
        await this.activityCenterMenu.click();
        await expect(this.page).toHaveURL(/.*\/activityCenter/);
        await expect(this.page.getByText('View your Online Banking activity. Click the export arrow on the right hand side to export the information listed on the screen.')).toBeVisible();
        await expect(this.onlineActivityHeader).toBeVisible();
        await expect(this.onlineActivitytooltip).toBeVisible();
        await expect(this.singleTransactionsTab).toBeVisible();
        await expect(this.activityCenterTransactionsList.first()).toBeVisible();
        await expect(this.recurringTransactionsTab).toBeVisible();
        await expect(this.filterButton).toBeVisible();
        await expect(this.favoritesButton).toBeVisible();
        await expect(this.exportButton).toBeVisible();
        await expect(this.printButton).toBeVisible();
        await expect(this.activityCenterSearchInput.nth(1)).toBeVisible();
        await expect(this.singleTransactionsCreditLabel).toBeVisible();
        await expect(this.singleTransactionsDebitLabel).toBeVisible();
    }

    async recurringTransactionsActivities() {
        await this.activityCenterMenu.click();
        await expect(this.page).toHaveURL(/.*\/activityCenter/);
        await expect(this.page.getByText('View your Online Banking activity. Click the export arrow on the right hand side to export the information listed on the screen.')).toBeVisible();
        await expect(this.onlineActivityHeader).toBeVisible();
        await expect(this.onlineActivitytooltip).toBeVisible();
        await expect(this.singleTransactionsTab).toBeVisible();
        await expect(this.recurringTransactionsTab).toBeVisible();
        await this.recurringTransactionsTab.click();
        await expect(this.activityCenterTransactionsList.first()).toBeVisible();
        await expect(this.filterButton).toBeVisible();
        await expect(this.favoritesButton).toBeVisible();
        await expect(this.exportButton).toBeVisible();
        await expect(this.printButton).toBeVisible();
        await expect(this.activityCenterSearchInput.nth(1)).toBeVisible();
    }

    async reportsValidation() {
        await this.reportsMenu.click();
        await expect(this.page).toHaveURL(/.*\/report-engine\/reports/);
        await expect(this.page.getByText('Choose the Create New Reports option on the right hand side of the screen to create reports. CD reporting is currently unavailable.')).toBeVisible();
        await expect(this.reportsHeader).toBeVisible();
        await expect(this.informationReportsTab).toBeVisible();
        await expect(this.reportsSearchInput).toBeVisible();
        await expect(this.allReportsButton).toBeVisible();
        await expect(this.filtersButton).toBeVisible();
        await expect(this.filterByAllButton).toBeVisible();
        await expect(this.filterByPrivateButton).toBeVisible();
        await expect(this.filterBySharedButton).toBeVisible();
        await expect(this.newReportButton).toBeVisible();
    }

    async messagesValidation() {
        await this.messagesMenu.click();
        await expect(this.page).toHaveURL(/.*\/messages/);
        await expect(this.conversationsHeader.first()).toBeVisible();
        await expect(this.newConversationButton).toBeVisible();
        await expect(this.deleteMultipleMessagesButton).toBeVisible();
        await expect(this.createNewMessageLink).toBeVisible();
    }

    async branchesValidation() {
        await this.branchesMenu.click();
        await expect(this.page).toHaveURL(/.*\/branches/);
        await expect(this.page.getByText('Mapping from your current location. You can click on the Branch on the right hand side of the screen to get directions and view Lobby and Drive-Thru Hours.')).toBeVisible();
        await expect(this.branchesHeader).toBeVisible();
        await expect(this.regionMap).toBeVisible();
        await expect(this.branchesSearchInput).toBeVisible();
        await expect(this.locationsButton.first()).toBeVisible();
        await expect(this.branchesTab).toBeVisible();
        await expect(this.atmTab).toBeVisible();
    }


    async verifyPaymentExchangePageElements() {
        await this.paymentsMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('Payment Exchange').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const paymentExchangePage = new PaymentExchangePage(newPage);
        await paymentExchangePage.verifyPageTitle("Guaranty Bank › Payment Exchange");
        await paymentExchangePage.verifyHeader("Payment Exchange");
        await expect(paymentExchangePage.page).toHaveURL('https://gbankmo.com/business/echeck/echeck-notice');
    }

    async privacyPolicyValidation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.privacyPolicyMenu.click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const privacyPolicyPage = new PrivacyPolicyPage(newPage);
        await privacyPolicyPage.verifyPageTitle("Guaranty Bank › Privacy");
        await privacyPolicyPage.verifyHeader("Privacy");
        await expect(privacyPolicyPage.page).toHaveURL('https://gbankmo.com/privacy');
    }

    async statementsOrNoticesValidation() {
        await this.servicesMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('Statements/Notices').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const statementsNoticesPage = new StatementsNoticesPage(newPage);
        await expect(statementsNoticesPage.page).toHaveURL('https://secure.gbankmo.com/gbankmoonlinebanking/test/mobilews/sso/vendor/10');
    }

    async remoteDepositCaptureValidation() {
        await this.servicesMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('Remote Deposit Capture').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const remoteDepositCapturePage = new RemoteDepositCapturePage(newPage);
        await expect(remoteDepositCapturePage.page).toHaveURL('https://secure.gbankmo.com/gbankmoonlinebanking/test/mobilews/sso/vendor/8');
    }


    async mobileAuthorizationsValidation() {
        await this.servicesMenu.click();
        await this.page.getByRole('link', { name: 'Mobile Authorizations' }).click();
        await expect(this.page).toHaveURL(/.*\/mobileAuthorizations/);
        await expect(this.page.getByText('Enter your desired Mobile Authorization Code and choose the transaction types for which you agree to be an eligible approver.')).toBeVisible();

        const visibleLocators = [
            this.mobileAuthorizationsHeader,
            this.mobileAuthorizationsSubHeader,
            this.mobileAuthorizationAlert,
            this.mobileAuthorizationCodeLabel.nth(2),
            this.mobileAuthorizationInput,
            this.mobileAuthorizationsInputNote,
            this.addEmailButton,
            this.addPhoneButton,
            this.mobileAuthorizationsSubmitButton,
            this.requiredFieldsLabel,
            this.enrollmentLabel,
            this.eligibleTransactionsTypesLabel,
            this.selectAllButton,
            this.clearAllButton,
            this.fundsTransferListItem,
            this.wireTransferListItem,
            this.achPaymentsListItem,
            this.eftpsListItem,
            this.payrollListItem,
            this.achCollectionsListItem,
            this.internationalWireListItem,
            this.achPassThruListItem
        ];

        for (const locator of visibleLocators) {
            await expect(locator).toBeVisible();
        }

        const manageContactMethod = async (addButton, inputLocator, value, saveButton, page, removeLocatorText) => {
            await addButton.click();
            await expect(saveButton).toBeVisible(); // Save and Cancel buttons should be visible for both flows
            await expect(this.cancelButton).toBeVisible();

            if (inputLocator === this.emailInput) {
                await expect(this.emailAddressLabel).toBeVisible({ timeout: 10000 });
                await inputLocator.fill(value);
            } else if (inputLocator === this.phoneNumberInput) {
                await expect(this.countryLabel.first()).toBeVisible();
                await expect(this.phoneNumberLabel.first()).toBeVisible();
                await this.countryList.selectOption('212');
                await inputLocator.fill(value);
                await page.keyboard.press('Tab');
            }

            await saveButton.click();
            const savedItem = page.locator(`text=${removeLocatorText}`).first();
            await expect(savedItem).toBeVisible();
            await page.getByLabel(`Remove ${removeLocatorText}`).first().click();
        };

        const emailValue = 'test@test.com';
        await manageContactMethod(this.addEmailButton, this.emailInput, emailValue, this.saveButton, this.page, emailValue);
        const phoneValueRaw = '6124578589';
        const phoneValueFormatted = '(612) 457-8589';
        await manageContactMethod(this.addPhoneButton, this.phoneNumberInput, phoneValueRaw, this.saveButton, this.page, phoneValueFormatted);

        const transactionCheckboxes = [
            this.wireTransferListItem,
            this.achPaymentsListItem,
            this.eftpsListItem,
            this.payrollListItem,
            this.achCollectionsListItem,
            this.internationalWireListItem,
            this.achPassThruListItem
        ];

        // Select All Checkboxes
        await this.selectAllButton.click();
        for (const checkbox of transactionCheckboxes) {
            await expect(checkbox).toBeChecked();
        }

        // Clear All Checkboxes
        await this.clearAllButton.click();
        for (const checkbox of transactionCheckboxes) {
            await expect(checkbox).not.toBeChecked();
        }
    }

    async achReportsValidation() {
        await this.servicesMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('ACH Reports').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const achReportsPage = new ACHReportsPage(newPage);
        await expect(achReportsPage.page).toHaveURL('https://secure.gbankmo.com/gbankmoonlinebanking/test/mobilews/sso/vendor/7');
    }

    async lockboxValidation() {
        await this.servicesMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('Lockbox').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const lockboxPage = new LockBoxPage(newPage);
        await expect(lockboxPage.page).toHaveURL('https://sso.iremitweb.com/api/SSO/Process');
    }

    async positivePayValidation() {
        await this.servicesMenu.click();
        await this.page.getByRole('link', { name: 'Positive Pay' }).click();
        await expect(this.page).toHaveURL(/.*\/PositivePay/);
        await expect(this.page).toHaveTitle("Positive Pay | Guaranty Bank");
        await expect(this.positivePayHeader).toBeVisible({ timeout: 30000 });
    }

    async helpSearchToolValidation() {
        await this.helpMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('Help Search Tool').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const helpSearchToolPage = new HelpSearchToolPage(newPage);
        await expect(helpSearchToolPage.page).toHaveURL('https://cdn1.onlineaccess1.com/cdn/base/documentation/help/4.5.2.0/content/enduser/onlinehelp/home3.htm');
        await helpSearchToolPage.verifyWelcomeMessage();
    }

    async onlineBankingTermsConditionsValidation() {
        await this.helpMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('Online Banking Terms and Conditions').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const onlineBankingTermsConditionsPage = new OnlineBankingTermsConditionsPage(newPage);
        await expect(onlineBankingTermsConditionsPage.page).toHaveURL('https://gbankmo.com/business/business-services-agreement-and-disclosure');
        await onlineBankingTermsConditionsPage.verifyPageTitle('Guaranty Bank › Services Agreement and Disclosure');
        await onlineBankingTermsConditionsPage.verifyHeader('Services Agreement and Disclosure');
    }

    async achReferenceGuideValidation() {
        await this.helpMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('ACH Reference Guide').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const achReferenceGuidePage = new ACHReferenceGuidePage(newPage);
        await expect(achReferenceGuidePage.page).toHaveURL('https://gbankmo.com/files/documents/ACH%20Reference%20Guide%202024%20v1024.pdf');
    }

    async fraudPreventionRecommendationsValidation() {
        await this.helpMenu.click();
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.getMenuItem('Fraud Prevention Recommendations').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const fraudPreventionRecommendationsPage = new FraudPreventionRecommendationsPage(newPage);
        await expect(fraudPreventionRecommendationsPage.page).toHaveURL('https://gbankmo.com/business/additional-resources/fraud-prevention-recommendations');
        await fraudPreventionRecommendationsPage.verifyPageTitle('Guaranty Bank › Fraud Prevention Recommendations');
        await fraudPreventionRecommendationsPage.verifyHeader('Fraud Prevention Recommendations');
    }

    async verifyACHWirePageElements() {
        await this.paymentsMenu.click();
        await this.getMenuItem('ACH/Wire').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("ACH/Wire | Guaranty Bank");
        const visibleLocators = [
            this.paymentsHubHeader,
            this.newPaymentButton,
            this.searchTemplatesTextBox,
            this.templateContainer,
            this.templateNewPaymentContainer,
            this.templateNewTemplateContainer
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocators.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await expect(this.toolTip).toContainText('Choose a New Template or New Payment to create an ACH or Wire profile. Click the pencil icon to edit an existing template and Save, Draft, or Approve the payment. ');
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/commercial-engine/commercial/templates/');
    }

    async verifyACHPassThruPageElements() {
        await this.paymentsMenu.click();
        await this.getMenuItem('ACH Pass-Thru').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(4000);
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/commercial-engine/commercial/achPassthru');
        await expect(this.page).toHaveTitle("ACH Pass-Thru | Guaranty Bank");
        const visibleLocators = [
            this.achPassThruHeader,
            this.importFileLabel.first(),
            this.processDateLabel.nth(1),
            this.achmemoLabel,
            this.draftButton,
            this.approveButton,
            this.passThruUploadLogHeader,
            this.createAlertButton
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocators.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await expect(this.toolTip).toContainText('Process Date should be the day PRIOR to your Effective Date. This is the date the file will be sent for processing. Do NOT enter the Effective Date in this field.');
    }

    async verifyRecipientsPageElements() {
        await this.paymentsMenu.click();
        await this.getMenuItem('Recipients').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Recipients | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/commercial-engine/commercial/recipients');
        const visibleLocators = [
            this.recipientsHeader,
            this.newRecipientButton,
            this.searchRecipientsTextBox,
            //this.recipientsTable
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocators.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await expect(this.toolTip).toContainText('Add an ACH or Wire Recipient, or click the pencil icon to edit an existing recipient.');
    }

    async verifyTaxPaymentPageElements() {
        await this.paymentsMenu.click();
        await this.getMenuItem('Tax Payment').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Tax Payment | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/commercial-engine/commercial/taxPayment?state=');
        const visibleLocators = [
            this.taxPaymentsHeader,
            this.stateOrFederalAuthorityLabel,
            this.selectAuthorityInput,
            this.filterFormsTextBox,
            this.selectTaxFormLabel
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocators.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await expect(this.toolTip).toContainText('Choose a Tax Authority, and Draft or Approve a Tax Payment. ');
    }

    async verifyWireActivityPageElements() {
        await this.paymentsMenu.click();
        await this.getMenuItem('Wire Activity').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Wire Activity | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/commercial-engine/commercial/wireActivity');
        const visibleLocators = [
            this.wireActivity,
            this.outgoinghTab,
            this.incomingTab
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocators.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await expect(this.toolTip).toContainText('Review or Export Wire Activity.');
    }

    async homePagePreferencesValidation() {
        await this.settingsMenu.click();
        await this.getMenuItem('Home Page Preferences').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Home Preferences | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('https://secure.gbankmo.com/gbankmoonlinebanking/test/uux.aspx#/settings/dashboardPreferences');
        const visibleLocators = [
            this.homePagePreferencesHeader,
            this.rightMenuQuickLinksLabel,
            this.rightMenuWidgetsLabel,
            this.accountListLabel,
            this.mainContentWidgetsLabel
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocators.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
    }

    async accountPreferencesValidation() {
        await this.settingsMenu.click();
        await this.getMenuItem('Account Preferences').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Account Preferences | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('/settings/accountPreferences');
        const visibleLocators = [
            this.accountPreferencesHeader,
            this.accountPreferencesSubHeader,
            this.preferenceHeader,
            this.editableTitle
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocators.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
    }

    async securityPreferencesValidation() {
        await this.settingsMenu.click();
        await this.getMenuItem('Security Preferences').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Security Preferences | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('/settings/security');
        const visibleLocatorsOnSecurityPreferences = [
            this.securityPreferencesHeader,
            this.changePasswordLink,
            this.changeLoginIdLink,
            this.securityDeliveryLink
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocatorsOnSecurityPreferences.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await this.changePasswordLink.click();
        await this.page.waitForLoadState('networkidle');
        const visibleLocatorsOnChangePassword = [
            this.backToSecurityPreferencesLink,
            this.changePasswordLabel,
            this.passwordChangeWarningMessage,
            this.passwordRequirementsHeader,
            this.currentPasswordLabel,
            this.newPasswordLabel,
            this.confirmPasswordLabel,
            this.changePasswordButton
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocatorsOnChangePassword.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await this.backToSecurityPreferencesLink.click();
        await this.page.waitForLoadState('networkidle');
        await this.changeLoginIdLink.click();
        await this.page.waitForLoadState('networkidle');
        const visibleLocatorsOnChangeLoginID = [
            this.changeLoginIDHeader,
            this.newLoginIDWarningSubHeader,
            this.loginIdRequirementsHeader,
            this.newLoginIDLabel,
            this.saveNewLoginIDButton
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocatorsOnChangeLoginID.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await this.backToSecurityPreferencesLink.click();
        await this.page.waitForLoadState('networkidle');
        await this.securityDeliveryLink.click();
        await this.page.waitForLoadState('networkidle');
        const visibleLocatorsOnSecureDelivery = [
            this.securityLink,
            this.securityDeliveryHeader,
            this.securityDeliverySubHeader,
            this.securityEmailAddressLabel.first(),
            this.voiceNumberLabel.first(),
            this.smsTextNumber.first()
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocatorsOnSecureDelivery.map(locator =>
            expect(locator).toBeVisible({ timeout: 50000 })
        ));
        await this.backToSecurityPreferencesLink.click();
    }

    async alertsValidation() {
        await this.settingsMenu.click();
        await this.getMenuItem('Alerts').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Alerts | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('/settings/alerts');
        const visibleLocatorsOnSecurityPreferences = [
            this.alertsHeader,
            this.alertsToolTip,
            this.newAlertButton
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocatorsOnSecurityPreferences.map(locator =>
            expect(locator).toBeVisible({ timeout: 25000 })
        ));
    }

    async usersValidation() {
        await this.settingsMenu.click();
        await this.getMenuItem('Users').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Users | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('/userManagement/users');
        const visibleLocatorsOnSecurityPreferences = [
            this.userManagementHeader,
            this.searchUsersTextBox,
            this.addUserButton
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocatorsOnSecurityPreferences.map(locator =>
            expect(locator).toBeVisible({ timeout: 25000 })
        ));
    }

    async userRolesValidation() {
        await this.settingsMenu.click();
        await this.getMenuItem('User Roles').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("User Roles | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('/policies/roles/company');
        const visibleLocatorsOnSecurityPreferences = [
            this.userRolesHeader,
            this.searchUserRolesTextBox.first(),
            this.createRuleButton
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocatorsOnSecurityPreferences.map(locator =>
            expect(locator).toBeVisible({ timeout: 25000 })
        ));
    }

    async accessibilitySettingsValidation() {
        await this.settingsMenu.click();
        await this.getMenuItem('Accessibility').click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle("Accessibility | Guaranty Bank");
        const pageUrl = this.page.url();
        await expect(pageUrl).toContain('/settings/accessibility');
        const visibleLocatorsOnSecurityPreferences = [
            this.accessibilitySettingsHeader,
            this.accessibilitySettingsSubHeader,
            this.enableHighContrastModeLabel
        ];
        // Concurrently check visibility for all general UI elements
        await Promise.all(visibleLocatorsOnSecurityPreferences.map(locator =>
            expect(locator).toBeVisible({ timeout: 25000 })
        ));
        await this.enableHighContrastModeCheckBox.click();
        await this.page.waitForTimeout(3000);
        await this.enableHighContrastModeCheckBox.click();
    }
}
