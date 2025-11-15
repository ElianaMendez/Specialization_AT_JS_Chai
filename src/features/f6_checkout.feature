Feature: Checkout on Practice Software Testing
    As a customer
    I want to complete a purchase on https://practicesoftwaretesting.com/
    So that I can successfully order items using different payment methods

    Background: Logged-in user adds items to cart
        Given User opens a new browser tab
        And the user is on the login page of the Practice Software Testing site
        And a newly registered user exists with unique valid credentials
        When the user enters a valid email address and password
        And clicks on the "Login" button
        Then the user should be redirected to the "My account" page
        And the user's name should be displayed in the header
        Given the user go to the home page
        When the user clicks on a product title or image
        And clicks on the "Add to cart" button
        Then the system should display a message Product added to shopping cart

    @checkout @smoke
    Scenario Outline: User completes checkout with <paymentMethod> payment
        Given the user opens the cart to proceed the checkout
        And the user clicks on the Proceed to Checkout button
        And the user clicks on the second Proceed to Checkout button
        And the user fills the Billing address
        And the user clicks on the third Proceed to Checkout button
        When selects "<paymentMethod>" as the payment method
        And provides the required information for "<paymentMethod>"
        And confirms the purchase
        Then the system should display the message "Payment was successful"

        Examples:
            | paymentMethod     |
            | Bank Transfer     |
            | Cash on Delivery  |
            | Credit Card       |
            | Buy Now Pay Later |
            | Gift Card         |
