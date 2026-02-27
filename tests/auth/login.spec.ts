import { test } from '@playwright/test';
import { LoginPage } from '../../pages/auth/login.page';
import { loginURL } from '../../utils/constants';

const { allure } = require('allure-playwright');

test.describe('Login Authentication', () => {

	test.beforeEach('Before Test', async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.navigate(loginURL);
		await loginPage.waitForPageLoad();
	});

	test('User can login successfully', async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.isLoginFormVisible();

		await allure.step('Take screenshot after loading login page', async () => {
			const screenshot = await page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', screenshot, 'image/png');
		});

		await allure.step('Validate teklora in login page', async () => {
			await loginPage.validateImage("Validate if the image on the login form contains the word 'Teklora'");
		});

		await allure.step('Take screenshot after filling password fields', async () => {
			await loginPage.fillPasswordInput("Testing@123");
			const passwordFillScreenshot = await page.screenshot({ fullPage: false });
			await allure.attachment('password fill field screenshot', passwordFillScreenshot, 'image/png');
		});

		await allure.step('Take screenshot after clicking showpassword button', async () => {
			await loginPage.clickShowPasswordButton();
			const showPasswordScreenshot = await page.screenshot({ fullPage: false });
			await allure.attachment('password fill field screenshot', showPasswordScreenshot, 'image/png');
		});
	});
});