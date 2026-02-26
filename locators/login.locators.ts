
import { Page, Locator } from '@playwright/test';

export class LoginLocators {
    userInput: string[] = [
        '#login',
        'button:has-text("Login")',
        '//button[text()="Login"]'
    ];

    passwordInput: string[] = [

    ];

    loginButton: string[] = [

    ]

}