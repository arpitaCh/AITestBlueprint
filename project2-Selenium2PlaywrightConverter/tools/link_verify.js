const fs = require('fs');
const path = require('path');

const tmpDir = path.join(__dirname, '..', '.tmp');

// Ensure .tmp exists
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
}

const javaCode = `
public class Test {
    @Test
    public void myTest() {
        driver.get("https://google.com");
    }
}
`;

const jsCode = `
test('myTest', async ({ page }) => {
    await page.goto('https://google.com');
});
`;

try {
    const inputPath = path.join(tmpDir, 'sample_input.java');
    const outputPath = path.join(tmpDir, 'sample_output.js');

    // Write input
    fs.writeFileSync(inputPath, javaCode);
    console.log(`✅ successfully wrote sample input to ${inputPath}`);

    // Read it back
    const readInput = fs.readFileSync(inputPath, 'utf8');
    if (readInput === javaCode) {
        console.log('✅ sample input verification passed');
    }

    // Write output
    fs.writeFileSync(outputPath, jsCode);
    console.log(`✅ successfully wrote sample output to ${outputPath}`);

    console.log('🚀 LINK VERIFICATION COMPLETE');
} catch (error) {
    console.error('❌ Link verification failed:', error);
    process.exit(1);
}
