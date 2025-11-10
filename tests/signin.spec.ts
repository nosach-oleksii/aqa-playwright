import { test, expect, Locator } from "@playwright/test";
import { userList } from "../test-data/users";

let registrationForm: Locator;
let closeButton: Locator;
let nameField: Locator;
let lastNameField: Locator;
let emailField: Locator;
let passwordField: Locator;
let repeatPasswordField: Locator;
let registrationButton: Locator;

test.describe("Sign up test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Hillel Qauto");

    const signUpButton = page.locator(
      '//button[contains(@class,"btn-primary")]'
    );
    await signUpButton.click();

    registrationForm = page.locator("div.modal-content");
    nameField = registrationForm.locator("#signupName");
    lastNameField = registrationForm.locator("#signupLastName");
    emailField = registrationForm.locator("#signupEmail");
    passwordField = registrationForm.locator("#signupPassword");
    repeatPasswordField = registrationForm.locator("#signupRepeatPassword");
    registrationButton = registrationForm.getByRole("button", {
      name: "Register",
    });
    closeButton = registrationForm.getByRole("button", { name: "Close" });

    await expect(registrationForm).toBeVisible();
  });

  test("Check registration form elements and labels", async () => {
    await expect(closeButton).toBeVisible();
    await expect(registrationForm.getByLabel("Name")).toBeVisible();
    await expect(nameField).toBeVisible();
    await expect(registrationForm.getByLabel("Last name")).toBeVisible();
    await expect(lastNameField).toBeVisible();
    await expect(registrationForm.getByLabel("Email")).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(
      registrationForm.locator('label[for="signupPassword"]')
    ).toHaveText("Password");
    await expect(passwordField).toBeVisible();
    await expect(
      registrationForm.locator('label[for="signupRepeatPassword"]')
    ).toHaveText("Re-enter password");
    await expect(repeatPasswordField).toBeVisible();
    await expect(registrationButton).toBeDisabled();
  });

  test.describe("Name field", () => {
    test("Valid name", async () => {
      await nameField.fill("Oleksii");
      await nameField.blur();
      await expect(nameField).not.toHaveClass(/is-invalid/);
      await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(
        0
      );
    });

    test("Empty field: 'Name required'", async () => {
      await nameField.fill("");
      await nameField.blur();
      await expect(registrationForm.getByText("Name required")).toBeVisible();
      await expect(nameField).toHaveClass(/is-invalid/);
    });

    test("Less than 2 characters: length error", async () => {
      await nameField.fill("A");
      await nameField.blur();
      await expect(
        registrationForm.getByText(
          "Name has to be from 2 to 20 characters long"
        )
      ).toBeVisible();
      await expect(nameField).toHaveClass(/is-invalid/);
    });

    test("More than 20 characters: length error", async () => {
      await nameField.fill("ABCDEFGHIJKLMNOPQRSTU");
      await nameField.blur();
      await expect(
        registrationForm.getByText(
          "Name has to be from 2 to 20 characters long"
        )
      ).toBeVisible();
      await expect(nameField).toHaveClass(/is-invalid/);
    });

    test("Non-English characters: 'Name is invalid'", async () => {
      await nameField.fill("Олексій");
      await nameField.blur();
      await expect(registrationForm.getByText("Name is invalid")).toBeVisible();
      await expect(nameField).toHaveClass(/is-invalid/);
    });
  });

  test.describe("Last name field", () => {
    test("Valid last name", async () => {
      await lastNameField.fill("Nosach");
      await lastNameField.blur();
      await expect(lastNameField).not.toHaveClass(/is-invalid/);
      await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(
        0
      );
    });

    test("Empty field: 'Last name required'", async () => {
      await lastNameField.fill("");
      await lastNameField.blur();
      await expect(
        registrationForm.getByText("Last name required")
      ).toBeVisible();
      await expect(lastNameField).toHaveClass(/is-invalid/);
    });

    test("Less than 2 characters: length error", async () => {
      await lastNameField.fill("N");
      await lastNameField.blur();
      await expect(
        registrationForm.getByText(
          "Last name has to be from 2 to 20 characters long"
        )
      ).toBeVisible();
      await expect(lastNameField).toHaveClass(/is-invalid/);
    });

    test("More than 20 characters: length error", async () => {
      await lastNameField.fill("ABCDEFGHIJKLMNOPQRSTU");
      await lastNameField.blur();
      await expect(
        registrationForm.getByText(
          "Last name has to be from 2 to 20 characters long"
        )
      ).toBeVisible();
      await expect(lastNameField).toHaveClass(/is-invalid/);
    });

    test("Non-English characters: 'Last name is invalid'", async () => {
      await lastNameField.fill("Носач");
      await lastNameField.blur();
      await expect(
        registrationForm.getByText("Last name is invalid")
      ).toBeVisible();
      await expect(lastNameField).toHaveClass(/is-invalid/);
    });
  });

  test.describe("Email field", () => {
    test("Valid email: no errors", async () => {
      await emailField.fill("test@example.com");
      await emailField.blur();
      await expect(emailField).not.toHaveClass(/is-invalid/);
      await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(
        0
      );
    });

    test("Empty field: 'Email required'", async () => {
      await emailField.fill("");
      await emailField.blur();
      await expect(registrationForm.getByText("Email required")).toBeVisible();
      await expect(emailField).toHaveClass(/is-invalid/);
    });

    test("Invalid format: 'Email is incorrect'", async () => {
      const invalidEmails = ["test", "test@", "@test.com", "test@com"];
      for (const email of invalidEmails) {
        await emailField.fill(email);
        await emailField.blur();
        await expect(
          registrationForm.getByText("Email is incorrect")
        ).toBeVisible();
        await expect(emailField).toHaveClass(/is-invalid/);
      }
    });
  });

  test.describe("Password field", () => {
    test("Valid passwords: no errors", async () => {
      const validPasswords = [
        "Abcdefg1",
        "MyPass123",
        "Password1",
        "Test1234",
        "A1b2C3d4",
      ];
      for (const pwd of validPasswords) {
        await passwordField.fill(pwd);
        await passwordField.blur();
        await expect(passwordField).not.toHaveClass(/is-invalid/);
        await passwordField.fill("");
      }
    });

    test("Empty field: 'Password required'", async () => {
      await passwordField.fill("");
      await passwordField.blur();
      await expect(
        registrationForm.getByText("Password required")
      ).toBeVisible();
      await expect(passwordField).toHaveClass(/is-invalid/);
    });

    test("Invalid formats (too short, missing rules)", async () => {
      const invalidPasswords = [
        "Short1",
        "NoNumber",
        "NOLOWERCASE1",
        "nouppercase1",
      ];
      for (const pwd of invalidPasswords) {
        await passwordField.fill(pwd);
        await passwordField.blur();
        await expect(
          registrationForm.getByText(
            "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
          )
        ).toBeVisible();
        await expect(passwordField).toHaveClass(/is-invalid/);
      }
    });

    test("More than 15 characters: length error", async () => {
      await passwordField.fill("VeryLongPassword1");
      await passwordField.blur();
      await expect(
        registrationForm.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        )
      ).toBeVisible();
      await expect(passwordField).toHaveClass(/is-invalid/);
    });
  });

  test.describe("Repeat password field", () => {
    test("Valid re-entered password: no errors", async () => {
      await passwordField.fill("MyPass123");
      await repeatPasswordField.fill("MyPass123");
      await repeatPasswordField.blur();
      await expect(repeatPasswordField).not.toHaveClass(/is-invalid/);
    });

    test("Empty field: 'Re-enter password required'", async () => {
      await repeatPasswordField.fill("");
      await repeatPasswordField.blur();
      await expect(
        registrationForm.getByText("Re-enter password required")
      ).toBeVisible();
      await expect(repeatPasswordField).toHaveClass(/is-invalid/);
    });

    test("Non-matching passwords: 'Passwords do not match'", async () => {
      await passwordField.fill("MyPass123");
      await repeatPasswordField.fill("Different123");
      await repeatPasswordField.blur();
      await expect(
        registrationForm.getByText("Passwords do not match")
      ).toBeVisible();
      await expect(repeatPasswordField).toHaveClass(/is-invalid/);
    });
  });

  test.describe("Successful registration", () => {
    test("Successful sign up", async ({ page }) => {
      await nameField.fill(userList.mainUser.name);
      await lastNameField.fill(userList.mainUser.lastName);
      await emailField.fill(userList.mainUser.email);
      await passwordField.fill(userList.mainUser.password);
      await repeatPasswordField.fill(userList.mainUser.password);
      await registrationButton.click();

      await expect(registrationForm).toBeHidden();
      await expect(page.locator("h1")).toHaveText("Garage");
    });
  });

  test.afterEach(async () => {
    if (await registrationForm.isVisible()) {
      await closeButton.click();
      await expect(registrationForm).toBeHidden();
    }
  });
});
