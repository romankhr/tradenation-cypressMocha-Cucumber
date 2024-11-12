import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import mainPage from '../Pages/MainPage';

Given('I open the TradeNation test page', () => {
    cy.visit('https://tradenation.com/en-gb/markets/#forex');
  });

When('I click on a Logo', () => {
  mainPage.clickLogo();
});

Then('I verify the {string} title of the page', (title) => {
  mainPage.verifyPageTitle(title);
});

Then('I verify the URL of the page has {string}', (URL) => {
  mainPage.verifyPageUrl(URL);
});