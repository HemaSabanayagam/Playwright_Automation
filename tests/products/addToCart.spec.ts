import { test } from "@playwright/test"
import { POManager } from "../../pages/POManager"
import { dataset } from "../../utils/fileReader";

for(const data of dataset)
{
test('@products @cart @smoke Add to Cart test', async ({ page }) => 
{

    const poManager=new POManager(page);
    //Login to site
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);

    const addProduct=poManager.getAddItem();

    // add items to the cart
    await addProduct.addItem(data.productName);

    //verify order is add to cart
    await addProduct.verifyCart();

    //take screenshot after added product to cart
    await addProduct.takeScreenshot("Add-to-cart");
})};