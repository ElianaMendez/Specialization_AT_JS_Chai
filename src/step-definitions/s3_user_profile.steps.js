import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import * as chai from 'chai';
const { expect: chaiExpect } = chai;
import MyAccountPage from '../pageObjects/p3_myAccount.page.js';
import ProfilePage from '../pageObjects/p4_profile.page.js';

Given('the user is on the "Profile" section', async () => {
    await MyAccountPage.waitForAccountPageLoad();
    await MyAccountPage.openProfilePage();
    await ProfilePage.waitForProfilePageLoad();
    const currentUrl = await browser.getUrl();
    chaiExpect(currentUrl).to.include('/account/profile');
});

Given('the user updates a field that is different from "Email address"', async () => {
    await ProfilePage.waitFieldsNonEmpty();
    await ProfilePage.inputFirstName.setValue('New name');
});

When('the user clicks on the Update Profile button', async () => {
    await ProfilePage.waitUpdateProfileClickable();
    await ProfilePage.btnUpdateProfile.click();
});

Then('the system should display the message Your profile is successfully updated', async () => {
    await ProfilePage.waitUpdatedMessage();
    const updateMessage = await ProfilePage.alertProfileUpdated.getText();
    chaiExpect(updateMessage).to.include('Your profile is successfully updated!');
});

// User can not edit the "Email address" field
Given('the user clicks to "Email address" field', async () => {
    await ProfilePage.waitForProfilePageLoad();
    await ProfilePage.inputEmail.click();
});

Then('the "Email address" is non-editable field', async () => {
    const emailField = await ProfilePage.inputEmail;
    const isReadonly = await emailField.getAttribute('readonly');
    const isDisabled = await emailField.getAttribute('disabled');

    const isNonEditable = isReadonly !== null || isDisabled !== null;
    chaiExpect(isNonEditable).to.be.true;
});
