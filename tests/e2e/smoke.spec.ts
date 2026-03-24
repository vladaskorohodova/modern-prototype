import { expect, test } from '@playwright/test';

test('core routes load with the shared header', async ({ page }) => {
  const routes = [
    '',
    'docs/',
    'docs/components/button/',
    'docs/get-started/installation/',
  ];

  for (const route of routes) {
    await page.goto(route);

    await expect(page.getByRole('link', { name: 'Modern React Library' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View project on GitHub' })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  }
});

test('home link returns to landing from docs pages', async ({ page }) => {
  await page.goto('docs/components/button/');

  await expect(page.getByRole('heading', { name: 'Button Overview' })).toBeVisible();

  await page.getByRole('link', { name: 'Modern React Library' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: /Ship polished React interfaces/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Modern React Library' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View project on GitHub' })).toBeVisible();
});

test('mobile docs navigation closes from the header control and after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('docs/components/button/');

  const docsNavigation = page.locator('#docs-sidebar');

  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(docsNavigation).toBeVisible();
  await expect(page.getByRole('link', { name: 'Quick start' })).toBeVisible();

  await page.getByRole('banner').getByRole('button', { name: 'Close navigation menu' }).click();
  await expect(docsNavigation).toHaveAttribute('aria-hidden', 'true');

  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.getByRole('link', { name: 'Quick start' }).click();

  await expect(page).toHaveURL(/\/docs\/get-started\/quick-start\/?$/);
  await expect(docsNavigation).toHaveAttribute('aria-hidden', 'true');
});

test('scroll-to-top appears after scrolling and returns the page near the top', async ({ page }) => {
  await page.goto('docs/components/button/');

  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(page.getByRole('button', { name: 'Go to top' })).toBeVisible();

  await page.getByRole('button', { name: 'Go to top' }).click();

  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeLessThan(80);
});

test('docs code blocks render highlighted markup and support copy', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('docs/components/button/');

  const staticCodeBlock = page.locator('pre code').first();
  await expect(staticCodeBlock).toContainText("import { Button } from 'modern-react-knowledge';");
  await expect(staticCodeBlock.locator('span').first()).toBeVisible();

  const copyButton = page.getByRole('button', { name: 'Copy code to clipboard' }).first();
  await copyButton.click();

  await expect(page.getByRole('button', { name: 'Code copied to clipboard' }).first()).toBeVisible();
  await expect.poll(async () => page.evaluate(() => navigator.clipboard.readText())).toContain('import { Button }');
});