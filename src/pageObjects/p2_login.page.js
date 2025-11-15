import axios from 'axios';

class LoginPage {
  get loginTitle() { return $('//h3[text()="Login"]') }
  get inputEmail() { return $('#email'); }
  get inputPassword() { return $('#password'); }
  get btnLogin() { return $('input.btnSubmit'); }
  get btnRegisterAccount() { return $('[data-test="register-link"]'); }
  get alertErrorInvalidData() { return $('div.help-block') }

  async openLoginPage() {
    await browser.url('auth/login');
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async submitLogin() {
    await this.btnLogin.click();
  }

  async openCustomerRegistration() {
    await this.btnRegisterAccount.waitForClickable({ timeout: 10000 });
    await this.btnRegisterAccount.click();
  }

  async waitErrorMessageInvalidData() {
    await this.alertErrorInvalidData.waitForDisplayed({ timeout: 3000 });
  }

  async registerNewUser(userData) {
    const url = `https://api.practicesoftwaretesting.com/users/register`;
    const postData = {
      "first_name": userData.firstName,
      "last_name": userData.lastName,
      "dob": userData.dateOfBirth,
      "phone": userData.phone,
      "email": userData.email,
      "password": userData.password,
      "address": {
        "street": userData.street,
        "city": userData.city,
        "state": userData.state,
        "country": 'CO',
        "postal_code": userData.postalCode
      }
    };
    //POST
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    console.log(`Sending POST request to: ${url}`);
    console.log('Payload:', postData);

    try {
      //POST request execution
      const response = await axios.post(url, postData, config);

      //Successful response handling (2xx code)
      console.log(`Response Status: ${response.status}`);
      console.log('Response Data:', response.data);

      //We return the complete response object
      return response;

    } catch (error) {
      //Error handling
      if (error.response) {
        console.error(`Error: Server responded with status ${error.response.status}`);
        console.error('Error Data:', error.response.data);
        return error.response;
      } else if (error.request) {
        //Network error timeout,etc)
        console.error('Error: No response received from server.');
      } else {
        console.error('Error:', error.message);
      }
      throw error;
    }
  }
}

export default new LoginPage();
