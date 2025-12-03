import { test, expect, Locator } from "@playwright/test";
import { userList } from "../test-data/users";
import { HomePage } from "../pom/pages/HomePage";

let homePage: HomePage;
test.describe("Sign up test", () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open("/");
        await expect(page).toHaveTitle("Hillel Qauto");
        await homePage.clickSignUpButton();
        await expect(homePage.registrationForm).toBeVisible();
    });

    test("Check registration form elements and labels", async () => {
        await expect(homePage.closeButton).toBeVisible();
        await expect(homePage.registrationForm.getByLabel("Name")).toBeVisible();
        await expect(homePage.nameField).toBeVisible();
        await expect(homePage.registrationForm.getByLabel("Last name")).toBeVisible();
        await expect(homePage.lastNameField).toBeVisible();
        await expect(homePage.registrationForm.getByLabel("Email")).toBeVisible();
        await expect(homePage.emailField).toBeVisible();
        await expect(homePage.registrationForm.locator('label[for="signupPassword"]')).toHaveText("Password");
        await expect(homePage.passwordField).toBeVisible();
        await expect(homePage.registrationForm.locator('label[for="signupRepeatPassword"]')).toHaveText("Re-enter password");
        await expect(homePage.repeatPasswordField).toBeVisible();
        await expect(homePage.registrationButton).toBeDisabled();
    });

    test.describe("Name field", () => {
        test("Valid name", async () => {
            await homePage.enterName("Oleksii");
            await expect(homePage.nameField).not.toHaveClass(/is-invalid/);
            await expect(homePage.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field: 'Name required'", async () => {
            await homePage.enterName("");
            await expect(homePage.registrationForm.getByText("Name required")).toBeVisible();
            await expect(homePage.nameField.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Less than 2 characters: length error", async () => {
            await homePage.enterName("O");
            await expect(homePage.registrationForm.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(homePage.nameField).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("More than 20 characters: length error", async () => {
            await homePage.enterName("ABCDEFGHIJKLMNOPQRSTU");
            await expect(homePage.registrationForm.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(homePage.nameField).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("Non-English characters: 'Name is invalid'", async () => {
            await homePage.enterName("Олексій");
            await expect(homePage.registrationForm.getByText("Name is invalid")).toBeVisible();
            await expect(homePage.nameField).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });
    });

    test.describe("Last name field", () => {
        test("Valid last name", async () => {
            await homePage.enterLastName("Nosach");
            await expect(homePage.lastNameField).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(homePage.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field: 'Last name required'", async () => {
            await homePage.enterLastName("");
            await expect(homePage.registrationForm.getByText("Last name required")).toBeVisible();
            await expect(homePage.lastNameField).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Less than 2 characters: length error", async () => {
            await homePage.enterLastName("N");
            await expect(homePage.registrationForm.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(homePage.lastNameField).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("More than 20 characters: length error", async () => {
            await homePage.enterLastName("ABCDEFGHIJKLMNOPQRSTU");
            await expect(homePage.registrationForm.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(homePage.lastNameField).toHaveClass(/is-invalid/);
        });

        test("Non-English characters: 'Last name is invalid'", async () => {
            await homePage.enterLastName("Носач");
            await expect(homePage.registrationForm.getByText("Last name is invalid")).toBeVisible();
            await expect(homePage.lastNameField).toHaveClass(/is-invalid/);
        });
    });

    test.describe("Email field", () => {
        test("Valid email: no errors", async () => {
            await homePage.enterEmail("test@example.com");
            await expect(homePage.emailField).not.toHaveClass(/is-invalid/);
            await expect(homePage.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field: 'Email required'", async () => {
            await homePage.enterEmail("");
            await expect(homePage.registrationForm.getByText("Email required")).toBeVisible();
            await expect(homePage.emailField).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Invalid format: 'Email is incorrect'", async () => {
            const invalidEmails = ["test", "test@", "@test.com", "test@com"];
            for (const email of invalidEmails) {
                await homePage.enterEmail(email);
                await expect(homePage.registrationForm.getByText("Email is incorrect")).toBeVisible();
                await expect(homePage.emailField).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
            }
        });
    });

    test.describe("Password field", () => {
        test("Valid passwords: no errors", async () => {
            const validPasswords = ["Abcdefg1", "MyPass123", "Password1", "Test1234", "A1b2C3d4"];
            for (const pwd of validPasswords) {
                await homePage.enterPassword(pwd);
                await expect(homePage.passwordField).not.toHaveClass(/is-invalid/);
                await homePage.passwordField.fill("");
            }
        });

        test("Empty field: 'Password required'", async () => {
            await homePage.enterPassword("");
            await expect(homePage.registrationForm.getByText("Password required")).toBeVisible();
            await expect(homePage.passwordField).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Invalid formats (too short, missing rules)", async () => {
            const invalidPasswords = ["Short1", "NoNumber", "NOLOWERCASE1", "nouppercase1"];
            for (const pwd of invalidPasswords) {
                await homePage.enterPassword(pwd);
                await expect(homePage.registrationForm.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
                await expect(homePage.passwordField).toHaveClass(/is-invalid/);
            }
        });

        test("More than 15 characters: length error", async () => {
            await homePage.enterPassword("VeryLongPassword1");
            await expect(homePage.registrationForm.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
            await expect(homePage.passwordField).toHaveClass(/is-invalid/);
        });
    });

    test.describe("Repeat password field", () => {
        test("Valid re-entered password: no errors", async () => {
            await homePage.enterPassword("MyPass123");
            await homePage.enterRepeatPassword("MyPass123");
            await expect(homePage.repeatPasswordField).not.toHaveClass(/is-invalid/);
            await expect(homePage.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field: 'Re-enter password required'", async () => {
            await homePage.enterRepeatPassword("");
            await expect(homePage.registrationForm.getByText("Re-enter password required")).toBeVisible();
            await expect(homePage.repeatPasswordField).toHaveClass(/is-invalid/);
        });

        test("Non-matching passwords: 'Passwords do not match'", async () => {
            await homePage.enterPassword("MyPass123");
            await homePage.enterRepeatPassword("Different123");
            await expect(homePage.registrationForm.getByText("Passwords do not match")).toBeVisible();
            await expect(homePage.repeatPasswordField).toHaveClass(/is-invalid/);
        });
    });

    test.describe("Successful registration", () => {
        test("Successful sign up", async ({ page }) => {
            await homePage.nameField.fill(userList.mainUser.name);
            await homePage.lastNameField.fill(userList.mainUser.lastName);
            await homePage.emailField.fill(userList.mainUser.email);
            await homePage.passwordField.fill(userList.mainUser.password);
            await homePage.repeatPasswordField.fill(userList.mainUser.password);
            await page.waitForTimeout(1000);
            await homePage.registrationButton.click();

            await page.waitForTimeout(1000);
            await expect(homePage.registrationForm).toBeHidden();
            await expect(page.locator("h1")).toHaveText("Garage");
        });
    });

    test.afterEach(async () => {
        if (await homePage.registrationForm.isVisible()) {
            await homePage.closeButton.click();
            await expect(homePage.registrationForm).toBeHidden();
        }
    });
});
