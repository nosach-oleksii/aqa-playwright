import { pagesFixture as test } from "../fixtures/pages.ts";

test.describe("Delete User", () => {
    test.use({ storageState: "test-data/states/storageState.json" });
    test("Delete User", async ({ pages }) => {
        await pages.homePage.open("/");
        await pages.sidebar.verifySidebarVisible();
        await pages.sidebar.clickSettingsButton();
        await pages.settingsPage.isVisible();
        await pages.settingsPage.removeAccount();
        await pages.settingsPage.clickRemove();
    });
});
