#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const { stdout } = await execFileAsync(
  "npm",
  ["pack", "--dry-run", "--json", "--ignore-scripts"],
  { cwd: process.cwd(), maxBuffer: 1024 * 1024 },
);
const result = JSON.parse(stdout)[0];
const actualFiles = result.files.map(({ path }) => path).sort();
const expectedFiles = [
  ".cursor-plugin/plugin.json",
  "LICENSE",
  "README.md",
  "SECURITY.md",
  "SUPPORT.md",
  "assets/logo.svg",
  "docs/capabilities.md",
  "docs/data-use.md",
  "docs/marketplace-listing.md",
  "docs/package-inventory.json",
  "docs/policies.md",
  "docs/release-contract.json",
  "docs/submission.md",
  "docs/tools.json",
  "mcp.json",
  "package.json",
  "skills/gbnet-collaboration/SKILL.md",
].sort();

assert.equal(result.name, "gbnet-grok-bot-plugin");
assert.equal(result.version, "1.0.0");
assert.deepEqual(actualFiles, expectedFiles, "Package dry run differs from the reviewed public inventory");
assert.deepEqual(result.bundled, [], "The public package must not bundle dependencies or binaries");
console.log(`Package dry run passed (${actualFiles.length} reviewed files; no bundled dependencies).`);
