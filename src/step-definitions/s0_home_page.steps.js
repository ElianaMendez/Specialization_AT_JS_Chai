import { When, Then } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import * as chai from 'chai';
const { expect: chaiExpect } = chai;
import Homepage from '../pageObjects/p0_home.page.js';
import ProductDetailsPage from '../pageObjects/p5_product_details.page.js';

When('the user clicks on a product title or image', async () => {
    await Homepage.waitForHomePageLoad();
    await Homepage.homeProduct.click();
});

Then('the system should display the product details page', async () => {
    const currentUrl = await browser.getUrl();
    chaiExpect(currentUrl).to.include('/product/');
});

Then('the page should show the product name, price, and description', async () => {
    await ProductDetailsPage.waitForProductDetailsPageLoad();
    const nameDisplayed = await ProductDetailsPage.productName.isDisplayed();
    const priceDisplayed = await ProductDetailsPage.productPrice.isDisplayed();
    const descDisplayed = await ProductDetailsPage.productDescription.isDisplayed();

    chaiExpect(nameDisplayed).to.be.true;
    chaiExpect(priceDisplayed).to.be.true;
    chaiExpect(descDisplayed).to.be.true;
});

Then('the product name element should be visible', async () => {
    const nameVisible = await ProductDetailsPage.productName.isDisplayed();
    chaiExpect(nameVisible).to.be.true;
});



