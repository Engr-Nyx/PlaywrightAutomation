import { Page, Locator, expect } from '@playwright/test';
import { HeaderNavigationBar } from '../components/header.page';
const { allure } = require('allure-playwright');

export class SignUpPage extends HeaderNavigationBar {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpSubmitButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
    this.signUpSubmitButton = page.getByRole('button', { name: 'Sign up' }); 
    this.closeButton = page.getByLabel('Sign up').getByText('Close');
  }

  async clickUsernameInput(){
		await allure.step('Click username input', async () => {
      await this.usernameInput.click();
    });
	}

	async clickPasswordInput(){
		await allure.step('Click password input', async () => {
      await this.passwordInput.click();
    });
	}

	async clickCloseButton(){
		await allure.step('Click close input', async () => {
      await this.closeButton.click();
    });
	}

	async clickSignUpButton(){
		await allure.step('Click sign up input', async () => {
      await this.signUpSubmitButton.click();
    });
	}

  async signUp(username: string, password: string) {
    await allure.step('Perform sign', async () => {
      await this.fillSignUpForm(username, password);
      await this.signUpSubmitButton.click();
    });
  }

  async fillSignUpForm(username: string, password: string) {
    await allure.step('Input sign up credentials', async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
    });
  }

  async verifySignUpFormVisible() {
    await allure.step('Verify sign up form elements are visible', async () => {
      await expect(this.usernameInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
      await expect(this.signUpSubmitButton).toBeVisible();
    });
  }
}