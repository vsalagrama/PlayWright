// Import the 'test' function from the Playwright testing library
import { test } from '@playwright/test';

// Import page object classes for the landing and product pages
import { LandingPage } from '../pages/landing-page';
import { ProductPage } from '../pages/products-page';

// Import test data utilities, here for text box interactions
import { TextBox } from './testdata';

// Define a test case for attempting to log in with a locked-out user account
test('Case 2: Login with Invalid Credentials (Locked Out User): @regression @smoke', async ({ page, isMobile, browser }) => {
    // Instantiate the page objects for further actions
    const landingpage = new LandingPage(page);
    const productsPage = new ProductPage(page);

    // Navigate to the application's landing page
    await landingpage.launchURL();

    // Attempt to log in with credentials of a user that is locked out
    await landingpage.loginWithLockedOutUser();

    // Output the success message to the console, which in this case,
    // may be used to confirm the error message received upon failed login
    console.log(TextBox.successMessage);

    // Log the browser version to the console for debugging purposes
    console.log('browser version ' ,browser.version());
});

// Define an afterEach hook to perform clean-up actions after each test case
test.afterEach(async ({ page }, testInfo) => {
    // Close the browser page to clean up after the test
    await page.close();

    // Log the title and status of the test that just finished
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    // If the test did not end with the expected status, log an additional message
    // along with the URL where the test ended, which can help with debugging
    if (testInfo.status !== testInfo.expectedStatus) {
        console.log(`Did not run as expected, ended up at ${page.url()} `);
    }
});
