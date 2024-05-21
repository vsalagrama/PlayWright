// Import the 'test' function from the Playwright test library
import { test } from '@playwright/test';

// Import page objects for the landing and product pages
import { LandingPage } from '../pages/landing-page';

// Import test data, specifically text box data
import { TextBox } from './testdata';

test('Case 1:Checking Accessible names: @regression @smoke', async ({ page, isMobile, browser }) => {
 // Create instances of the page objects
 const landingpage = new LandingPage(page);

 // Launch the application URL
 await landingpage.launchURL();

 await landingpage.loadingStatus();
 await landingpage.verifyAccessibleNames();
 await landingpage.verifyRoles();
 // Log the success message from the TextBox test data
 console.log(TextBox.successMessage);

 // Log the browser version for debugging purposes
 console.log('browser version ' ,browser.version()); // to print browser version

});
