// import { defineConfig, devices } from "@playwright/test";
// import { fileURLToPath } from "url";
// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Функція для ізольованого читання .env.<name>
// function loadEnv(name: string) {
//     const envPath = path.resolve(__dirname, `.env.${name}`);
//     const raw = fs.readFileSync(envPath, "utf-8");
//     const env = dotenv.parse(raw);
//     return {
//         baseURL: env.BASE_URL,
//         httpCredentials: {
//             username: env.USER_NAME!,
//             password: env.USER_PASSWORD!,
//         },
//         trace: "on-first-retry" as const,
//     };
// }
// const env = process.env.ENV || "prod";
// let config;
// const envConfig = loadEnv(env);

// config = defineConfig({
//     testDir: "./tests/",
//     /* Run tests in files in parallel */
//     fullyParallel: false,
//     /* Fail the build on CI if you accidentally left test.only in the source code. */
//     forbidOnly: !!process.env.CI,
//     /* Retry on CI only */
//     retries: process.env.CI ? 2 : 0,
//     /* Opt out of parallel tests on CI. */
//     workers: process.env.CI ? 1 : undefined,
//     /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//     reporter: "html",
//     /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//     // use: {
//     //     /* Base URL to use in actions like `await page.goto('')`. */
//     //     // baseURL: 'http://localhost:3000',

//     //     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     //     baseURL: process.env.BASE_URL,
//     //     httpCredentials: {
//     //         username: process.env.USER_NAME!,
//     //         password: process.env.USER_PASSWORD!,
//     //     },
//     //     trace: "on-first-retry",
//     // },

//     /* Configure projects for major browsers */
//     use: {
//         ...envConfig,
//     },
//     projects: [
//         {
//             name: "chromium",
//             use: { ...devices["Desktop Chrome"] },
//         },

//         // {
//         //   name: 'firefox',
//         //   use: { ...devices['Desktop Firefox'] },
//         // },

//         // {
//         //   name: 'webkit',
//         //   use: { ...devices['Desktop Safari'] },
//         // },

//         /* Test against mobile viewports. */
//         // {
//         //   name: 'Mobile Chrome',
//         //   use: { ...devices['Pixel 5'] },
//         // },
//         // {
//         //   name: 'Mobile Safari',
//         //   use: { ...devices['iPhone 12'] },
//         // },

//         /* Test against branded browsers. */
//         // {
//         //   name: 'Microsoft Edge',
//         //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//         // },
//         // {
//         //   name: 'Google Chrome',
//         //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//         // },
//     ],

//     /* Run your local dev server before starting the tests */
//     // webServer: {
//     //   command: 'npm run start',
//     //   url: 'http://localhost:3000',
//     //   reuseExistingServer: !process.env.CI,
//     // },
// });

// export default config;
