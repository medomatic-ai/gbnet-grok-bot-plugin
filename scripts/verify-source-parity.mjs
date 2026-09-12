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
const publicContract = JSON.parse(
  await readFile(new URL("docs/release-contract.json", pluginRoot), "utf8"),
);
const capabilities = await readFile(
  new URL("docs/capabilities.md", pluginRoot),
  "utf8",
);
const serverPath = path.resolve(
  sourceRoot,
  "packages/core-plugin/src/server.ts",
);
// Follow local source imports so extracted registration modules cannot disappear
// from static parity. The Core release gate separately proves runtime discovery.
const visited = new Set();
async function readRegistrationSources(file) {
  if (visited.has(file)) return "";
  visited.add(file);
  const source = await readFile(file, "utf8");
  const imports = [...source.matchAll(/from\s+["'](\.\/[^"']+)\.js["']/g)];
  const children = await Promise.all(imports.map(match =>
    readRegistrationSources(path.resolve(path.dirname(file), `${match[1]}.ts`))));
  return [source, ...children].join("\n");
}
const serverSource = await readRegistrationSources(serverPath);
const sourceContract = JSON.parse(
  await readFile(
    path.resolve(sourceRoot, "docs/marketplace/release-contract-v1.json"),
    "utf8",
  ),
);

const registrationPattern = /\b(?:server\.)?registerTool\s*\(/g;
const registrationCount = [...serverSource.matchAll(registrationPattern)].length;
const registeredTools = [
  ...serverSource.matchAll(
    /\b(?:server\.)?registerTool\s*\(\s*["'](gb_net_[a-z0-9_]+)["']/g,
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
assert.deepEqual(
  [...publicContract.tools].sort(),
  [...sourceContract.hostedConnector.toolInventory].sort(),
  "Public release-contract projection differs from the committed source contract",
);
assert.equal(
  publicContract.contractVersion,
  sourceContract.contractVersion,
  "Marketplace Release Contract version differs",
);
assert.equal(
  publicContract.compatiblePackageVersion,
  sourceContract.marketplacePackage.compatibleVersion,
  "Compatible package version differs",
);
assert.equal(
  publicContract.endpoint,
  sourceContract.hostedConnector.mcpEndpoint,
  "Hosted MCP endpoint differs",
);
assert.equal(
  publicContract.capabilityAuthority,
  sourceContract.marketplacePackage.capabilityAuthority,
  "Capability authority differs",
);
assert.equal(
  sourceContract.marketplacePackage.repository,
  "https://github.com/medomatic-ai/gbnet-grok-bot-plugin",
  "Source contract points at the wrong public repository",
);
for (const tool of registeredTools) {
  assert.ok(
    capabilities.includes(`\`${tool}\``),
    `Capability documentation is missing ${tool}`,
  );
}

console.log(
  `GbNet source parity passed (${registeredTools.length} Core Plugin tools match the public package and Marketplace Release Contract).`,
);
