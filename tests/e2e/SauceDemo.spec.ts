import { test, expect } from "@playwright/test"
import { POManager } from "../../pages/POManager"

import { dataset } from "../../utils/fileReader";

for(const data of dataset)
{
test('@e2e Complete website test', async ({ page }) => 
{

    const poManager=new POManager(page);
    //Login to site
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);

    const addProduct=poManager.getAddItem();
    //sort Item
    await addProduct.sortItem();

    // add items to the cart
    await addProduct.addItem(data.productName);

    //go to cart
    await addProduct.goToCart();

    //select checkout
    await addProduct.checkOut();

    //Enter details
    const orderItem=poManager.getPlaceOrder();
    await orderItem.updateDetails(data.firstname,data.lastname,data.zipcode);

    //verify product details
    await orderItem.verifyOrder();

    //place order
    await orderItem.placeOrder();

    //Order confirmation
    await orderItem.orderConfirmation();

    //visual testing
    //test the confirmation after order placed
    await orderItem.verifyVisual_OrderConfirmation();
})};
