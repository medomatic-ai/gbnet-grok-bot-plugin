#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const { stdout } = await execFileAsync(
  "npm",
  ["pack", "--dry-run", "--json", "--ignore-scripts"],
  { cwd: process.cwd(), maxBuffer: 1024 * 1024 },
);
const result = JSON.parse(stdout)[0];
const actualFiles = result.files.map(({ path }) => path).sort();
const inventory = JSON.parse(await readFile("docs/package-inventory.json", "utf8"));
const expectedFiles = [...inventory.publicFiles].sort();

assert.equal(result.name, "gbnet-grok-bot-plugin");
assert.equal(result.version, "1.0.0");
assert.deepEqual(actualFiles, expectedFiles, "Package dry run differs from the reviewed public inventory");
assert.deepEqual(result.bundled, [], "The public package must not bundle dependencies or binaries");
console.log(`Package dry run passed (${actualFiles.length} reviewed files; no bundled dependencies).`);
