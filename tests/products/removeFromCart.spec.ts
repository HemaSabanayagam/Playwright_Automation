import { test } from "@playwright/test"
import { POManager } from "../../pages/POManager"
import { dataset } from "../../utils/fileReader";

for(const data of dataset)
{
test('@products @cart @regression Add to Cart test', async ({ page }) => 
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
    
    //remove product
    await addProduct.removeItem(data.remove_productName);

    //verify cart is empty
    await addProduct.verifyEmptyCart();

    //take screenshot after removed product and cart is empty
    await addProduct.takeScreenshot("Removed-product");
})};