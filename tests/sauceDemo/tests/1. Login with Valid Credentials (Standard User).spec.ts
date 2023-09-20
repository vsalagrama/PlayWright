import { test } from '@playwright/test'

import { LandingPage } from '../pages/landing-page';
import { ProductPage } from '../pages/products-page';

import { TextBox } from './testdata'


test('Case 1: Login with Valid Credentials (Standard User): @regression @smoke', async ({ page, isMobile, browser }) => {
    const landingpage = new LandingPage(page);
    const productsPage = new ProductPage(page);
    await landingpage.launchURL();
    await landingpage.loginWithStandardUser();
    await productsPage.logout();

    console.log(TextBox.successMessage)
    console.log('browser version ' ,browser.version()); // to print browser version
})

test.afterEach(async ({ page }, testInfo) => {
    await page.close()

    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`)
    if (testInfo.status !== testInfo.expectedStatus) { console.log(`Did not run as expected, ended up at ${page.url()} `) }
})
