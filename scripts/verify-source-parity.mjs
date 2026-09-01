#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = process.argv[2];
if (!sourceRoot) {
  console.error("Usage: npm run test:source -- /path/to/gb-net");
  process.exit(2);
}

const pluginRoot = new URL("../", import.meta.url);
const expectedTools = JSON.parse(
  await readFile(new URL("docs/tools.json", pluginRoot), "utf8"),
);
const capabilities = await readFile(
  new URL("docs/capabilities.md", pluginRoot),
  "utf8",
);
const serverPath = path.resolve(
  sourceRoot,
  "packages/core-plugin/src/server.ts",
);
const serverSource = await readFile(serverPath, "utf8");

const registrationCount = [...serverSource.matchAll(/server\.registerTool\s*\(/g)].length;
const registeredTools = [
  ...serverSource.matchAll(
    /server\.registerTool\s*\(\s*["'](gb_net_[a-z0-9_]+)["']/g,
  ),
].map((match) => match[1]);

assert.equal(
  registeredTools.length,
  registrationCount,
  "Every Core Plugin tool registration must use a literal gb_net_* name",
);
assert.equal(
  new Set(registeredTools).size,
  registeredTools.length,
  "Core Plugin tool names must be unique",
);
assert.deepEqual(
  [...registeredTools].sort(),
  [...expectedTools].sort(),
  "Public connector inventory differs from the selected Core Plugin source",
);
for (const tool of registeredTools) {
  assert.ok(
    capabilities.includes(`\`${tool}\``),
    `Capability documentation is missing ${tool}`,
  );
}

console.log(
  `GbNet source parity passed (${registeredTools.length} Core Plugin tools match the public connector inventory).`,
);
