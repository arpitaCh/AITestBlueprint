import { test, expect } from '@playwright/test';

test('loginTest', async ({ page }) => {
    await page.goto("https://example.com");
    await page.locator('[name="' + "username" + '"]').fill("admin");
    await page.locator('#' + "login-btn").click();
});

