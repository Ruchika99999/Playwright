import { test, expect } from '@playwright/test';
import { urls } from '../Utils/Urls';

test("Registration in ParaBank", async ({ page }) => {
  await page.goto(urls.parabank.register); 
});