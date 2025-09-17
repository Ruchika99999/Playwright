import {
  test,
  expect,
  Browser,
  BrowserContext,
  Page,
chromium,
} from "@playwright/test";
import { urls } from "./Utils/Urls";
import registrationData from "./Utils/registrationData.json";

test.describe("Testing all the scenarios", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
  });

  test("Registration in ParaBank", async () => {
    test.setTimeout(120_000);
    await page.goto(urls.parabank.register);
    const user = registrationData.user1;
    await page.locator('#customer\\.firstName').fill(user.firstName);
  await page.locator('#customer\\.lastName').fill(user.lastName);
  await page.locator('#customer\\.address\\.street').fill(user.address);
  await page.locator('#customer\\.address\\.city').fill(user.city);
  await page.locator('#customer\\.address\\.state').fill(user.state);
  await page.locator('#customer\\.address\\.zipCode').fill(user.zipCode);
  await page.locator('#customer\\.phoneNumber').fill(user.phone);
  await page.locator('#customer\\.ssn').fill(user.ssn);
  await page.locator('#customer\\.username').fill(user.username);
  await page.locator('#customer\\.password').fill(user.password);
  await page.locator('#repeatedPassword').fill(user.password);
    await page.getByRole("button", { name: "Register" }).click();
  });

  

  test.afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
