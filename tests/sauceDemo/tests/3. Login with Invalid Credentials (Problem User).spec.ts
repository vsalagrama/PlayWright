// Import the 'test' function from the Playwright test library
import { test } from '@playwright/test';

// Import page object classes for the landing and product pages
import { LandingPage } from '../pages/landing-page';
import { ProductPage } from '../pages/products-page';

// Import test data, here for text box content
import { TextBox } from './testdata';

// Define a test case for logging in with a 'problem user', which is typically a user
// with credentials that will cause unexpected behavior for testing purposes
test('Case 3: Login with Invalid Credentials (Problem User): @regression @smoke', async ({ page, isMobile, browser }) => {
    // Instantiate the page objects for the landing and product pages
    const landingpage = new LandingPage(page);
    const productsPage = new ProductPage(page);

    // Open the application's landing page
    await landingpage.launchURL();

    // Attempt to log in with the credentials of a 'problem user'
    await landingpage.loginWithProblemUser();

    // Log out from the application, which should be part of the test flow
    // to ensure the application can handle login attempts from such users
    await productsPage.logout();

    // Log the success message to the console, which in this context might be
    // used to confirm the error message or unexpected behavior upon login attempt
    console.log(TextBox.successMessage);

    // Output the browser version to the console, useful for debugging if the
    // test behavior varies across different browser versions
    console.log('browser version ' ,browser.version());
});

// Define an afterEach hook to perform actions after each test case
test.afterEach(async ({ page }, testInfo) => {
    // Close the current browser page to clean up the test environment
    await page.close();

    // Log the title and status of the test that has just been completed
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    // If the test did not conclude with the expected status, log an additional message
    // along with the URL where the test ended, which can help identify where the test failed
    if (testInfo.status !== testInfo.expectedStatus) {
        console.log(`Did not run as expected, ended up at ${page.url()} `);
    }
});
