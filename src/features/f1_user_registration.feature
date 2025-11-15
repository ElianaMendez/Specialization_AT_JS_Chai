Feature: User Registration on Practice Software Testing
  As a new visitor
  I want to create an account on https://practicesoftwaretesting.com/
  So that I can log in and make purchases

  @smoke
  Scenario: User successfully signs up with valid details
    Given the user is on the Practice Software Testing home page
    And the Sign in button is visible on the header
    When the user clicks on the "Sign in" button
    And clicks on the "Register your account" link
    And fills in all required fields in the registration form with valid data
    And clicks on the "Register" button
    Then the user should be redirected to the login page
    And the login form should be visible