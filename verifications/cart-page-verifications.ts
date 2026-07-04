import { expect } from '@playwright/test';
import { CartPage } from '../pages/cart-page';

export class CartPageVerification {
    readonly cartPage: CartPage;

    constructor(cartPage: CartPage) {
        this.cartPage = cartPage;
    }

    private parseCurrency(text: string): number {
        const match = text.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
    }

    async verifyProductPrice(productName: string): Promise<void> {
        const priceText = await this.cartPage.getProductPrice(productName).textContent();
        const price = this.parseCurrency(priceText!);
        expect(price).toBeGreaterThan(0);
    }

    async verifySubtotal(productName: string): Promise<void> {
        const priceText = await this.cartPage.getProductPrice(productName).textContent();
        const quantityText = await this.cartPage.getProductQuantity(productName).inputValue();
        const subtotalText = await this.cartPage.getProductSubtotal(productName).textContent();

        const price = this.parseCurrency(priceText!);
        const quantity = parseInt(quantityText);
        const actualSubtotal = this.parseCurrency(subtotalText!);

        expect(actualSubtotal).toBeCloseTo(price * quantity, 2);
    }

    async verifyTotal(productNames: string[]): Promise<void> {
        let expectedTotal = 0;
        for (const name of productNames) {
            const subtotalText = await this.cartPage.getProductSubtotal(name).textContent();
            expectedTotal += this.parseCurrency(subtotalText!);
        }
        const totalText = await this.cartPage.cartTotal.textContent();
        expect(this.parseCurrency(totalText!)).toBeCloseTo(expectedTotal, 2);
    }
}
