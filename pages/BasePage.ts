import { Page } from "@playwright/test";

export class BasePage {
  page: Page;
  pageName: string;

  constructor(page: Page, pageName: string) {
    this.page = page;
    this.pageName = pageName;
  }

  async takeScreenshot(screenshotName: string) {
    await this.page.screenshot({
      path: `screenshots/${this.pageName}/${screenshotName}.png`,
      fullPage: true
    });
  }
}