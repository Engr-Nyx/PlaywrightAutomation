import { test } from '../../fixtures/base.fixtures';
import { TestData } from '../../utils/user-data.utils';
const { allure } = require('allure-playwright');

test.describe('Validate Authentication functionality', () => {

	test.beforeEach(async ({ loginPage }) => {	
		await loginPage.navigateToDashboard();
	});

	test('TS_001 - Validate the Sign-up functionality', async ({signUpPage }) => {

		await signUpPage.clickHeaderSignUpButton();
		await signUpPage.verifySignUpFormVisible();
    
		await allure.step('Verify sign up fields are clickable', async () => {
			await signUpPage.clickUsernameInput();
			await signUpPage.clickPasswordInput();
		});

		await allure.step('Verify close is clickable', async () => {
			await signUpPage.clickCloseButton();
		});

		await signUpPage.clickHeaderSignUpButton();

		await allure.step('Verify sign up fields are fillable', async () => {
			await signUpPage.fillSignUpForm(TestData.username, TestData.password);
		});

		await allure.step('Sign up', async () => {
			await signUpPage.signUp(TestData.username, TestData.password);
		});
	});

	test('TS_002 - Validate the Login functionality', async ({ loginPage }) => {

		await loginPage.clickHeaderLoginButton();
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
			await loginPage.fillLoginForm('Ludie8', 'Test@1xSBwZio!');
		});

		await allure.step('Take screenshot after filling login fields', async () => {
			await loginPage.login('Ludie8', 'Test@1xSBwZio!');
		});

		await allure.step('Take screenshot after filling login fields', async () => {
			await loginPage.login('Ludie8', 'Test@1xSBwZio!');
		});

		// await loginPage.verifyUserHasLoggedIn('Ludie8');

	});

	test.afterEach(async({page})=>{
		await page.reload();
	});

});