Feature: User Login on Practice Software Testing
  As a registered user
  I want to log in to https://practicesoftwaretesting.com/
  So that I can access my account

  @validLogin @smoke
  Scenario: User logs in successfully with valid credentials
    Given the user is on the login page of the Practice Software Testing site
    And a newly registered user exists with unique valid credentials
    When the user enters a valid email address and password
    And clicks on the "Login" button
    Then the user should be redirected to the "My account" page
    And the user's name should be displayed in the header

  @invalidLogin @smoke
  Scenario: User enters invalid credentials
    Given the user is on the login page of the Practice Software Testing site
    When the user enters an invalid email address or password
    And clicks on the "Login" button
    Then the system should display an error message "Invalid email or password"
