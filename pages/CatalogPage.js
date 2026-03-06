const { BasePage } = require('./BasePage');

class CatalogPage extends BasePage {
    constructor(page) {
        super(page);
        // Catalog Sub-menu
        this.navBusinessCatalog = page.getByRole('button', { name: 'Business Catalog' });
        this.navTechnicalCatalog = page.getByRole('button', { name: 'Technical Catalog' });

        // Technical Catalog Sub-items
        this.tablesLink = page.getByRole('link', { name: 'Tables' });
        this.databasesLink = page.getByRole('link', { name: 'Databases' });

        // Search & Filter
        this.keywordInput = page.getByPlaceholder('Enter keywords');
        this.domainFilter = page.getByText('All domains & Subdomains');

        // Search Results
        this.resultsTable = page.locator('.search-layout_results__IHLfT');
        this.firstResultLink = page.locator('.list_view_type_link_search_data__wShOe').first();

        // Asset Details / Governance
        this.assetActionsBtn = page.getByRole('button', { name: 'Asset Actions' });
        this.subscribeMenuItem = page.getByRole('menuitem', { name: 'Subscribe' });
        this.tableLevelMetadataTab = page.getByRole('link', { name: 'Table Level Metadata' });
        this.columnLevelMetadataTab = page.getByRole('link', { name: 'Column Level Metadata' });
    }

    async navigateToTechnicalTables() {
        await this.navTechnicalCatalog.click();
        await this.tablesLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async searchCatalog(keyword) {
        await this.keywordInput.fill(keyword);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async viewFirstResult() {
        await this.firstResultLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async requestAccess() {
        await this.assetActionsBtn.click();
        await this.subscribeMenuItem.click();
    }
}

module.exports = { CatalogPage };
