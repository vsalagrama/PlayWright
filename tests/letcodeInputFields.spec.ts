import { test } from '@playwright/test'

import { LandingPage } from '../pages/landing-page'

import { TextBox } from './testdata'

try {
    test('Case 1: Interact with different types of input fields letcode/test @regression @smoke', async ({ page }) => {
        const landingpage = new LandingPage(page)
        await landingpage.launchURL()
        await landingpage.chooseInputFields()
        await landingpage.enterFullName()
        await landingpage.appendTextAndTAB()
        await landingpage.getText()
        await landingpage.clearText()
        await landingpage.checkDisabled()
        await landingpage.checkReadOnly()
       
        console.log(TextBox.successMessage)
    })
}
catch (exception) {
    console.log('Exception occured', exception)
}

finally {
    test.afterEach(async ({ page }, testInfo) => {
        await page.close()

        console.log(`Finished ${testInfo.title} with status ${testInfo.status}`)
        if (testInfo.status !== testInfo.expectedStatus) { console.log(`Did not run as expected, ended up at ${page.url()} `) }
    })


}