import { test as base } from "@playwright/test";
import { GaragePage } from "../pom/pages/GaragePage";
import path from "path";
import fs from "fs";

export const test = base.extend<{
    authPage: import("@playwright/test").Page;
    userGarage: GaragePage;
}>({
    authPage: async ({ browser }, use) => {
        const statePath = path.resolve("test-data/states/storageState.json");
        fs.mkdirSync(path.dirname(statePath), { recursive: true });

        const context = await browser.newContext({ storageState: statePath });
        const page = await context.newPage();

        await use(page);

        await context.close();
    },
    userGarage: async ({ authPage }, use) => {
        const garagePage = new GaragePage(authPage);
        await garagePage.open();
        await garagePage.verifyGaragePage();
        await use(garagePage);
    },
});

export { expect } from "@playwright/test";
