import { expect, type Page } from "@playwright/test";
import { globalConfig, TextBox } from '../tests/testdata'

export class LandingPage {
    async loginWithPerformanceGlitchUser() {
        await this.enterUserName(globalConfig.performance_glitch_user.username);
        await this.enterPassword(globalConfig.performance_glitch_user.password);
        await this.clickLogin();
    }
    async loginWithProblemUser() {
        await this.enterUserName(globalConfig.problem_user.username);
        await this.enterPassword(globalConfig.problem_user.password);
        await this.clickLogin();
    }
    async loginWithLockedOutUser() {
        await this.enterUserName(globalConfig.lockedout_user.username);
        await this.enterPassword(globalConfig.lockedout_user.password);
        await this.clickLogin();
        await this.checkLockedOutUserErrorMessage();
    }
    async checkLockedOutUserErrorMessage() {
        await expect(this.page.locator('[data-test="error"]')).toBeVisible();
        console.log('Error message appeared for invalid user ')
    }
    async loginWithStandardUser() {
        await this.enterUserName(globalConfig.standard_user.username);
        await this.enterPassword(globalConfig.standard_user.password);
        await this.clickLogin();
        await this.checkProductsPageStatus();
    }
    async checkReadOnly() {
        const status = await this.page.locator('//*[@id="dontwrite"]').isEditable()
        if(status === true){
            console.log('Editable field')
        }else{
            console.log('Not Editable field')
        }
    }
    async checkDisabled() {
       const status = await this.page.locator('//*[@id="noEdit"]').isDisabled();
        if(status === true){
            console.log('Disabled field')
        }else{
            console.log('Not Disabled field')
        }
    }
    async clearText() {
        await this.page.locator('//*[@id="clearMe"]').clear()
    }
    async getText() {
        const textValue = await this.page.locator('//*[@id="getMe"]').first().textContent();
        console.log(textValue)
    }
    async appendTextAndTAB() {
        await this.page.locator('//*[@id="join"]').fill(TextBox.firstName)
        await this.page.locator('//*[@id="join"]').type('Tab')
    }
    async enterFullName() {
        //await this.page.getByPlaceholder('Enter first & last name').clear()
        await this.page.getByPlaceholder('Enter first & last name').fill(TextBox.firstName)
    }
    async chooseInputFields() {
        await this.page.getByRole('link', { name: 'Edit' }).click();
    }
    async validateDetailsinTextBox() {
        await expect(this.page.locator('//*[@id="name"]')).toContainText(TextBox.firstName)
        await expect(this.page.locator('//*[@id="email"]')).toContainText(TextBox.email)
        await expect(this.page.locator('//*[@id="permanentAddress"]').last()).toContainText(TextBox.address)
    }
    async enterDetailsinTextbox() {

        await this.page.getByPlaceholder('Full Name').fill(TextBox.firstName)
        await this.page.getByPlaceholder('name@example.com').fill(TextBox.email)
        await this.page.getByPlaceholder('Current Address').fill(TextBox.address)
        await this.page.locator('#permanentAddress').fill(TextBox.address)
        await this.page.getByRole('button', { name: 'Submit' }).click()

    }
    async clickTextBox() {
        await this.page.getByText('Text Box').click();
    }
    async chooseElements() {
        await this.page.getByRole('heading', { name: 'Elements' }).click();
    }


    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    async launchURL() {
        await this.page.goto(globalConfig.url);
        await expect(this.page).toHaveTitle('Swag Labs', { timeout: 100000 })
        console.log('url successfully launched ',this.page.url());
    }
    async  enterUserName(username: string) {
        await this.page.locator('[data-test="username"]').fill(username);
        console.log('user name entered :', username);
    }
    async  enterPassword(password: string) {
        await this.page.locator('[data-test="password"]').fill(password);
        console.log('password entered ', password);
    }
    
    async  clickLogin() {
        await this.page.locator('[data-test="login-button"]').click();
        console.log('click button clicked');
    }
    
    async  checkProductsPageStatus() {
        await this.page.locator('//*[@id="header_container"]/div[2]/span').isVisible();
        console.log('Products page opened');
    }
    


}


