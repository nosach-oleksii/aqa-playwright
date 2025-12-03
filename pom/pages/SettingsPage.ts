import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class SettingsPage extends BasePage {
    private readonly _pageTitle: Locator;

    private readonly _currencySection: Locator;
    private readonly _currencyButtons: Locator;

    private readonly _distanceSection: Locator;
    private readonly _distanceButtons: Locator;

    private readonly _changeEmailSection: Locator;
    private readonly _emailInput: Locator;
    private readonly _emailPasswordInput: Locator;
    private readonly _changeEmailButton: Locator;

    private readonly _oldPasswordInput: Locator;
    private readonly _newPasswordInput: Locator;
    private readonly _repeatPasswordInput: Locator;
    private readonly _changePasswordButton: Locator;

    private readonly _removeAccountButton: Locator;

    // =========================================================================

    private readonly _container: Locator;
    private readonly _title: Locator;
    private readonly _closeButton: Locator;
    private readonly _confirmationText: Locator;
    private readonly _warningText: Locator;
    private readonly _cancelButton: Locator;
    private readonly _removeButton: Locator;

    constructor(page: Page) {
        super(page);

        // Заголовки
        this._pageTitle = page.locator("h1", { hasText: "Settings" });
        this._currencySection = page.locator("h2", { hasText: "Currency" });
        this._distanceSection = page.locator("h2", { hasText: "Units of distance" });
        this._changeEmailSection = page.locator("h2", { hasText: "Change email" });

        // Валюта
        this._currencyButtons = page.locator('.user-settings_item:has(h2:has-text("Currency")) .settings-control');

        // Одиниці відстані
        this._distanceButtons = page.locator('.user-settings_item:has(h2:has-text("Units of distance")) .settings-control');

        // Зміна email
        this._emailInput = page.locator("#emailChangeEmail");
        this._emailPasswordInput = page.locator("#emailChangePassword");
        this._changeEmailButton = page.locator("button.btn-info-bg", { hasText: "Change email" });

        // Зміна пароля
        this._oldPasswordInput = page.locator("#passwordChangeOldPassword");
        this._newPasswordInput = page.locator("#passwordChangePassword");
        this._repeatPasswordInput = page.locator("#passwordChangeRepeatPassword");
        this._changePasswordButton = page.locator("button.btn-warning-bg", { hasText: "Change password" });

        // Видалення акаунта
        this._removeAccountButton = page.locator("button.btn-danger-bg", { hasText: "Remove my account" });

        // =========================================================================

        this._container = this.page.locator("div.modal-content");
        this._title = this._container.locator(".modal-title");
        this._closeButton = this._container.getByRole("button", { name: "Close" });
        this._confirmationText = this._container.locator(".modal-body p").first();
        this._warningText = this._container.locator(".modal-body .text-danger");
        this._cancelButton = this._container.getByRole("button", { name: "Cancel" });
        this._removeButton = this._container.getByRole("button", { name: "Remove" });
    }

    async open(): Promise<void> {
        await this.page.goto("/panel/settings");
    }

    async verifySettingsPageVisible(): Promise<void> {
        await expect(this._pageTitle).toBeVisible();
    }

    async changeCurrency(to: string): Promise<void> {
        await this._currencyButtons.filter({ hasText: to }).click();
    }

    async changeDistanceUnit(to: string): Promise<void> {
        await this._distanceButtons.filter({ hasText: to }).click();
    }

    async updateEmail(newEmail: string, password: string): Promise<void> {
        await this._emailInput.fill(newEmail);
        await this._emailPasswordInput.fill(password);
        await this._changeEmailButton.click();
    }

    async updatePassword(oldPass: string, newPass: string): Promise<void> {
        await this._oldPasswordInput.fill(oldPass);
        await this._newPasswordInput.fill(newPass);
        await this._repeatPasswordInput.fill(newPass);
        await this._changePasswordButton.click();
    }

    async removeAccount(): Promise<void> {
        await this._removeAccountButton.click();
    }

    // =========================================================================

    async isVisible(): Promise<boolean> {
        return await this._container.isVisible();
    }

    async clickClose(): Promise<void> {
        await this._closeButton.click();
    }

    async clickCancel(): Promise<void> {
        await this._cancelButton.click();
    }

    async clickRemove(): Promise<void> {
        await this._removeButton.click();
    }

    async getConfirmationText(): Promise<string> {
        return (await this._confirmationText.textContent()) ?? "";
    }

    async getWarningText(): Promise<string> {
        return (await this._warningText.textContent()) ?? "";
    }
}
