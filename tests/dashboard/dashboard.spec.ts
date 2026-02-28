import { test } from '../../fixtures/base.fixtures';
const { allure } = require('allure-playwright');

test.describe('Validate dashboard functionality', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
  });

  test('TS_003 - Validate dashboard functionality', async ({ page, dashboardPage }) => {
    await dashboardPage.startRecording();
    await page.waitForTimeout(10000);
    await allure.step('Validate if carousel image are moving from right to left', async () => {
      await dashboardPage.validateVideo('Validate if carousel image changes from right to left then new image displays.');
    });
  });

  test.afterEach(async ({ page }) => {
    await page.reload();
  });

});
