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
    test('ORM_LGN_FN_TC0001', async () => { 
        // Click login button 
        await page.getByRole('button', { name: 'Login' }).click(); 
        //Assert dashboard is visible 
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible(); 
    }); 
    test('ORM_LGN_FN_TC0002',async()=>{
         await page.goto(urls.LoginURL); 
        const login1 = logindata.Incorrect; 
        //Enter username  
        await page.locator('input[name="username"]').fill(login1.username); 
        //Enter password  
        await page.locator('input[name="password"]').fill(login1.password);
        // Click login button 
        await page.getByRole('button', { name: 'Login' }).click(); 
        //Validate the error message
        const error= await page.getByText('Invalid credentials');
        // 'CSRF token validation failed'
        await expect(error).toHaveText('Invalid credentials')
})
        
        test.afterAll(async () => { 
        await page.close(); 
        await context.close(); 
        await browser.close(); }); 
        
        });