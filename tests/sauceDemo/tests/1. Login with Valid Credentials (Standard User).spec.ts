import { test } from '@playwright/test'

import { LandingPage } from '../pages/landing-page'

import { TextBox } from './testdata'


test('Case 1: Login with Valid Credentials (Standard User): @regression @smoke', async ({ page, isMobile, browser }) => {
    const landingpage = new LandingPage(page)
    await landingpage.launchURL();
    await landingpage.loginWithStandardUser();

    console.log(TextBox.successMessage)
    console.log('browser version ' ,browser.version());
})

test.afterEach(async ({ page }, testInfo) => {
    await page.close()

    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`)
    if (testInfo.status !== testInfo.expectedStatus) { console.log(`Did not run as expected, ended up at ${page.url()} `) }
})
