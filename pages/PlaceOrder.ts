import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

const { expect } = require('@playwright/test');

export class PlaceOrder extends BasePage {

    firstName: Locator;
    lastName: Locator;
    zipCode: Locator;
    continue: Locator;
    pageContent: Locator;
    order_confirmation: Locator;
    errormessage: Locator;
    page: Page;
    expectedText: string[];

    constructor(page: Page) {
        super(page, "place-order");
        this.page = page;
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.zipCode = page.getByPlaceholder("Zip/Postal Code");
        this.continue = page.locator("#continue");
        this.order_confirmation = page.locator(".complete-header");
        this.errormessage = page.locator(".error-message-container");
        this.pageContent = page.locator('body');
        this.expectedText = [
            "Payment Information",
            "Shipping Information",
            "Price Total"
        ]
    }

    async updateDetails(firstname: string, lastname: string, zipcode: string) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
        await this.continue.click();
    }

    async missingDetails(Invalid_firstname: string, Invalid_lastname: string, Invalid_zipcode: string) {
        await this.firstName.fill(Invalid_firstname);
        await this.lastName.fill(Invalid_lastname);
        await this.zipCode.fill(Invalid_zipcode);
        await this.continue.click();
    }

    async verifyOrder() {
        const actualText = await this.pageContent.innerText();
        for (const text of this.expectedText) {
            expect(actualText).toContain(text);
        }
    }

    async placeOrder() {
        await this.page.getByRole("button", { name: "Finish" }).click();
    }

    async orderConfirmation() {
        await expect(this.order_confirmation).toHaveText("Thank you for your order!");
    }

    async verifyVisual_OrderConfirmation() {
        await expect(this.page).toHaveScreenshot("Order_confirmation.png");
    }
}


