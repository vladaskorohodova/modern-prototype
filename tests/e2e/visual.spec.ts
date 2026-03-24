import { expect, test, type Page } from '@playwright/test';

async function waitForPageStability(page: Page) {
  await page.evaluate(async () => {
    if ('fonts' in document) {
      await document.fonts.ready;
    }
  });

  await expect(page.locator('main')).toBeVisible();
}

test.describe('desktop visual regression', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('captures the landing page', async ({ page }) => {
    await page.goto('');
    await waitForPageStability(page);

    await expect(page).toHaveScreenshot('landing-desktop.png', {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('captures the docs landing page', async ({ page }) => {
    await page.goto('docs/');
    await waitForPageStability(page);

    await expect(page).toHaveScreenshot('docs-home-desktop.png', {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('captures the button docs page', async ({ page }) => {
    await page.goto('docs/components/button/');
    await waitForPageStability(page);

    await expect(page).toHaveScreenshot('button-docs-desktop.png', {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  });
});

test.describe('mobile visual regression', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('captures the landing page', async ({ page }) => {
    await page.goto('');
    await waitForPageStability(page);

    await expect(page).toHaveScreenshot('landing-mobile.png', {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('captures the docs landing page', async ({ page }) => {
    await page.goto('docs/');
    await waitForPageStability(page);

    await expect(page).toHaveScreenshot('docs-home-mobile.png', {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('captures the button docs page', async ({ page }) => {
    await page.goto('docs/components/button/');
    await waitForPageStability(page);

    await expect(page).toHaveScreenshot('button-docs-mobile.png', {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  });
});