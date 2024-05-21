// Import the 'test' function from the Playwright test library
import { test } from '@playwright/test';

// Import page objects for the landing and product pages
import { LandingPage } from '../pages/landing-page';
import { ProductPage } from '../pages/products-page';

// Import test data, specifically text box data
import { TextBox } from './testdata';

// Define a test case for logging in with valid credentials
test('Case 1: Login with Valid Credentials (Standard User): @regression @smoke', async ({ page, isMobile, browser }) => {
    // Create instances of the page objects
    const landingpage = new LandingPage(page);
    const productsPage = new ProductPage(page);

    // Launch the application URL
    await landingpage.launchURL();

    // Perform login with standard user credentials
    await landingpage.loginWithStandardUser();

    // Logout from the application
    await productsPage.logout();
    
    // Log the success message from the TextBox test data
    console.log(TextBox.successMessage);

    // Log the browser version for debugging purposes
    console.log('browser version ' ,browser.version()); // to print browser version
});

// Define an afterEach hook for actions to perform after each test
test.afterEach(async ({ page }, testInfo) => {
    // Close the current page
    await page.close();

    // Log the completion of the test case with its status
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    // Check if the test did not run as expected and log the current URL
    if (testInfo.status !== testInfo.expectedStatus) {
        console.log(`Did not run as expected, ended up at ${page.url()} `);
    }
});
