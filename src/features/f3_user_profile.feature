Feature: Manage User Profile on Practice Software Testing
    As a logged-in user
    I want to update my account details on https://practicesoftwaretesting.com/
    So that my personal information remains accurate

    Background:
        Given the user is on the login page of the Practice Software Testing site
        And a newly registered user exists with unique valid credentials
        When the user enters a valid email address and password
        And clicks on the "Login" button

    @smoke
    Scenario: User updates profile information successfully
        Given the user is on the "Profile" section
        And the user updates a field that is different from "Email address"
        When the user clicks on the Update Profile button
        Then the system should display the message Your profile is successfully updated

    @smoke
    Scenario: User can not update the Email field
        Given the user is on the "Profile" section
        And the user clicks to "Email address" field
        Then the "Email address" is non-editable field
