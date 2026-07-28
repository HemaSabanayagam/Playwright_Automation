import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BASE_URL } from "../utils/env";

export class LoginPage extends BasePage {

  userName: Locator;
  passWord: Locator;
  submit: Locator;
  errormessage: Locator;
  page: Page;

  constructor(page: Page) {
    super(page, "login-page");
    this.page = page;
    this.userName = page.locator("#user-name");
    this.passWord = page.getByPlaceholder("Password");
    this.submit = page.locator(".submit-button");
    this.errormessage = page.locator("h3[data-test=error]");
  }

  async goTo() {
    await this.page.goto(BASE_URL);
  }

  async validLogin(username: string, password: string) {
    await this.userName.fill(username);
    await this.passWord.fill(password);
    await this.submit.click();
  }

  async InvalidLogin(wrongUsername: string, invalidPassword: string) {
    await this.userName.fill(wrongUsername);
    await this.passWord.fill(invalidPassword);
    await this.submit.click();
  }
}