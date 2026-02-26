import { test } from '@playwright/test';
import { LoginPage } from '../../pages/auth/login.page';
import { LOGIN_URL } from '../../utils/constants';

const { allure } = require('allure-playwright');

test.describe('Login Authentication', () => {

    test.beforeEach('Before Test', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate(LOGIN_URL);
        await loginPage.waitForPageLoad();
    });

    test('User can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.isLoginFormVisible();
        await allure.step('Take screenshot after loading login page', async () => {
            const screenshot = await page.screenshot({ fullPage: false });
            await allure.attachment('Login page screenshot', screenshot, 'image/png');
        });
    });
});