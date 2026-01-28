# SOP: Core Converter Tool

## Goal
Transform Selenium Java (TestNG) code into idiomatic Playwright JavaScript/TypeScript.

## Inputs
- `sourceCode`: Raw Selenium Java code string.
- `language`: `typescript` or `javascript`.

## Tool Logic (`tools/converter.js`)

### 1. Regex Matchers & Pattern Definitions
- **TestNG Mapping:**
    - `@BeforeClass` / `@BeforeSuite` → `test.beforeAll`
    - `@AfterClass` / `@AfterSuite` → `test.afterAll`
    - `@BeforeMethod` → `test.beforeEach`
    - `@AfterMethod` → `test.afterEach`
    - `@Test` → `test('Name', async ({ page }) => { ... })`
- **Selenium API Mapping:**
    - `driver.get(url)` → `await page.goto(url)`
    - `findElement(By.id("..."))` → `page.locator('#...')`
    - `findElement(By.name("..."))` → `page.locator('[name="..."]')`
    - `findElement(By.xpath("..."))` → `page.locator('xpath=...')`
    - `click()` → `await locator.click()`
    - `sendKeys("...")` → `await locator.fill("...")`
    - `getText()` → `await locator.textContent()`
- **Assertion Mapping:**
    - `Assert.assertEquals(a, b)` → `expect(a).toBe(b)`
    - `Assert.assertTrue(el.isDisplayed())` → `await expect(locator).toBeVisible()`

### 2. Transformation Pipeline
1.  **Extract Method Blocks:** Use regex to find methods annotated with `@Test` or hooks.
2.  **Transform Body:** For each line in the method body:
    - Apply regex replacements for API commands.
    - Wrap in `await`.
    - Handle variable declarations (replace `WebElement` with `const`).
3.  **Wrap in Playwright Hook:** Place transformed body into the corresponding Playwright hook or test block.
4.  **Add Imports:** Add `import { test, expect } from '@playwright/test';`.

### 3. Error Handling
- Capture lines that fail to convert and add as comments with `FIXME:` prefix.

## Output
- A single string containing the converted Playwright code.
