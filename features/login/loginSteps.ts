import { When, Then } from "@cucumber/cucumber";
const { expect } = require("@playwright/test");
import { CustomWorld } from "../hooks/hooks";

When('user login to SauceDemo application with {string} and {string}', async function (this: CustomWorld, username: string, password: string) {
  //Login to site
  await this.loginPage.goTo();
  await this.loginPage.validLogin(username, password);
});

Then('user should be navigates to the swag labs homepage', async function (this: CustomWorld) {
  //verify next page 
  await expect(this.page).toHaveTitle("Swag Labs");
});

Then('user is able to see the error message', async function (this: CustomWorld) {
  //verify error message
  await expect(this.loginPage.errormessage).toContainText("Username and password do not match");
});