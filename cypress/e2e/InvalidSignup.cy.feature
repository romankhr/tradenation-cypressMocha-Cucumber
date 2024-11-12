Feature: Login Test

    Scenario: Verify errors for invalid format of Email address and Password format
        Given I open the Login page
        When I Accept all cookies
        And I type "Test" in Email input field of the Login page
        Then I verify error message "Wrong email format" on the Login page

        And I type "Test@google.com" in Email input field of the Login page
        Then I verify error message "Wrong email format" is Not displayed on the Login page

        And I type "test" in Password input field of the Login page
        Then I verify error message "Must have at least 8 characters" on the Login page
        Then I verify error message "Must contain upper and lower case characters" on the Login page
        Then I verify error message "Must contain a number and a symbol (!@#$%^&*)" on the Login page
        
        And I type "Test" in Password input field of the Login page
        Then I verify error message "Must have at least 8 characters" on the Login page
        Then I verify error message "Must contain upper and lower case characters" is Not displayed on the Login page
        Then I verify error message "Must contain a number and a symbol (!@#$%^&*)" on the Login page
                
        And I type "TestTestTest" in Password input field of the Login page
        Then I verify error message "Must have at least 8 characters" is Not displayed on the Login page
        Then I verify error message "Must contain upper and lower case characters" is Not displayed on the Login page
        Then I verify error message "Must contain a number and a symbol (!@#$%^&*)" on the Login page
                
        And I type "TestTestTest1!" in Password input field of the Login page
        Then I verify error message "Must have at least 8 characters" is Not displayed on the Login page
        Then I verify error message "Must contain upper and lower case characters" is Not displayed on the Login page
        Then I verify error message "Must contain a number and a symbol (!@#$%^&*)" is Not displayed on the Login page