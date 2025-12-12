import { test, expect, Locator } from "@playwright/test";
import { userList } from "../test-data/users";
import { HomePage } from "../pom/pages/HomePage";
import { SettingsPage } from "../pom/pages/SettingsPage";
import { Sidebar } from "../pom/pages/Sidebar";

let homePage: HomePage;
let sidebar: Sidebar;
let settingsPage: SettingsPage;

test.describe("Delete user", () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        sidebar = new Sidebar(page);
        settingsPage = new SettingsPage(page);
    });
    test("login and delete User", async ({ page }) => {
        await homePage.open("/");
        await homePage.openLogInForm();
        await homePage.enterEmailLogin(userList.mainUser.email);
        await homePage.enterPasswordLogin(userList.mainUser.password);
        await homePage.clickLogInButton();
        await sidebar.verifySidebarVisible();
        await sidebar.clickSettingsButton();
        await settingsPage.isVisible();
        await settingsPage.removeAccount();
        await settingsPage.clickRemove();
    });
});
