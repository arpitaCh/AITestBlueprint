const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        // Main Navigation (Sidebar)
        this.navHome = page.getByRole('link', { name: 'Home' });
        this.navTaskRequest = page.getByRole('link', { name: 'Task & Request' });
        this.navCatalog = page.getByRole('link', { name: 'Catalog' });
        this.navAnalyze = page.getByRole('link', { name: 'Analyze' });

        // Search
        this.searchInput = page.getByPlaceholder(/Ask anything/i);
        this.searchButton = page.getByRole('button', { name: 'Search' });

        // User Info
        this.userProfile = page.locator('strong:has-text("AC")'); // Avatar initials
        this.greeting = page.locator('text=Hi, Arpita');

        // My Workbench / Tables
        this.tablesTab = page.getByRole('link', { name: 'Tables' });
        this.businessAssetsTab = page.getByRole('link', { name: 'Business Assets' });
        this.dataOversightSection = page.locator('text=Data Oversight');
    }

    async isLoaded() {
        await this.navHome.waitFor({ state: 'visible' });
        await this.greeting.waitFor({ state: 'visible' });
    }

    async searchFor(term) {
        await this.type(this.searchInput, term);
        await this.searchButton.click();
    }

    async switchTab(tabName) {
        if (tabName === 'Tables') await this.tablesTab.click();
        if (tabName === 'Business Assets') await this.businessAssetsTab.click();
    }
}

module.exports = { HomePage };
