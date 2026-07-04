import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { HomePageSteps } from '../steps/home-page-steps';
import { ShopPageSteps } from '../steps/shop-page-steps';
import { CartPageVerification } from '../verifications/cart-page-verifications';

const PRODUCTS = [
    { name: 'Stuffed Frog', quantity: 2 },
    { name: 'Fluffy Bunny', quantity: 5 },
    { name: 'Valentine Bear', quantity: 3 },
];

test.describe('Shop and Cart', () => {
    test('Buy products and verify cart subtotals and total', async ({ page }) => {
        await page.goto('/');

        const homePageSteps = new HomePageSteps(new HomePage(page));
        const shopPage = await homePageSteps.navigateToShop();
        const shopPageSteps = new ShopPageSteps(shopPage);

        for (const product of PRODUCTS) {
            await shopPageSteps.buyProduct(product.name, product.quantity);
        }

        const cartPage = await shopPageSteps.navigateToCart();
        const cartVerification = new CartPageVerification(cartPage);

        for (const product of PRODUCTS) {
            await cartVerification.verifyProductPrice(product.name);
            await cartVerification.verifySubtotal(product.name);
        }

        await cartVerification.verifyTotal(PRODUCTS.map(p => p.name));
    });
});
