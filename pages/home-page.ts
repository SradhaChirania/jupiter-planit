import {Page, Locator} from '@playwright/test'

export class HomePage {
    readonly page: Page;
    readonly startShoppingBtn : Locator;
    readonly cart: Locator;
    readonly contact: Locator

    constructor(page:Page) {
        this.page = page
        this.startShoppingBtn = page.getByRole('link', { name: 'Start Shopping »' })
        this.contact = page.getByRole('link', { name: 'Contact' })
        this.cart = page.getByRole('link').filter({ hasText: 'Cart' })
    }
}
