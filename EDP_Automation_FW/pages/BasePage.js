class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(path = '') {
        await this.page.goto(path);
    }

    async click(locator) {
        await locator.click();
    }

    async type(locator, text) {
        await locator.fill(text);
    }

    async getText(locator) {
        return await locator.innerText();
    }

    async waitForElement(locator) {
        await locator.waitFor({ state: 'visible' });
    }
}

module.exports = { BasePage };
