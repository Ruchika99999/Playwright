import {test,expect,Browser,BrowserContext,Page,chromium,} from "@playwright/test";
import { logindata } from "./OrangeHRMdata/logindata";
import { urls } from "./Utlis/OrangeHRMUtlis";
import { LoginMethod } from "./Pages/LoginPage";

// Describe block for grouping all OrangeHRM automation tests
test.describe("OrangeHRM Automate", () => {
  // It Declare browser instance
  let browser: Browser;
  // It Declare browser context
  let context: BrowserContext;
  // It Declare page object
  let page: Page;

  // Setup: Launch browser and create new context/page before all tests
  test.beforeAll(async () => {
    test.setTimeout(120_000);
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(urls.LoginURL);
  });
  // Test Case 1: Login with correct credentials
  test("ORM_LGN_FN_TC0001", async ({ page }) => {
    // Instantiate LoginPage object
    const loginPage = new LoginMethod(page);
    // Load correct login credentials from JSON
    const login1 = logindata.Correct;
    //Do login using with correct credentials
    await loginPage.login(login1.username, login1.password);
  });
  test("ORM_LGN_FN_TC0002", async ({ page }) => {
    // Instantiate LoginPage object
    const loginPage = new LoginMethod(page);
    // Load Incorrect login credentials from JSON
    const login2 = logindata.Incorrect;
    //Do login using with Incorrect credentials
    await loginPage.login(login2.username, login2.password);
  });
  test.only("ORM_LGN_FN_TC0003", async () => {
    const loginPage = new LoginMethod(page);
    const login3 = logindata.Correct;
    await page.getByText('Forgot your password? ').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.locator('button[type="submit"]').click();
    const message = 'Reset Password link sent successfully';
    await expect(page.getByRole('heading',{name:'Reset Password link sent successfully'})).toHaveText(message);
  });

  test('ORM_LGN_FN_TC0004',async()=>{
  await page.getByText('Forgot your password? ').click();
  await page.locator('button[type="button"]').click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');



  })

  // test.afterAll(async () => {
  //   await page.close();
  //   await context.close();
  //   await browser.close();
  // });
});
