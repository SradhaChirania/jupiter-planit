import { ShopPage } from '../pages/shop-page';
import { CartPage } from '../pages/cart-page';

export class ShopPageSteps {
    readonly shopPage: ShopPage;

    constructor(shopPage: ShopPage) {
        this.shopPage = shopPage;
    }

    async buyProduct(productName: string, quantity: number): Promise<void> {
        const buyBtn = this.shopPage.getBuyButton(productName);
        for (let i = 0; i < quantity; i++) {
            await buyBtn.click();
        }
    }

    async navigateToCart(): Promise<CartPage> {
        await this.shopPage.cartLink.click();
        return new CartPage(this.shopPage.page);
    }
}
