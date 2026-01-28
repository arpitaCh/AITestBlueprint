import { test, expect } from '@playwright/test';

test('loginTest', async ({ page }) => {
    System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
    WebDriver driver = new ChromeDriver();
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    driver.manage().window().maximize();
    await page.goto("https://app.vwo.com/#/login");
    // Enter email
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("login-username")))
    .fill("test@example.com");
    // Enter password
    await page.locator('#' + "login-password")
    .fill("Password@123");
    // Click Sign in
    await page.locator('#' + "js-login-btn").click();
    driver.quit();
});

