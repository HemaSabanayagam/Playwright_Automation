Feature: Placing an order

@smoke @sanity @positive
Scenario: Enter valid shipping details
    When user login to SauceDemo application with "<username>" and "<password>"
    And user adds "<productName>" to cart
    And user navigates to the cart
    And user proceed to checkout
    And user enters shipping details "<firstname>", "<lastname>" and "<zipcode>"
    Then user verifies the order summary
  
    Examples:
        | username       | password      | productName              | firstname | lastname | zipcode |
        | standard_user  | secret_sauce  | Sauce Labs Bolt T-Shirt  | Sri       | Leka     | 654321  |

@regression @functional @negative
Scenario: Enter Invalid shipping details
    When user login to SauceDemo application with "<username>" and "<password>"
    And user adds "<productName>" to cart
    And user navigates to the cart
    And user proceed to checkout
    And user enters invalid shipping details "<Invalid_firstname>", "<Invalid_lastname>" and "<Invalid_zipcode>"
    Then user able to see the error message

    Examples:
        | username       | password      | productName              | Invalid_firstname | Invalid_lastname | Invalid_zipcode |
        | standard_user  | secret_sauce  | Sauce Labs Bolt T-Shirt  | Sri               | Leka             |                 |