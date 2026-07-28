import { When, Then } from "@cucumber/cucumber";
const { expect } = require("@playwright/test");
import { CustomWorld } from "../hooks/hooks";

When('user proceed to checkout', async function (this: CustomWorld) {
  //select checkout
  await this.addProduct.checkOut();
});

When('user enters shipping details {string}, {string} and {string}', async function (this: CustomWorld, firstname: string, lastname: string, zipcode: string) {
  //enter correct details
  await this.orderItem.updateDetails(firstname, lastname, zipcode);
});

Then('user verifies the order summary', async function (this: CustomWorld) {
  await this.orderItem.verifyOrder();
});

When('user enters invalid shipping details {string}, {string} and {string}', async function (this: CustomWorld, Invalid_firstname: string, Invalid_lastname: string, Invalid_zipcode: string) {
  //enter correct details
  await this.orderItem.updateDetails(Invalid_firstname, Invalid_lastname, Invalid_zipcode);
});

Then('user able to see the error message', async function (this: CustomWorld) {
  //verify error message
  await expect(this.orderItem.errormessage).toContainText("Error");
});