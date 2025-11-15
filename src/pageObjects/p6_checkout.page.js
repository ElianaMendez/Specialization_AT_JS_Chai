class Checkout {
    get btnProceedToCheckout() { return $('button[class="btn btn-success"]') }
    get messagetoProceedToCheckout() { return $('//p[@class="ng-star-inserted"]') }
    get inputStreetCheckout() { return $('#street') }
    get inputCityCheckout() { return $('#city') }
    get inputStateCheckout() { return $('#state') }
    get inputCountryCheckout() { return $('#country') }
    get inputPostalCodeCheckout() { return $('#postal_code') }
    get paymentMethodfield() { return $('#payment-method') }
    get paymentSuccessfulMessage() { return $('div[data-test="payment-success-message"]') }
    get btnProceedToCheckout2() { return $('//button[@data-test="proceed-2"]') }
    get btnProceedToCheckout3() { return $('//button[@data-test="proceed-3"]') }


    async waitForCheckoutPageLoad() {
        // Wait for the DOM to be fully loaded
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 10000,
                timeoutMsg: 'The Checkout Details page did not finish loading on time.'
            }
        );

        // Wait for the user menu item to be visible
        const userMenu = await $('button[class="btn btn-success"]');
        await userMenu.waitForDisplayed({
            timeout: 8000,
            timeoutMsg: 'The Proceed to Checkout button did not appear on the Checkout page on time.'
        });
    }

    async fillBillingAddress() {
        await this.inputStreetCheckout.setValue('Calle 30');
        await this.inputCityCheckout.setValue('Fantastica');
        await this.inputStateCheckout.setValue('Heroico');
        await this.inputCountryCheckout.setValue('CO');
        await this.inputPostalCodeCheckout.setValue('130150');
    }

    async selectPaymentMethod(paymentMethod) {
        await this.paymentMethodfield.waitForDisplayed();
        await this.paymentMethodfield.selectByVisibleText(paymentMethod);
    }

    async providePaymentInformation(paymentMethod) {
        switch (paymentMethod) {
            case 'Bank Transfer':
                await $('#bank_name').setValue('Banco XYZ');
                await $('#account_name').setValue('Mi cuenta');
                await $('#account_number').setValue('125478963566961');
                break;
            case 'Credit Card':
                await $('#credit_card_number').setValue('4690-8765-2345-8976');
                await $('#expiration_date').setValue('07/2032');
                await $('#cvv').setValue('254');
                await $('#card_holder_name').setValue('ElianaM');
                break;
            case 'Buy Now Pay Later':
                await $('#monthly_installments').selectByVisibleText('3 Monthly Installments');
                break;
            case 'Gift Card':
                await $('#gift_card_number').setValue('32145448633245');
                await $('#validation_code').setValue('1232');
                break;
            case 'Cash on Delivery':
                // No input required
                break;
            default:
                throw new Error(`Unsupported payment method: ${paymentMethod}`);
        }
    }

    async confirmPurchase() {
        await $('button[data-test="finish"]').click();
    }

    async waitForMessageToProceedToCheckout() {
        await this.messagetoProceedToCheckout.waitForDisplayed({ timeout: 10000 });
    }
}

export default new Checkout();

