import { expect, test } from '@playwright/test';

test('landing and docs pages load with shared header actions', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Modern React Library' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View project on GitHub' })).toBeVisible();

  await page.goto('/docs/');

  await expect(page.getByRole('link', { name: 'Modern React Library' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View project on GitHub' })).toBeVisible();
});

test('mobile docs navigation opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/components/button/');

  const docsNavigation = page.locator('#docs-sidebar');

  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(docsNavigation).toBeVisible();
  await expect(page.getByRole('link', { name: 'Quick start' })).toBeVisible();

  await page.getByRole('banner').getByRole('button', { name: 'Close navigation menu' }).click();
  await expect(docsNavigation).toHaveAttribute('aria-hidden', 'true');
});