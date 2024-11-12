import { Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../Pages/LoginPage';

Given('I open the Login page', () => {
    cy.visit('https://tradenation.com/signup/welcome ');
  });

When('I Accept all cookies', () => {
    LoginPage.clickAcceptCookiesButton();
});

When('I type {string} in Email input field of the Login page', (email) => {
    LoginPage.typeEmail(email);
});

When('I type {string} in Password input field of the Login page', (email) => {
    LoginPage.typePassword(email);
});

Then('I verify error message {string} on the Login page', (errorMessage) => {
    LoginPage.verifyEmailErrorMessage(errorMessage);
});

Then('I verify error message {string} is Not displayed on the Login page', (errorMessage) => {
    LoginPage.isErrorMessageNotDisplayed(errorMessage);
});