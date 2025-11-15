class RegisterPage {
  get inputFirstName() { return $('#first_name'); }
  get inputLastName() { return $('#last_name'); }
  get inputDateofBirth() { return $('#dob'); }
  get inputStreet() { return $('input[id="street"]'); }
  get inputPostalCode() { return $('#postal_code') }
  get inputCity() { return $('input[id="city"]'); }
  get inputState() { return $('input[id="state"]'); }
  get selectCountry() { return $('#country'); }
  get inputPhone() { return $('#phone'); }
  get inputEmail() { return $('#email'); }
  get inputPassword() { return $('#password'); }
  get btnRegister() { return $('//button[@class="btnSubmit mb-3"]'); }

  async fillRegistrationForm({
    firstName, lastName, dateOfBirth, street, postalCode, city, state,
    country, phone, email, password
  }) {
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputDateofBirth.setValue(dateOfBirth);
    await this.inputStreet.setValue(street);
    await this.inputPostalCode.setValue(postalCode);
    await this.inputCity.setValue(city);
    await this.inputState.setValue(state);

    //dropdown Country
    await this.selectCountry.waitForDisplayed();
    await this.selectCountry.selectByVisibleText(country);

    await this.inputPhone.setValue(phone);
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async submit() {
    await this.btnRegister.waitForClickable({ timeout: 5000 });
    await this.btnRegister.click();

  }
}

export default new RegisterPage();
