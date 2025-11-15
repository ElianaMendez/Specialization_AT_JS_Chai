Feature: Cart Management on Practice Software Testing
  As a customer
  I want to add products to my cart on https://practicesoftwaretesting.com/
  So that I can review and purchase them later

  @smoke
  Scenario: User adds a product to the cart
    Given the user is on the Practice Software Testing home page
    When the user clicks on a product title or image
    And clicks on the "Add to cart" button
    Then the system should display a message Product added to shopping cart
    And the cart icon should show an updated item count