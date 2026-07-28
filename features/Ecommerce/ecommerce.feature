Feature: SauceDemo e2e validation

 @e2e @regression @critical
Scenario Outline: Placing an order
    When user login to SauceDemo application with "<username>" and "<password>"
    And user adds "<productName>" to cart
    And user navigates to the cart
    And user proceed to checkout
    And user enters shipping details "<firstname>", "<lastname>" and "<zipcode>"
    Then user verifies the order summary
    When user places the order
    Then user is able to see the order confirmation

    Examples:
        | username       | password      | productName              | firstname | lastname | zipcode |
        | standard_user  | secret_sauce  | Sauce Labs Bolt T-Shirt  | Sri       | Leka     | 654321  |