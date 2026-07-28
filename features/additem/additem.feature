Feature: Product page

@regression @functional
Scenario: Sort item
   When user login to SauceDemo application with "<username>" and "<password>"
    And  user select sort option
    Then user is able to see the sorted items

    Examples:
        | username       | password      |
        | standard_user  | secret_sauce  |

@smoke @sanity @positive
Scenario: Add item
   When user login to SauceDemo application with "<username>" and "<password>"
    And user adds "<productName>" to cart
    And user navigates to the cart
    Then user is able to see the item in cart

    Examples:
        | username       | password      | productName              |
        | standard_user  | secret_sauce  | Sauce Labs Bolt T-Shirt  |

@regression @functional @negative
Scenario: Remove item
   When user login to SauceDemo application with "<username>" and "<password>"
    And user adds "<productName>" to cart
    And user navigates to the cart
    And user remove "<remove_productName>" from cart
    Then user should be see the empty cart

     Examples:
        | username       | password      | productName              | remove_productName      |
        | standard_user  | secret_sauce  | Sauce Labs Bolt T-Shirt  | Sauce Labs Bolt T-Shirt |

