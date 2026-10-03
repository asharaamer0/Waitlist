import { readFile, writeFile } from 'node:fs/promises';
const path = 'app/globals.css';
const css = await readFile(path, 'utf8');
const marker = '/* Hero, second direction:';
const index = css.indexOf(marker);
const legacy = css.slice(0,index).split('\n').filter(line => !/^\s*\.(?:hero(?:\b|-)|device-annotation|annotation-line|input-formats|small-rule)/.test(line)).join('\n');
const fresh = css.slice(index)
 .replace('.hero-grid { grid-template-columns:', '.hero-grid { display: grid; position: relative; grid-template-columns:')
 .replace('.hero-copy { padding-bottom: 0; }', '.hero-copy { padding-bottom: 0; z-index: 1; }')
 .replace('.hero-bottom { margin-top: 34px; min-height: 76px; }', '.hero-bottom { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--hairline); border-bottom: 1px solid var(--hairline); margin-top: 34px; min-height: 76px; font-size: 11px; }');
await writeFile(path,legacy+fresh);
