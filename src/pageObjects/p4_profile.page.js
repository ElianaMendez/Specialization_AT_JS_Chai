class ProfilePage {
    get inputFirstName() { return $('#first_name') }
    get inputLastName() { return $('#last_name') }
    get inputPhone() { return $('#phone') }
    get inputEmail() { return $('#email') }
    get inputStreet() { return $('#street') }
    get inputPostalCode() { return $('#postal_code') }
    get inputCity() { return $('#city') }
    get inputState() { return $('#state') }
    get inputCountry() { return $('#country') }
    get btnUpdateProfile() { return $('button[type="submit"]') }
    get alertProfileUpdated() { return $('//div//*[contains(@class, "alert-success")]') }


    async updateProfileData() {
        await this.inputFirstName.setValue('Eliana');
        await this.btnProfile.click();
    }

    async waitForProfilePageLoad() {
        // Wait for the DOM to be fully loaded
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 10000,
                timeoutMsg: 'The Profile page did not finish loading on time.'
            }
        );

        // Wait for the Update Profile button to be visible
        const updateProfileButton = await $('button[type="submit"]');
        await updateProfileButton.waitForDisplayed({
            timeout: 8000,
            timeoutMsg: 'The Update Profile button did not appear on the Profile page on time.'
        });
    }

    async waitFieldsNonEmpty() {
        try {
            await this.inputFirstName.waitForDisplayed({
                timeout: 8000
            });
            await browser.waitUntil(
                async () => {
                    const value = await this.inputFirstName.getValue();
                    return value !== '';
                },
                {
                    timeout: 10000
                }
            );
        } catch { }
    }

    async waitUpdateProfileClickable() {
        await this.btnUpdateProfile.waitForClickable({ timeout: 5000 });
    }

    async waitUpdatedMessage() {
        await this.alertProfileUpdated.waitForDisplayed({ timeout: 10000 });
    }
}

export default new ProfilePage();
