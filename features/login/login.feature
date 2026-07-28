Feature: Login Validation

@smoke @sanity @positive @critical
Scenario Outline: Login with Valid credentials
   When user login to SauceDemo application with "<username>" and "<password>"
   Then user should be navigates to the swag labs homepage

   Examples:
       | username       | password      |
       | standard_user  | secret_sauce  |

@regression @functional @negative
 Scenario Outline: Login with Invalid credentials
    When user login to SauceDemo application with "<invalidUsername>" and "<invalidPassword>"
    Then user is able to see the error message
    Examples:
        | username       | password          |
        | Invalid_user   | Invalid_password  |
       