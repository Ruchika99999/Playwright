import { test, expect, Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { logindata } from "./OrangeHRMdata/logindata";
import { urls } from "./Utlis/OrangeHRMUtlis";

test.describe('OrangeHRM Automate', () => { 
    let browser: Browser; 
    let context: BrowserContext; 
    let page: Page; 
    
    test.beforeAll(async () => { 
    browser = await chromium.launch(); 
    context = await browser.newContext(); 
    page = await context.newPage(); 
    }); 
    test('Login Account', async () => { 
        await page.goto(urls.LoginURL); 
        const login = logindata.Login; 
        
        //Wait for username field to be visible and fill it 
        await page.locator('input[name="username"]').fill(login.username); 
        //Wait for password field and fill it 
        await page.locator('input[name="password"]').fill(login.password);; 
        // Click login button 
        await page.getByRole('button', { name: 'Login' }).click(); 
        
        //Assert dashboard is visible 
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible(); }); 
        
        test.afterAll(async () => { 
        await page.close(); 
        await context.close(); 
        await browser.close(); }); 
        
        });