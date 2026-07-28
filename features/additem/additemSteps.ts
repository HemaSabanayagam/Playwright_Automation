import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../hooks/hooks";

When('user select sort option', async function (this: CustomWorld) {
  this.addProduct = this.poManager.getAddItem();
  //sort Item
  await this.addProduct.sortItem();
});

Then('user is able to see the sorted items', async function (this: CustomWorld) {
  //Verify sort
  await this.addProduct.verifySort();
});

When('user adds {string} to cart', async function (this: CustomWorld, productName: string) {
  this.addProduct = this.poManager.getAddItem();
  // add items to the cart
  await this.addProduct.addItem(productName);
});


When('user navigates to the cart', async function (this: CustomWorld) {
  //go to cart
  await this.addProduct.goToCart();
});

Then('user is able to see the item in cart', async function (this: CustomWorld) {
  await this.addProduct.verifyCart();
});

When('user remove {string} from cart', async function (this: CustomWorld, remove_productName: string) {
  //remove product
  await this.addProduct.removeItem(remove_productName);
});

Then('user should be see the empty cart', async function (this: CustomWorld) {
  //verify cart is empty
  await this.addProduct.verifyEmptyCart();
});