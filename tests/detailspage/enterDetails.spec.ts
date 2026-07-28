import { test, expect } from "@playwright/test"
import { POManager } from "../../pages/POManager"
import { dataset } from "../../utils/fileReader";

for(const data of dataset)
{
test('@detailspage @smoke Enter Details test', async ({ page }) => 
{

    const poManager=new POManager(page);
    //Login to site
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);

    const addProduct=poManager.getAddItem();

    // add items to the cart
    await addProduct.addItem(data.productName);

    //go to cart
    await addProduct.goToCart();

    //select checkout
    await addProduct.checkOut();

    const orderItem=poManager.getPlaceOrder();
    //enter correct details
    await orderItem.updateDetails(data.firstname,data.lastname,data.zipcode);

    //take screenshot after enter Valid details
    await orderItem.takeScreenshot("Valid-details");
});

test('@detailspage @negative Details not filled', async ({ page }) => 
{

    const poManager=new POManager(page);
    //Login to site
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);

    const addProduct=poManager.getAddItem();

    // add items to the cart
    await addProduct.addItem(data.productName);

    //go to cart
    await addProduct.goToCart();

    //select checkout
    await addProduct.checkOut();

    const orderItem=poManager.getPlaceOrder();
    //enter invalid details
    await orderItem.missingDetails(data.Invalid_firstname,data.Invalid_lastname,data.Invalid_zipcode);
    
    //verify error message
    await expect(orderItem.errormessage).toContainText("Error");

    //take screenshot after enter invalid details
    await orderItem.takeScreenshot("Invalid-details");

})};