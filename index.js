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

const files = await fs.readdir('./dist');
for (const file of files) {
    await fs.unlink(`./dist/${file}`);
}

const resume = JSON.parse(await fs.readFile('./res/resume.json', 'utf-8'));
for (const theme of themes) {
    const html = await render(resume, theme[1]);
    await fs.writeFile(`./dist/resume-${theme[0]}.html`, html);
}

await fs.copyFile('./res/resume.json', './dist/resume.json');
await fs.copyFile(`./dist/resume-${themes[0][0]}.html`, './dist/index.html');
