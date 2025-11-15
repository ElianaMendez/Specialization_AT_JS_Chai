import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import * as chai from 'chai';
import LoginPage from '../pageObjects/p2_login.page.js';
import MyAccountPage from '../pageObjects/p3_myAccount.page.js';
import DataGenerator from '../utils/DataGenerator.js';

chai.should();

Given('the user is on the login page of the Practice Software Testing site', async () => {
    await LoginPage.openLoginPage();
});

Given('a newly registered user exists with unique valid credentials', async function () {
    const generatedData = await DataGenerator.generateUniqueUserData();
    // POST API
    const response = await LoginPage.registerNewUser(generatedData);
    response.status.should.equal(201);
    this.userData = generatedData;
});

When('the user enters a valid email address and password', async function () {
    await LoginPage.login(this.userData.email, this.userData.password);
});

When('clicks on the "Login" button', async () => {
    await LoginPage.submitLogin();
});

Then('the user should be redirected to the "My account" page', async () => {
    await MyAccountPage.waitForAccountPageLoad();
    const currentUrl = await browser.getUrl();
    currentUrl.should.include('/account');
});

Then("the user's name should be displayed in the header", async function () {
    const expectedName = this.userData.firstName + ' ' + this.userData.lastName;
    const userNameElementText = await MyAccountPage.getUserNamefromMenu();
    userNameElementText.should.include(expectedName);
});

// Invalid Login
When('the user enters an invalid email address or password', async () => {
    const invalidData = await DataGenerator.generateInvalidDataToTest();
    await LoginPage.login(invalidData.email, invalidData.password);
});

Then('the system should display an error message "Invalid email or password"', async () => {
    await LoginPage.waitErrorMessageInvalidData();
    const errorText = await LoginPage.alertErrorInvalidData.getText();
    errorText.should.equal('Invalid email or password');
});
