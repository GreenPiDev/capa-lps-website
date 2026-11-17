// Tüm dillerin çeviri dosyalarının, temel dil (tr) ile birebir aynı anahtar yapısına sahip olduğunu doğrular.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const LOCALES_DIR = join(import.meta.dirname, '..', 'src', 'locales');
const BASE_LOCALE = 'tr';

function flattenKeys(value, prefix = '') {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof child === 'object' && child !== null ? flattenKeys(child, path) : [path];
  });
}

function readKeys(locale, file) {
  const path = join(LOCALES_DIR, locale, file);
  if (!existsSync(path)) return null;
  return new Set(flattenKeys(JSON.parse(readFileSync(path, 'utf8'))));
}

const locales = readdirSync(LOCALES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
const otherLocales = locales.filter((locale) => locale !== BASE_LOCALE);

const problems = [];

for (const locale of otherLocales) {
  const files = new Set([
    ...readdirSync(join(LOCALES_DIR, BASE_LOCALE)),
    ...readdirSync(join(LOCALES_DIR, locale)),
  ]);
  for (const file of files) {
    const base = readKeys(BASE_LOCALE, file);
    const other = readKeys(locale, file);
    if (!base || !other) {
      problems.push(`${base ? locale : BASE_LOCALE}/${file}: dosya eksik`);
      continue;
    }
    for (const key of base) if (!other.has(key)) problems.push(`${locale}/${file}: eksik "${key}"`);
    for (const key of other) if (!base.has(key)) problems.push(`${BASE_LOCALE}/${file}: eksik "${key}"`);
  }
}

if (problems.length > 0) {
  console.error(`Çeviri anahtarları uyuşmuyor:\n${problems.join('\n')}`);
  process.exit(1);
}

console.log(`Çeviri anahtarları uyumlu (${locales.join(', ')}).`);
