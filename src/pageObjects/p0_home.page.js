class HomePage {
    get signInLink() { return $('[data-test="nav-sign-in"]') }
    get homeProduct() { return $('img.card-img-top') }

    async openHomePage() {
        await browser.url('https://practicesoftwaretesting.com/');
    }

    async clickSingIn() {        
        await this.signInLink.waitForClickable({ timeout: 5000 });
        await this.signInLink.click();
    }

    async waitForHomePageLoad() {
        // Wait for the DOM to be fully loaded
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 10000,
                timeoutMsg: 'The Home page did not finish loading on time'
            }
        );

        // Wait for the user menu item to be visible
        const userMenu = await $('img.card-img-top');
        await userMenu.waitForDisplayed({
            timeout: 8000,
            timeoutMsg: 'The product did not appear on the homepage on time.'
        });
    }

    async getUserNamefromMenu() {
        return await $('[data-test="nav-menu"]').getText();
    }


}

export default new HomePage();

