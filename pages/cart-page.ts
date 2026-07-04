import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartTotal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTotal = page.locator('tfoot strong');
    }

    private getProductRow(productName: string): Locator {
        return this.page.locator('td').filter({ hasText: productName }).locator('..');
    }

    getProductPrice(productName: string): Locator {
        return this.getProductRow(productName).locator('td').nth(1);
    }

    getProductQuantity(productName: string): Locator {
        return this.getProductRow(productName).locator('input[name="quantity"]');
    }

    getProductSubtotal(productName: string): Locator {
        return this.getProductRow(productName).locator('td').nth(3);
    }
}
