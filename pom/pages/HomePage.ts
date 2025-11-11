import { test, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    private readonly _signUpButton: Locator;
    private readonly _registrationForm: Locator;
    private readonly _closeButton: Locator;
    private readonly _nameField: Locator;
    private readonly _lastNameField: Locator;
    private readonly _emailField: Locator;
    private readonly _passwordField: Locator;
    private readonly _repeatPasswordField: Locator;
    private readonly _registrationButton: Locator;

    constructor(page: Page) {
        super(page);
        this._signUpButton = this.page.getByRole("button", { name: "Sign Up" });
        this._registrationForm = this.page.locator("div.modal-content");
        this._nameField = this._registrationForm.locator("#signupName");
        this._lastNameField = this._registrationForm.locator("#signupLastName");
        this._emailField = this._registrationForm.locator("#signupEmail");
        this._passwordField = this._registrationForm.locator("#signupPassword");
        this._repeatPasswordField = this._registrationForm.locator("#signupRepeatPassword");
        this._registrationButton = this._registrationForm.getByRole("button", { name: "Register" });
        this._closeButton = this._registrationForm.getByRole("button", { name: "Close" });
    }
    async open(pageUrl: string) {
        await this.page.goto(pageUrl);
    }
    async clickSignUpButton() {
        await this._signUpButton.click();
    }
    async enterName(name: string) {
        await this._nameField.fill(name);
        await this.nameField.blur();
    }
    async enterLastName(lastName: string) {
        await this._lastNameField.fill(lastName);
        await this.lastNameField.blur();
    }
    async enterEmail(email: string) {
        await this._emailField.fill(email);
        await this.emailField.blur();
    }
    async enterPassword(password: string) {
        await this._passwordField.fill(password);
        await this.passwordField.blur();
    }
    async enterRepeatPassword(repeatPassword: string) {
        await this._repeatPasswordField.fill(repeatPassword);
        await this.repeatPasswordField.blur();
    }
    async clickRegisterButton() {
        await this._registrationButton.click();
    }
    async clickCloseButton() {
        await this._closeButton.click();
    }

    get registrationForm() {
        return this._registrationForm;
    }

    get closeButton() {
        return this._closeButton;
    }

    get nameField() {
        return this._nameField;
    }

    get lastNameField() {
        return this._lastNameField;
    }

    get emailField() {
        return this._emailField;
    }

    get passwordField() {
        return this._passwordField;
    }

    get repeatPasswordField() {
        return this._repeatPasswordField;
    }

    get registrationButton() {
        return this._registrationButton;
    }
}
