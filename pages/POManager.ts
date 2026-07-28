import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { AddItem } from "./AddItem";
import { PlaceOrder } from "./PlaceOrder";

export class POManager {
    loginPage: LoginPage;
    addItem: AddItem;
    placeOrder: PlaceOrder;
    page: Page;
    
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.addItem = new AddItem(this.page);
        this.placeOrder = new PlaceOrder(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getAddItem() {
        return this.addItem;
    }

    getPlaceOrder() {
        return this.placeOrder;
    }
}
