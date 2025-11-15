// MyAccountPage.js
class MyAccountPage {
    get btnProfile() { return $('a[routerlink="profile"]') }
    get iconHomePage() { return $('a[class="nav-link active"]') }

    async openProfilePage() {
        await this.btnProfile.waitForClickable({ timeout: 10000 });
        await this.btnProfile.click();
    }

    async waitForAccountPageLoad() {
        let url = await browser.getUrl();
        while (!url.includes('account')) {
            url = await browser.getUrl();
        }
        // Wait for the DOM to be fully loaded
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 50000,
                timeoutMsg: 'The My Account page did not finish loading on time.'
            }
        );

        // Wait for the user menu item to be visible
        const userMenu = await $('[data-test="nav-menu"]');
        try {
            await userMenu.waitForDisplayed({
                timeout: 50000,
                timeoutMsg: 'The user menu did not appear on the My Account page on time.'
            });
        } catch (error) {
            console.warn('User menu not displayed within timeout, continuing anyway:', error.message);
        }
    }

    async getUserNamefromMenu() {
        let name = "";
        while (name == "") {
            name = await $('[data-test="nav-menu"]').getText();
            if (name != "") {
                break;
            }
            else {
                name = await $('[data-test="nav-menu"]').getHTML(false);;
                return name;
            }
        }
        return name;
    }

    async goToTheHomePage() {
        try {
            await this.iconHomePage.waitForClickable({ timeout: 10000 });
            await this.iconHomePage.click();
        } catch {
            await $('a[class="navbar-brand"]').click();
        }

    }
}

export default new MyAccountPage();

