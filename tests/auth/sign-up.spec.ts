import { test } from '../../fixtures/base.fixtures';
import { TestData } from '../../utils/user-data.utils';
const { allure } = require('allure-playwright');

test.describe('TS_001 - Validate the Sign-up functionality', () => {
  
	test.beforeEach('Before Test', async ({ page, signUpPage}) => {	
		await signUpPage.navigateToDashboard();
    await signUpPage.clickHeaderSignUpButton();
	});

	test('Validate the Sign-up functionality', async ({page, signUpPage }) => {
		const username = TestData.username;
		const password = TestData.password;
		
		await signUpPage.verifySignUpFormVisible();
    
		await allure.step('Verify sign up fields are clickable', async () => {
			await signUpPage.clickUsernameInput();
			await signUpPage.clickPasswordInput();
		});

		await allure.step('Verify close is clickable', async () => {
			await signUpPage.clickCloseButton();
		});

		await signUpPage.clickHeaderLoginButton();

		await allure.step('Verify sign up fields are fillable', async () => {
			await signUpPage.fillSignUpForm(username, password);
			const fillScreenshot = await page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', fillScreenshot, 'image/png');
		});

		await allure.step('Sign up', async () => {
			await signUpPage.signUp(username, password);
			const signUpFillSreenshot = await page.screenshot({ fullPage: false });
			await allure.attachment('password fill field screenshot', signUpFillSreenshot, 'image/png');
		});
	});
});