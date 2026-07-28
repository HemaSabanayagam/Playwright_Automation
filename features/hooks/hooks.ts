import { Before, After, Status, setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { chromium, firefox, webkit, Page, Browser } from "@playwright/test";
import { POManager } from "../../pages/POManager";

const browserName: any = process.env.BROWSER || "chromium";

const browserTypes: any = {
  chromium,
  firefox,
  webkit,
};

export class CustomWorld extends World {

  browser!: Browser;
  page!: Page;
  poManager!: POManager;
  loginPage: any;
  addProduct: any;
  orderItem: any;
  context: any;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async openBrowser() {
    this.browser = await browserTypes[browserName].launch({ headless: false });;
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.poManager = new POManager(this.page);
    this.loginPage = this.poManager.getLoginPage();
    this.addProduct = this.poManager.getAddItem();
    this.orderItem = this.poManager.getPlaceOrder();
  };

  async closeBrowser() {
    await this.browser.close();
  }
};

setWorldConstructor(CustomWorld);
Before(async function (this: CustomWorld) {
  await this.openBrowser();
});

After(async function (this: CustomWorld) {
  await this.closeBrowser();
});
