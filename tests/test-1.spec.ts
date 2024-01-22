import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  await expect(page.getByRole('heading', { name: 'Welcome to the Simple Travel' })).toBeVisible();
 // await expect(page).toHaveTitle('Website Name');
  await page.locator('select[name="fromPort"]').selectOption('Portland');
  await page.locator('select[name="toPort"]').selectOption('New York');
  await page.getByRole('button', { name: 'Find Flights' }).click();
  await expect(page.locator('thead')).toContainText('Departs: Portland');
  await expect(page.locator('thead')).toContainText('Arrives: New York');
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Purchase Flight' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your purchase' })).toBeVisible();
  await page.close();
});