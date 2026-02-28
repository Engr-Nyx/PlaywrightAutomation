import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/login.page';
import { SignUpPage } from '../pages/auth/sign-up.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';

type fixtures = {
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from '@playwright/test';