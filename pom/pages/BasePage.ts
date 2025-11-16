import { Page, expect } from "@playwright/test";

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(uri: string) {
        await this.page.goto(uri);
        await expect(this.page).toHaveTitle("Hillel Qauto");
    }
}
