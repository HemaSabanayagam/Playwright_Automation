import { test, expect } from "@playwright/test"
import { POManager } from "../../pages/POManager"
import { dataset } from "../../utils/fileReader";

for(const data of dataset)
{
test('@login @smoke Valid Login Test',async({page})=>
{
    const poManager=new POManager(page);
    //Login to site
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);

    //verify next page 
    expect(page).toHaveTitle("Swag Labs");

    //take screenshot after login
    await loginPage.takeScreenshot("Valid-login");
})};