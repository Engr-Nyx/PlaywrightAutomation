import { test } from '../../fixtures/base.fixtures';
import { TestData } from '../../utils/user-data.utils';
const { allure } = require('allure-playwright');

test.describe('TS_002 - Validate the Login functionality', () => {

	test.beforeEach('Before Test', async ({ page, loginPage }) => {	
		await loginPage.navigateToDashboard();
		await loginPage.clickHeaderLoginButton();
	});

	test('Validate the Login functionality', async ({ page, loginPage }) => {
		const username = TestData.username;
		const password = TestData.password;

		await loginPage.verifyLoginFormVisible();

		await allure.step('Verify login fields are clickable', async () => {
			await loginPage.clickUsernameInput();
			await loginPage.clickPasswordInput();
		});

		await allure.step('Verify close is clickable', async () => {
			await loginPage.clickCloseButton();
		});

		await loginPage.clickHeaderLoginButton();

		await allure.step('Verify login fields are fillable', async () => {
			await loginPage.fillLoginForm("","");
			const fillScreenshot = await page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', fillScreenshot, 'image/png');
		});

		await allure.step('Take screenshot after filling login fields', async () => {
			await loginPage.login("","Testing@123");
			const loginFillSreenshot = await page.screenshot({ fullPage: false });
			await allure.attachment('password fill field screenshot', loginFillSreenshot, 'image/png');
		});
	});
});