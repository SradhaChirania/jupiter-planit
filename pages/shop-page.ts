import { Page, Locator } from '@playwright/test';

export class ShopPage {
    readonly page: Page;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.getByRole('link').filter({ hasText: 'Cart' });
    }

    getBuyButton(productName: string): Locator {
        return this.page.locator('.product').filter({ hasText: productName }).getByText('Buy');
    }
}
