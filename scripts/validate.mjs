#!/usr/bin/env node
/**
 * Validates registry.json against schema.json and checks that every slug is
 * unique. Run with `bun run validate` (or `node scripts/validate.mjs`).
 * Exits non-zero with a readable message if anything is wrong — this is what
 * the PR check runs.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function readJson(name) {
  const path = join(root, name);
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    console.error(`✗ ${name} is not valid JSON:\n  ${err.message}`);
    process.exit(1);
  }
}

const schema = readJson('schema.json');
const registry = readJson('registry.json');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

let ok = true;

if (!validate(registry)) {
  ok = false;
  console.error('✗ registry.json does not match schema.json:\n');
  for (const e of validate.errors ?? []) {
    const where = e.instancePath || '(root)';
    console.error(`  • ${where} ${e.message}`);
  }
  console.error('');
}

// Unique-slug check (schema can't express this across the whole array).
const seen = new Map();
for (const [i, project] of registry.entries()) {
  const slug = project?.slug;
  if (!slug) continue;
  if (seen.has(slug)) {
    ok = false;
    console.error(
      `✗ duplicate slug "${slug}" (entries #${seen.get(slug)} and #${i}). Slugs must be unique.`,
    );
  } else {
    seen.set(slug, i);
  }
}

if (ok) {
  console.log(`✓ registry.json is valid — ${registry.length} project(s) registered.`);
  process.exit(0);
} else {
  console.error('\nFix the issues above and push again. A mentor can help if you get stuck.');
  process.exit(1);
}
