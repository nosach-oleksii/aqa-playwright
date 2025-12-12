import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GaragePage extends BasePage {
    private readonly _garageTitle: Locator;
    private readonly _addCarButton: Locator;

    private readonly _modalTitle: Locator;
    private readonly _closeButton: Locator;
    private readonly _brandSelect: Locator;
    private readonly _modelSelect: Locator;
    private readonly _mileageInput: Locator;
    private readonly _addButton: Locator;
    private readonly _cancelButton: Locator;

    constructor(page: Page) {
        super(page);
        this._garageTitle = this.page.locator("h1", { hasText: "Garage" });
        this._addCarButton = this.page.locator("button.btn-primary", { hasText: "Add car" });

        this._modalTitle = page.locator(".modal-title", { hasText: "Add a car" });
        this._closeButton = page.locator('button[aria-label="Close"]');
        this._brandSelect = page.locator("#addCarBrand");
        this._modelSelect = page.locator("#addCarModel");
        this._mileageInput = page.locator("#addCarMileage");
        this._addButton = page.getByRole("button", { name: "Add", exact: true });
        this._cancelButton = page.locator("button.btn-secondary", { hasText: "Cancel" });
    }
    async open(): Promise<void> {
        await this.page.goto("/panel/garage");
    }
    async verifyGaragePage(): Promise<void> {
        await expect(this._garageTitle).toBeVisible();
    }
    async clickAddCarButton(): Promise<void> {
        await this._addCarButton.click();
    }
    async formIsVisible(): Promise<boolean> {
        return await this._modalTitle.isVisible();
    }
    async closeModal() {
        await this._closeButton.click();
    }
    async selectBrand(brand: string) {
        await this._brandSelect.selectOption({ label: brand });
    }
    async selectModel(model: string) {
        await this._modelSelect.selectOption({ label: model });
    }
    async enterMileage(mileage: string | number) {
        await this._mileageInput.fill(mileage.toString());
    }
    async clickAddButton() {
        await this._addButton.click();
    }
    async clickCancelButton() {
        await this._cancelButton.click();
    }
}
