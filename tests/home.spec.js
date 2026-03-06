const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('EDP Home Page Validation', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate(''); // Navigates to baseURL defined in config
    });

    test('should verify sidebar navigation links are visible', async () => {
        await expect(homePage.navHome).toBeVisible();
        await expect(homePage.navTaskRequest).toBeVisible();
        await expect(homePage.navCatalog).toBeVisible();
        await expect(homePage.navAnalyze).toBeVisible();
    });

    test('should verify user greeting and profile', async () => {
        await expect(homePage.greeting).toContainText('Hi, Arpita');
        await expect(homePage.userProfile).toBeVisible();
    });

    test('should switch between "Tables" and "Business Assets" tabs', async () => {
        // Scroll to section if needed
        await homePage.dataOversightSection.scrollIntoViewIfNeeded();

        await homePage.switchTab('Business Assets');
        // Basic check for activity
        await expect(homePage.businessAssetsTab).toHaveAttribute('class', /active/);

        await homePage.switchTab('Tables');
        await expect(homePage.tablesTab).toHaveAttribute('class', /active/);
    });

    test('should verify search bar interaction', async () => {
        const searchTerm = 'item sales';
        await homePage.searchInput.fill(searchTerm);
        // Just verify the text is entered for now as we don't want to trigger real searches in QA needlessly
        await expect(homePage.searchInput).toHaveValue(searchTerm);
    });

    test('should load the home page successfully', async ({ page }) => {
        await homePage.isLoaded();
        await expect(page).toHaveURL(/.*walmart\.com\/home/);
        console.log('✅ Home page loaded successfully');
    });

    test('should have the correct page title or header', async ({ page }) => {
        // Basic validation of page content
        const title = await page.title();
        console.log(`Page title is: ${title}`);
        expect(title).toBeTruthy();
    });
});
