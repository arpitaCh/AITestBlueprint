/**
 * Selenium Java to Playwright JS/TS Converter
 * Logic based on architecture/converter_sop.md
 */

function convertSeleniumToPlaywright(javaCode, language = 'typescript') {
    let output = language === 'typescript' ? "import { test, expect } from '@playwright/test';\n\n" : "const { test, expect } = require('@playwright/test');\n\n";

    // Normalize lines
    let lines = javaCode.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    let convertedBlocks = [];
    let currentBlock = null;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Detect Annotations
        if (line.includes('@Test')) {
            currentBlock = { type: 'test', body: [], started: false };
        } else if (line.includes('@BeforeMethod')) {
            currentBlock = { type: 'beforeEach', body: [], started: false };
        } else if (line.includes('@BeforeClass')) {
            currentBlock = { type: 'beforeAll', body: [], started: false };
        } else if (line.includes('@AfterMethod')) {
            currentBlock = { type: 'afterEach', body: [], started: false };
        } else if (line.includes('@AfterClass')) {
            currentBlock = { type: 'afterAll', body: [], started: false };
        }

        // Detect Method Name
        if (line.includes('void ') && currentBlock && !currentBlock.name) {
            let methodName = line.match(/void (\w+)/)?.[1] || 'unnamedTest';
            currentBlock.name = methodName;
            if (line.includes('{')) currentBlock.started = true;
            continue;
        }

        if (line.includes('{') && currentBlock && !currentBlock.started) {
            currentBlock.started = true;
            continue;
        }

        // Detect Block End
        if (line === '}' && currentBlock && currentBlock.started) {
            convertedBlocks.push(currentBlock);
            currentBlock = null;
            continue;
        }

        // Process Body
        if (currentBlock && currentBlock.started) {
            let converted = convertLine(line);
            if (converted) currentBlock.body.push(converted);
        }
    }

    // Assemble
    convertedBlocks.forEach(block => {
        if (block.type === 'test') {
            output += `test('${block.name}', async ({ page }) => {\n`;
        } else {
            output += `test.${block.type}(async ({ page }) => {\n`;
        }
        block.body.forEach(l => output += `    ${l}\n`);
        output += `});\n\n`;
    });

    return output;
}

function convertLine(line) {
    if (line.includes('public class') || line.includes('import ') || line.includes('package ')) return null;

    let c = line;

    // 1. Navigation
    c = c.replace(/driver\.get\((.*?)\);/, 'await page.goto($1);');

    // 2. Locators (Atomic replacements)
    c = c.replace(/driver\.findElement\(By\.id\((.*?)\)\)/g, "page.locator('#' + $1)");
    c = c.replace(/driver\.findElement\(By\.name\((.*?)\)\)/g, "page.locator('[name=\"' + $1 + '\"]')");
    c = c.replace(/driver\.findElement\(By\.cssSelector\((.*?)\)\)/g, "page.locator($1)");
    c = c.replace(/driver\.findElement\(By\.xpath\((.*?)\)\)/g, "page.locator('xpath=' + $1)");
    c = c.replace(/driver\.findElement\(By\.linkText\((.*?)\)\)/g, "page.locator('text=' + $1)");

    // 3. Actions (Ensuring await and chaining)
    c = c.replace(/\.sendKeys\((.*?)\)/g, ".fill($1)");

    // Wrap page actions in await
    if (c.includes('page.locator') || c.includes('page.goto')) {
        if (!c.trim().startsWith('await') && !c.includes('const ') && !c.includes('let ')) {
            c = 'await ' + c;
        }
    }

    // 4. Assertions
    c = c.replace(/Assert\.assertEquals\((.*?), (.*?)\);/, 'expect($1).toBe($2);');
    c = c.replace(/Assert\.assertTrue\((.*?)\.isDisplayed\(\)\);/, 'await expect($1).toBeVisible();');

    // 5. Variables
    c = c.replace(/WebElement\s+(\w+)\s*=\s*/g, 'const $1 = ');

    return c;
}

// Module Export for tool use
if (typeof module !== 'undefined') {
    module.exports = { convertSeleniumToPlaywright };
}
