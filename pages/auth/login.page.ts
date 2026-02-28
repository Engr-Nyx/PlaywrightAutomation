import { Page, Locator, expect } from '@playwright/test';
import { HeaderNavigationBar } from '../components/header.page';
const { allure } = require('allure-playwright');

export class LoginPage extends HeaderNavigationBar {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.closeButton = page.getByLabel('Log in').getByText('Close');
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

  async isCloseButtonVisible(){
    if(await this.closeButton.isVisible()) return true;
    else return false;
  }
	async clickCloseButton(){
		await allure.step('Click close input', async () => {
      await this.closeButton.click();
      const screenshot = await this.page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', screenshot, 'image/png');
    });
	}

	async clickLoginButton(){
		await allure.step('Click login input', async () => {
      await this.loginButton.click();
    });
	}

  async login(username: string, password: string) {
    await allure.step('Perform login', async () => {
      await this.fillLoginForm(username, password);
      await this.loginButton.click();
      const screenshot = await this.page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', screenshot, 'image/png');
    });
  }

  async verifyLoginFormVisible() {
    await allure.step('Verify login form elements are visible', async () => {
      await expect(this.usernameInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
      await expect(this.loginButton).toBeVisible();
    });
  }

	async fillLoginForm(username: string, password: string) {
    await allure.step('Input login credentials', async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      const screenshot = await this.page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', screenshot, 'image/png');
    });
  }
}