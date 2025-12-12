import { pagesFixture as test } from "../fixtures/pages.ts";
import { userList } from "../test-data/users.ts";

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
