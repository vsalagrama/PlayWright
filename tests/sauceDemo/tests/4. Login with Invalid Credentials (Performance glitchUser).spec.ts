// Import the 'test' function from the Playwright testing library
import { test } from '@playwright/test';

// Import page object classes for the landing and product pages
import { LandingPage } from '../pages/landing-page';
import { ProductPage } from '../pages/products-page';

// Import test data, here for text box content
import { TextBox } from './testdata';

// Define a test case for logging in with a user that experiences performance glitches
test('Case 4: Login with Valid Credentials (Performance Glitch User): @regression @smoke', async ({ page, isMobile, browser }) => {
    // Instantiate the page objects for the landing and product pages
    const landingpage = new LandingPage(page);
    const productsPage = new ProductPage(page);

    // Navigate to the application's landing page
    await landingpage.launchURL();

    // Perform login using credentials of a user known to cause performance issues
    await landingpage.loginWithPerformanceGlitchUser();

    // Log out from the application to complete the test scenario
    await productsPage.logout();

    // Output the success message to the console, which might be an indication
    // of successful login or a specific message related to performance issues
    console.log(TextBox.successMessage);

    // Log the browser version to the console, which can be crucial information
    // when diagnosing performance-related test failures
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
