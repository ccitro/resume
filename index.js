import * as themeLocal from 'jsonresume-theme-local';
import * as themeFlat from 'jsonresume-theme-flat';
import * as themeOnepagePlus from 'jsonresume-theme-onepage-plus';
import * as themeResu from 'jsonresume-theme-resu';
import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import { render } from 'resumed';

const DEFAULT_HTML_THEME = 'local';
const DEFAULT_PDF_THEME = 'onepage-plus';
const themes = [
    ['local', themeLocal],
    ['flat', themeFlat],
    ['onepage-plus', themeOnepagePlus],
    ['resu', themeResu],
];

try {
    await fs.mkdir('./dist');
} catch (e) {
    if (e.code !== 'EEXIST') {
        throw e;
    }
}

// clear out contents of dist dir
const files = await fs.readdir('./dist');
for (const file of files) {
    await fs.unlink(`./dist/${file}`);
}

const resume = JSON.parse(await fs.readFile('./res/resume.json', 'utf-8'));

// render each theme to html, keeping track of the one with the best pdf support
let pdfHtml = '';
for (const theme of themes) {
    const html = await render(resume, theme[1]);
    await fs.writeFile(`./dist/resume-${theme[0]}.html`, html);
    if (theme[0] === DEFAULT_PDF_THEME) {
        pdfHtml = html;
    }
}

await fs.copyFile(`./dist/resume-${DEFAULT_HTML_THEME}.html`, './dist/index.html');

// render the theme with the best pdf support to pdf
if (pdfHtml !== '') {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(pdfHtml, { waitUntil: 'networkidle0' });
        await page.pdf({
            path: './dist/Craig-Citro-Resume.pdf',
            format: "LETTER",
            printBackground: true,
            margin: {
                top: '0.5in',
                left: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
            },
        });
        await browser.close();
        await fs.copyFile('./dist/Craig-Citro-Resume.pdf', './dist/resume.pdf')
    } catch (e) {
        console.error('Error generating PDF:', e);
    }
}

// copy static/input files to dist dir
for (const file of await fs.readdir('./res')) {
    await fs.copyFile(`./res/${file}`, `./dist/${file}`);
}
