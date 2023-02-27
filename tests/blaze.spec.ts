import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://blazedemo.com/
  await page.goto('https://blazedemo.com/');

  // Select San Diego
  await page.locator('select[name="fromPort"]').selectOption('San Diego');

  // Select New York
  await page.locator('select[name="toPort"]').selectOption('New York');

  // Click text=Find Flights
  await page.locator('text=Find Flights').click();
  await expect(page).toHaveURL('https://blazedemo.com/reserve.php');

  // Click text=Choose This Flight 9696 Aer Lingus 5:27 AM 8:22 PM $200.98 >> input[type="submit"]
  await page.locator('text=Choose This Flight 9696 Aer Lingus 5:27 AM 8:22 PM $200.98 >> input[type="submit"]').click();
  await expect(page).toHaveURL('https://blazedemo.com/purchase.php');

  // Click [placeholder="First Last"]
  await page.locator('[placeholder="First Last"]').click();

  // Fill [placeholder="First Last"]
  await page.locator('[placeholder="First Last"]').fill('venkatesh');

  // Click [placeholder="\31 23 Main St\."]
  await page.locator('[placeholder="\\31 23 Main St\\."]').click();

  // Fill [placeholder="\31 23 Main St\."]
  await page.locator('[placeholder="\\31 23 Main St\\."]').fill('address');

  // Click [placeholder="Anytown"]
  await page.locator('[placeholder="Anytown"]').click();

  // Fill [placeholder="Anytown"]
  await page.locator('[placeholder="Anytown"]').fill('Kanasas');

  // Click text=Purchase Flight
  await page.locator('text=Purchase Flight').click();
  await expect(page).toHaveURL('https://blazedemo.com/confirmation.php');

  // Click pre
  await page.locator('pre').click();

  // npx playwright codegen vantislifeinsurancestgnew.sureify.com/?vdtca
  // npx playwright test tests/blaze.spec.ts --headed --project=chromium
});