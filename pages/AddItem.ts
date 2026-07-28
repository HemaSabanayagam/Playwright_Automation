import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

const { expect } = require("@playwright/test");

export class AddItem extends BasePage {

    sort: Locator;
    products: Locator;
    cart: Locator;
    items: Locator;
    checkout: Locator;
    emptycart: Locator;
    loadedcart: Locator;
    page: Page;

    constructor(page: Page) {
        super(page, "add-item");
        this.page = page;
        this.sort = page.locator("select.product_sort_container");
        this.products = page.locator(".inventory_item");
        this.cart = page.locator(".shopping_cart_link");
        this.items = page.locator("div[data-test='inventory-item']");
        this.checkout = page.getByText("Checkout");
        this.emptycart = page.locator(".removed_cart_item");
        this.loadedcart = page.locator(".cart_item");
    }

    async sortItem() {
        await this.sort.selectOption("Name (Z to A)");
    }

    async verifySort() {
        const actual = await this.products.allTextContents();
        const expected = [...actual].sort((a, b) => b.localeCompare(a));
        expect(actual).toEqual(expected);
    }

    async addItem(productName: string) {
        await this.products.first().waitFor();
        await this.products.filter({ hasText: productName }).getByRole("button", { name: "Add to cart" }).click();
    }

    async goToCart() {
        await this.cart.click();
    }

    async removeItem(remove_productName: String) {
        await this.items.first().waitFor();
        const count = await this.items.count();
        for (let i = 0; i < count; i++) {
            if (await this.items.nth(i).locator(".inventory_item_name").textContent() === remove_productName) {
                await this.items.nth(i).locator("text=Remove").click();
                break;
            }
        }
    }

    async verifyEmptyCart() {
        const emptyCart = await this.emptycart.isVisible();
        expect(emptyCart).toBeTruthy;
    }

    async verifyCart() {
        const loadedcart = await this.loadedcart.isVisible();
        expect(loadedcart).toBeTruthy;
    }

    async checkOut() {
        await this.checkout.click();
    }
}