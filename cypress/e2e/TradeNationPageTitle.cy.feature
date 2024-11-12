Feature: Redirect Feature

  Scenario: User should redirect to the correct page after clicking the logo
    Given I open the TradeNation test page
    When I click on a Logo
    Then I verify the "Popular Markets to Trade With Us — Trade Nation" title of the page
    Then I verify the URL of the page has "/en-gb/"