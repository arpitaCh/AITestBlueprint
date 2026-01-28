# Findings - Selenium to Playwright Converter

## Research & Discoveries

### Project Context
**Date:** 2026-01-28  
**Project:** Selenium Java to Playwright JavaScript/TypeScript Converter

---

## Phase 0: Initialization

### Initial Understanding
- **Goal:** Build a converter that transforms Selenium Java test automation code into Playwright JavaScript/TypeScript
- **Challenge:** Different syntax, API patterns, and paradigms between Selenium and Playwright
- **Opportunity:** Playwright offers better performance, auto-waiting, and modern async/await patterns

---

## Key Discoveries

### Selenium vs Playwright Differences

#### API Mapping
| Action | Selenium Java | Playwright JS/TS |
| :--- | :--- | :--- |
| Navigate | `driver.get(url)` | `await page.goto(url)` |
| Find (ID) | `By.id("foo")` | `page.locator('#foo')` |
| Find (CSS) | `By.cssSelector(".foo")` | `page.locator('.foo')` |
| Find (Link) | `By.linkText("foo")` | `page.locator('text=foo')` |
| Click | `el.click()` | `await el.click()` |
| Input | `el.sendKeys("foo")` | `await el.fill("foo")` |
| Text | `el.getText()` | `await el.textContent()` |
| Visibility | `el.isDisplayed()` | `await el.isVisible()` |

#### Framework Mapping (TestNG → Playwright)
| TestNG Annotation | Playwright Hook |
| :--- | :--- |
| `@BeforeClass` | `test.beforeAll` |
| `@BeforeMethod` | `test.beforeEach` |
| `@Test` | `test('name', async ({ page }) => { ... })` |
| `@AfterMethod` | `test.afterEach` |
| `@AfterClass` | `test.afterAll` |

#### Async/Await Handling
- Playwright is inherently asynchronous. All actions (`click`, `fill`, `goto`) must be prefixed with `await`.
- Functions must be marked as `async`.

---

## Constraints & Limitations

### Technical Constraints
- TBD

### Business Constraints
- TBD

---

## External Resources
*(To be populated during research)*

### GitHub Repositories
- TBD

### Documentation
- TBD

### Similar Projects
- TBD

---

## Conversion Patterns

### Implemented Regex Patterns
- `driver.get(url)` -> `await page.goto(url)`
- `By.id("foo")` -> `#foo`
- `findElement(...)` -> `page.locator(...)`
- `.click()` -> `await .click()` (Handles async wrapping)
- `WebElement` -> `const`

### State Machine Highlights
- Detects TestNG annotations to determine Playwright block types.
- Extracts Java method names for Playwright test names.
- Preserves code within method bodies while applying transformations.

### Edge Cases
- **Comment Handling:** Currently preserves inline comments within method bodies.
- **Unsupported Actions:** Actions not matched by regex will remain as is (Java syntax) for manual fixing.

---

## Notes
- This document will be updated as research progresses
- All discoveries should be documented here before implementation
