import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../hooks/hooks";

When('user places the order', async function (this: CustomWorld) {
  //place order
  await this.orderItem.placeOrder();
});

Then('user is able to see the order confirmation', async function (this: CustomWorld) {
  //Order confirmation
  await this.orderItem.orderConfirmation();
});