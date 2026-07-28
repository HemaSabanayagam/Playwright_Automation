import { test } from "@playwright/test"
import { POManager } from "../../pages/POManager"
import { dataset } from "../../utils/fileReader";

for(const data of dataset)
{
test('@products @regression Add to Cart test', async ({ page }) => 
{

    const poManager=new POManager(page);
    //Login to site
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);

    const addProduct=poManager.getAddItem();
    //sort Item
    await addProduct.sortItem();

    //Verify sort
    await addProduct.verifySort();

    //take screenshot after sort the items
    await addProduct.takeScreenshot("Sort-Items");

})};