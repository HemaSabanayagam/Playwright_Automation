import { test, expect } from "@playwright/test"
import { POManager } from "../../pages/POManager"
import { dataset } from "../../utils/fileReader";

for(const data of dataset)
{
test('@login @negative Login page test for Invalid',async({page})=>
{
    const poManager=new POManager(page);
    //login using invalid credentials
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.InvalidLogin(data.invalidUsername,data.invalidPassword);

    //verify error message
    await expect(loginPage.errormessage).toContainText("Username and password do not match");

    //take screenshot after Invalid login
    await loginPage.takeScreenshot("Invalid-login");
})};