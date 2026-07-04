import { expect } from '@playwright/test';
import { HomePage } from "../pages/home-page";
import { ContactPage } from "../pages/contact-page";
import { ShopPage } from "../pages/shop-page";

export class HomePageSteps {
    readonly homePage: HomePage;
    readonly contactPage: ContactPage;

    constructor(homePage: HomePage) {
        this.homePage = homePage;
        this.contactPage = new ContactPage(homePage.page);
    }

    async navigateToContact(): Promise<ContactPage> {
        await this.homePage.contact.click();
        await expect(this.contactPage.welcomeMessage).toBeVisible();
        return this.contactPage;
    }

    async navigateToShop(): Promise<ShopPage> {
        await this.homePage.startShoppingBtn.click();
        return new ShopPage(this.homePage.page);
    }
}