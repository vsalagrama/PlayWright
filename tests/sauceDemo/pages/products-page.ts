import { expect, type Page } from "@playwright/test";
import { globalConfig, TextBox } from '../tests/testdata'

export class ProductPage {
    async checkout() {
        await this.clickCartButton();
        await this.clickCheckout();
        await this.enterFirstname(globalConfig.firstname);
        await this.enterLastname(globalConfig.lastname);
        await this.enterZip(globalConfig.zip);
        await this.clickContinue();
        await this.clickFinish();
        await this.verifyOrderStatus();
        await this.clickBackHome();

    }
    async clickBackHome() {
       await this.page.locator('[data-test="back-to-products"]').click();
       console.log("Back Home button clicked");
    }
    async verifyOrderStatus() {
        await expect(this.page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
        console.log("Order status verified. order placed successfully");
    }
    async clickFinish() {
        await this.page.locator('[data-test="finish"]').click();
        console.log('Finish button clicked');
    }
    async clickContinue() {
        await this.page.locator('[data-test="continue"]').click();
        console.log('Click Continue');
    }
    async enterZip(zip: string) {
        await this.page.locator('[data-test="postalCode"]').fill(zip);
        console.log("Zip entered ",zip);
    }
    async enterLastname(lastname: string) {
        await this.page.locator('[data-test="lastName"]').fill(lastname);
        console.log("Last name entered ",lastname);
    }
    async enterFirstname(firstname: string) {
        await this.page.locator('[data-test="firstName"]').fill(firstname);
        console.log("first name entered ",firstname);
    }
    async clickCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }
    async clickCartButton() {
        await this.page.locator('a').filter({ hasText: '1' }).click();
        console.log('cart opened');
    }
    async removeItemsFromCart() {
       await this.page.locator('a').filter({ hasText: '1' }).click();
       await this.page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
    }
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


