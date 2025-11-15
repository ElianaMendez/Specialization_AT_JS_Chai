class ProductDetailsPage {
    get productName() { return $('h1[data-test="product-name"]') }
    get productPrice() { return $('span[aria-label="unit-price"]') }
    get productDescription() { return $('#description') }
    get btnAddtoCart() { return $('#btn-add-to-cart') }
    get alerProductAdded() { return $('//div[@role="alert"]') }
    get cartIcon() { return $('//*[@data-test="cart-quantity"]') }

    async waitForProductDetailsPageLoad() {
        // Wait for the DOM to be fully loaded
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 10000,
                timeoutMsg: 'The Product Details page did not finish loading on time.'
            }
        );

        // Wait for the user menu item to be visible
        const userMenu = await $('#btn-add-to-cart');
        await userMenu.waitForDisplayed({
            timeout: 8000,
            timeoutMsg: 'The Add to Cart button did not appear on the Product Details page on time.'
        });
    }

    async waitForAddedProductMessage() {
        await this.alerProductAdded.waitForDisplayed({ timeout: 10000 });
    }

    async waitForCartIconAppears() {
        await this.cartIcon.waitForDisplayed({ timeout: 10000 });
    }

    async getItemCount() {
        return await this.cartIcon.getText();
    }

}

export default new ProductDetailsPage();