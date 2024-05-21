// Import the 'test' function from the Playwright test library
import { test } from '@playwright/test';

// Import page object classes for the landing and product pages
import { LandingPage } from '../pages/landing-page';
import { ProductPage } from '../pages/products-page';

// Import test data, here for text box content
import { TextBox } from './testdata';

// Define a test case for adding items to the shopping cart
test('Case 5: Add Items to Cart: @regression @smoke', async ({ page, isMobile, browser }) => {
    // Instantiate the page objects for the landing and product pages
    const landingpage = new LandingPage(page);
    const productsPage = new ProductPage(page);

    // Navigate to the application's landing page
    await landingpage.launchURL();

    // Log in with a standard user account
    await landingpage.loginWithStandardUser();

    // Add a specific item, in this case, a 'fleece jacket', to the shopping cart
    await productsPage.addItemsToCart('fleece jacket');

    // Log out from the application after adding the item to the cart
    await productsPage.logout();

    // Output the success message to the console, which might be an indication
    // of successful addition of the item to the cart
    console.log(TextBox.successMessage);

    // Log the browser version to the console, useful for debugging if the
    // test behavior varies across different browser versions
    console.log('browser version ' ,browser.version());
});

// Define an afterEach hook for actions to perform after each test case
test.afterEach(async ({ page }, testInfo) => {
    // Close the browser page to clean up the test environment
    await page.close();

    // Log the title and status of the test that has just been completed
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    // If the test did not conclude with the expected status, log an additional message
    // along with the URL where the test ended, which can help with troubleshooting
    if (testInfo.status !== testInfo.expectedStatus) {
        console.log(`Did not run as expected, ended up at ${page.url()} `);
    }
});
