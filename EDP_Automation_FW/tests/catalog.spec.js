const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CatalogPage } = require('../pages/CatalogPage');

test.describe('EDP Catalog Page Validation', () => {
    let homePage;
    let catalogPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        catalogPage = new CatalogPage(page);
        await homePage.navigate('');
        await homePage.isLoaded();
    });

    test('should navigate to Catalog and search for a table', async ({ page }) => {
        // Navigate to Catalog
        await homePage.navCatalog.click();

        // Navigate to Technical Catalog > Tables
        await catalogPage.navigateToTechnicalTables();

        // Perform search
        const searchKeyword = 'DORP-HWD-MERCH-ITEM-ATTR-BT';
        await catalogPage.searchCatalog(searchKeyword);

        // Verify results
        await expect(catalogPage.resultsTable).toBeVisible();
        await expect(catalogPage.firstResultLink).toBeVisible();
        await expect(catalogPage.firstResultLink).toContainText(searchKeyword);
    });

    test('should navigate to Asset Details (Governance) page', async ({ page }) => {
        // Setup Catalog
        await homePage.navCatalog.click();
        await catalogPage.navigateToTechnicalTables();

        // Perform search and view first result
        const searchKeyword = 'DORP-HWD-MERCH-ITEM-ATTR-BT';
        await catalogPage.searchCatalog(searchKeyword);
        await catalogPage.viewFirstResult();

        // Verify we are on Governance page
        await expect(page).toHaveURL(/.*governance\/collections\/technical\/TABLE/);
        await expect(catalogPage.assetActionsBtn).toBeVisible();
        await expect(catalogPage.tableLevelMetadataTab).toBeVisible();
    });

    test('should verify access request flow triggers (subscribe)', async ({ page }) => {
        // Setup Catalog and navigate to asset
        await homePage.navCatalog.click();
        await catalogPage.navigateToTechnicalTables();
        const searchKeyword = 'DORP-HWD-MERCH-ITEM-ATTR-BT';
        await catalogPage.searchCatalog(searchKeyword);
        await catalogPage.viewFirstResult();

        // Trigger Subscribe (Request Access)
        await catalogPage.assetActionsBtn.click();
        await expect(catalogPage.subscribeMenuItem).toBeVisible();
    });
});
