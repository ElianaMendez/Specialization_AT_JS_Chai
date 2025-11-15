Feature: Product Details on Practice Software Testing
    As a customer
    I want to view detailed product information on https://practicesoftwaretesting.com/
    So that I can make informed purchase decisions

    @smoke
    Scenario: User views details of a selected product
        Given the user is on the Practice Software Testing home page
        When the user clicks on a product title or image
        Then the system should display the product details page
        And the page should show the product name, price, and description

