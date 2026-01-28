const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');
const { convertSeleniumToPlaywright } = require('./converter');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Endpoint for conversion
app.post('/api/convert', async (req, res) => {
    try {
        const { sourceCode, language } = req.body;

        if (!sourceCode) {
            return res.status(400).json({ error: 'No source code provided' });
        }

        const convertedCode = convertSeleniumToPlaywright(sourceCode, language);

        // Save to a new directory as per requirement
        const outputDir = path.join(__dirname, '..', 'converted_tests');
        await fs.ensureDir(outputDir);

        const timestamp = new Date().getTime();
        const ext = language === 'typescript' ? 'ts' : 'js';
        const fileName = `test_${timestamp}.${ext}`;
        const filePath = path.join(outputDir, fileName);

        await fs.writeFile(filePath, convertedCode);

        res.json({
            convertedCode,
            filePath: filePath,
            fileName: fileName
        });
    } catch (error) {
        console.error('Conversion error:', error);
        res.status(500).json({ error: 'Internal server error during conversion' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Converter UI Server running at http://localhost:${PORT}`);
});
