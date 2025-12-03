import { pagesFixture } from "../fixtures/pages.ts";
import { test, expect } from "@playwright/test";

test.describe("Login and Delete user", () => {
    test("Login User", async ({ page, pages }) => {
        await pages.homePage.open("/");
        await pages.homePage.openLogInForm();
        await pages.homePage.enterEmailLogin(userList.mainUser.email);
        await pages.homePage.enterPasswordLogin(userList.mainUser.password);
        await pages.homePage.clickLogInButton();
        await page.waitForFunction(() => document.cookie.includes("sid="));
        await page.context().storageState({ path: "test-data/states/storageState.json" });
    });
});

test.describe("Delete User", () => {
    test.use({ storageState: "test-data/states/storageState.json" });
    test("Delete User", async ({ page, pages: Pages }) => {
        await pages.homePage.open("/");
        await pages.sidebar.verifySidebarVisible();
        await pages.sidebar.clickSettingsButton();
        await pages.settingsPage.isVisible();
        await pages.settingsPage.removeAccount();
        await pages.settingsPage.clickRemove();
    });
});
