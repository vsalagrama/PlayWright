import { expect, type Page } from "@playwright/test";
import { globalConfig, TextBox } from '../tests/testdata'

export class ProductPage {
    async addItemsToCart(productName?: "backpack" | "bike light" |"fleece jacket" | "onesie") {
        if(productName){
            const locator = `[data-test="add-to-cart-sauce-labs-${productName.replace(' ', '-')}"]`;
            await this.page.click(locator);
            console.log('productName clicked ',productName);
        }
        else{
            await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            console.log('first item on products page added to cart');
        }
    
    }
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async logout() {
        await this.clickOpenMenu();
        await this.clickLogout();
        await this.verifyLoginPage();
        
    }
    async verifyLoginPage() {
        await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
        console.log('successully logged out');
    }
    async clickLogout() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
        console.log('Logout button clicked');
    }
    async clickOpenMenu() {
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
        console.log('Open Menu button clicked');
    }
}


