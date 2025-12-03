import { chromium } from "@playwright/test";
import path from "path";
import { userList } from "../test-data/users";

const storagePath = path.join(__dirname, "../storage/user.json");

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(process.env.BASE_URL + "/");
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.getByPlaceholder("Email").fill(userList.mainUser.email);
    await page.getByPlaceholder("Password").fill(userList.mainUser.password);
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("**/garage");

    await page.context().storageState({ path: storagePath });

    await browser.close();
}

export default globalSetup;
