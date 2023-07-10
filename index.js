import { promises as fs } from 'fs';
import * as themeLocal from 'jsonresume-theme-local';
import * as themeFlat from 'jsonresume-theme-flat';
import * as themeOnepagePlus from 'jsonresume-theme-onepage-plus';
import * as themeResu from 'jsonresume-theme-resu';
import { render } from 'resumed';

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
    if (theme[0] === 'onepage-plus') {
        pdfHtml = html
    }
}

// set the first theme to the default html resume
await fs.copyFile(`./dist/resume-${themes[0][0]}.html`, './dist/index.html');

// render the theme with the best pdf support to pdf
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setContent(pdfHtml, { waitUntil: 'networkidle0' })
await page.pdf({ path: './dist/resume.pdf', format: 'a4', printBackground: true })
await browser.close()

// copy static/input files to dist dir
for (const file of await fs.readdir('./res')) {
    await fs.copyFile(`./res/${file}`, `./dist/${file}`);
}
