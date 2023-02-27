import { expect, type Page } from "@playwright/test";
import { globalConfig, TextBox } from '../tests/testdata'

export class LandingPage {
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
        //await expect(this.page).toHaveTitle('DEMOQA', { timeout: 100000 })
    }



}