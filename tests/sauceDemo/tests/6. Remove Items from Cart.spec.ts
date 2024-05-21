// Import the 'test' function from the Playwright testing library
import { test } from '@playwright/test';

// Import page object classes for the landing and product pages
import { LandingPage } from '../pages/landing-page';
import { ProductPage } from '../pages/products-page';

// Import test data, specifically for text box interactions
import { TextBox } from './testdata';

// Define a test case for removing items from the shopping cart
test('Case 6: Remove Items from Cart: @regression @smoke', async ({ page, isMobile, browser }) => {
    // Instantiate page objects for the landing and product pages
    const landingpage = new LandingPage(page);
    const productsPage = new ProductPage(page);

    // Open the application's landing page
    await landingpage.launchURL();

    // Log in with a standard user account
    await landingpage.loginWithStandardUser();

    // Add an item, 'fleece jacket', to the shopping cart
    await productsPage.addItemsToCart('fleece jacket');

    // Remove the previously added item from the shopping cart
    await productsPage.removeItemsFromCart();

    // Log out from the application
    await productsPage.logout();

    // Log the success message to the console, which might be used to confirm
    // the successful removal of the item from the cart
    console.log(TextBox.successMessage);

    // Log the browser version for debugging purposes
    console.log('browser version ' ,browser.version());
});

// Define an afterEach hook for actions to perform after each test case
test.afterEach(async ({ page }, testInfo) => {
    // Close the browser page to clean up after the test
    await page.close();

    // Log the completion of the test case with its status
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    // If the test did not run as expected, log the current URL for debugging
    if (testInfo.status !== testInfo.expectedStatus) {
        console.log(`Did not run as expected, ended up at ${page.url()} `);
    }
});
