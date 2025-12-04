import { test, expect } from "../fixtures/addCar.ts";

test.describe("Add car to Garage", () => {
    test.use({ storageState: "test-data/states/storageState.json" });
    test("Add car", async ({ userGarage }) => {
        await userGarage.clickAddCarButton();
        const isFormVisible = await userGarage.formIsVisible();
        test.expect(isFormVisible).toBeTruthy();
        await userGarage.selectBrand("Porsche");
        await userGarage.selectModel("Panamera");
        await userGarage.enterMileage(10000);
        await userGarage.clickAddButton();
    });
});
