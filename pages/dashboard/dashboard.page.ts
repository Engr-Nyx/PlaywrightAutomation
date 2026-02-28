import { Browser, Page } from "@playwright/test";
import { baseURL } from "../../utils/constants.utils";
import {BasePage} from "../../pages/base/base.page";
const {allure} = require('allure-playwright');

export class DashboardPage extends BasePage {

  constructor(page: Page, browser: Browser) {
    super(page, browser);
  }

  async navigateToDashboard(): Promise<void> {
    this.navigate(baseURL);
    await allure.step('Take screenshot after loading dashboard page', async () => {
			const screenshot = await this.page.screenshot({ fullPage: false });
			await allure.attachment('Dashboard page screenshot', screenshot, 'image/png');
		});
  }
}