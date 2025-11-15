import { When, Then } from '@wdio/cucumber-framework';
import * as chai from 'chai';
import ProductDetailsPage from '../pageObjects/p5_product_details.page.js';

chai.should();

When('clicks on the "Add to cart" button', async () => {
    await ProductDetailsPage.waitForProductDetailsPageLoad();
    await ProductDetailsPage.btnAddtoCart.click();
});

Then('the system should display a message Product added to shopping cart', async () => {
    await ProductDetailsPage.waitForAddedProductMessage();
    const productAlertMessage = await ProductDetailsPage.alerProductAdded.getText();
    productAlertMessage.should.include("Product added to shopping cart.");
    await ProductDetailsPage.alerProductAdded.waitForExist({ reverse: true, timeout: 10000 });
});

Then('the cart icon should show an updated item count', async () => {
    await ProductDetailsPage.waitForCartIconAppears();
    const cartIconText = await ProductDetailsPage.getItemCount();
    cartIconText.should.include('1');
});

