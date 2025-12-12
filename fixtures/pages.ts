import { test as base } from "@playwright/test";

import { HomePage } from "../pom/pages/HomePage";
import { GaragePage } from "../pom/pages/GaragePage";
import { SettingsPage } from "../pom/pages/SettingsPage";
import { Sidebar } from "../pom/pages/Sidebar";

export interface Pages {
    homePage: HomePage;
    sidebar: Sidebar;
    garagePage: GaragePage;
    settingsPage: SettingsPage;
}

export const pagesFixture = base.extend<{ pages: Pages }>({
    pages: async ({ page }, use) => {
        const pages = {
            homePage: new HomePage(page),
            sidebar: new Sidebar(page),
            garagePage: new GaragePage(page),
            settingsPage: new SettingsPage(page),
        };

        await use(pages);
    },
});
