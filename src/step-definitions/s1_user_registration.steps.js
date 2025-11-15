import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import { assert } from 'chai';
import HomePage from '../pageObjects/p0_home.page.js';
import LoginPage from '../pageObjects/p2_login.page.js';
import RegisterPage from '../pageObjects/p1_register.page.js';
import DataGenerator from '../utils/DataGenerator.js';

Given('the user is on the Practice Software Testing home page', async () => {
    await HomePage.openHomePage();
});

Given('the Sign in button is visible on the header', async () => {
    await HomePage.waitForHomePageLoad();
    const isDisplayed = await HomePage.signInLink.isDisplayed();
    assert.isTrue(isDisplayed, 'Sign in button should be visible on the header');
});

When('the user clicks on the {string} button', async (buttonText) => {
    await HomePage.clickSingIn();
});

When('clicks on the "Register your account" link', async () => {
    await LoginPage.openCustomerRegistration();
});

When('fills in all required fields in the registration form with valid data', async () => {
    const userData = await DataGenerator.generateUniqueUserData();
    await RegisterPage.fillRegistrationForm(userData);
});

When('clicks on the "Register" button', async () => {
    await RegisterPage.submit();
    await LoginPage.loginTitle.waitForDisplayed({
        timeout: 10000,
        timeoutMsg: 'Expected redirect to login page after registration'
    });
});

Then('the user should be redirected to the login page', async () => {
    const currentUrl = await browser.getUrl();
    assert.include(currentUrl, 'auth/login', 'URL should contain auth/login after registration');
});

Then('the login form should be visible', async () => {
    const isDisplayed = await LoginPage.loginTitle.isDisplayed();
    assert.isTrue(isDisplayed, 'Login form title should be visible');
});