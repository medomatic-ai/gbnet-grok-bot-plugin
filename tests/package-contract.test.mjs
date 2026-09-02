import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const readJson = async (path) => JSON.parse(await read(path));

test("uses the frozen Marketplace package identity and hosted endpoint", async () => {
  const manifest = await readJson(".cursor-plugin/plugin.json");
  const mcp = await readJson("mcp.json");

  assert.equal(manifest.name, "gbnet");
  assert.equal(manifest.displayName, "GbNet");
  assert.equal(manifest.version, "1.0.0");
  assert.equal(manifest.author?.name, "MedoMatic, LLC");
  assert.equal(manifest.author?.email, "support@gbnet.ai");
  assert.equal(
    manifest.description,
    "GbNet lets your Grok Bot work securely with other people's Grok Bots—by invitation, with permissions you control.",
  );
  assert.equal(
    manifest.repository,
    "https://github.com/medomatic-ai/gbnet-grok-bot-plugin",
  );
  assert.equal(mcp.mcpServers?.gbnet?.url, "https://core.gbnet.ai/mcp");
  assert.deepEqual(Object.keys(mcp.mcpServers.gbnet).sort(), ["type", "url"]);
});

test("matches the public projection of Marketplace Release Contract v1", async () => {
  const release = await readJson("docs/release-contract.json");
  const tools = await readJson("docs/tools.json");
  const capabilities = await read("docs/capabilities.md");

  assert.equal(release.contractVersion, "gbnet-marketplace-release-v1");
  assert.equal(release.compatiblePackageVersion, "1.0.0");
  assert.equal(release.endpoint, "https://core.gbnet.ai/mcp");
  assert.equal(release.capabilityAuthority, "authenticated_runtime_discovery");
  assert.equal(tools.length, 27);
  assert.deepEqual([...tools].sort(), [...release.tools].sort());
  for (const tool of tools) {
    assert.ok(capabilities.includes(`\`${tool}\``), `${tool} is undocumented`);
  }
});

test("leads with Grok Bot and accurately separates distribution from service", async () => {
  const readme = await read("README.md");
  const listing = await read("docs/marketplace-listing.md");
  const combined = `${readme}\n${listing}`;

  assert.match(readme, /^# GbNet for Grok Bot$/m);
  assert.match(listing, /Cursor Marketplace is the distribution channel/);
  assert.match(combined, /Free Plan/);
  assert.match(combined, /one active Trusted Partnership/);
  assert.doesNotMatch(listing, /includes one owner-bound Partner Installation and one active Trusted Partnership/);
  assert.match(combined, /paid hosted features/i);
  assert.match(
    listing,
    /GbNet lets your Grok Bot work securely with other people's Grok Bots—by invitation, with permissions you control\./,
  );
  assert.doesNotMatch(combined, /primarily (?:a |an )?Cursor/i);
});

test("keeps setup and authority out of the everyday collaboration skill", async () => {
  const skill = await read("skills/gbnet-collaboration/SKILL.md");

  assert.match(skill, /everyday collaboration/i);
  assert.match(skill, /Coordinator Package.*authoritative/is);
  assert.match(skill, /Do not configure/i);
  assert.doesNotMatch(skill, /gb_net_(?:propose|configure|verify)_coordinator_route/);
  assert.doesNotMatch(skill, /create (?:a |the )?(?:routine|Coordinator Bot)/i);
  assert.doesNotMatch(skill, /grant (?:a |any )?(?:authority|permission)/i);
});

test("uses one publisher and one public contact across public-facing files", async () => {
  const publicPaths = [
    ".cursor-plugin/plugin.json",
    "README.md",
    "LICENSE",
    "SECURITY.md",
    "SUPPORT.md",
    "docs/data-use.md",
    "docs/marketplace-listing.md",
    "docs/policies.md",
  ];
  const combined = (await Promise.all(publicPaths.map(read))).join("\n");
  const addresses = combined.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];

  assert.match(combined, /MedoMatic, LLC/);
  assert.equal(combined.includes("Medomatic AI"), false);
  assert.deepEqual(new Set(addresses), new Set(["support@gbnet.ai"]));
  for (const route of ["terms", "privacy", "support", "security"]) {
    assert.match(combined, new RegExp(`https://gbnet\\.ai/${route}`));
  }
});

test("declares a complete inspectable component inventory", async () => {
  const inventory = await readJson("docs/package-inventory.json");
  const rootEntries = await readdir(root);

  assert.deepEqual(inventory.components, [
    ".cursor-plugin/plugin.json",
    "assets/logo.svg",
    "mcp.json",
    "skills/gbnet-collaboration/SKILL.md",
  ]);
  assert.deepEqual(inventory.publicFiles, [
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
  ]);
  assert.deepEqual(inventory.excluded, [
    "credentials",
    "customer data",
    "Partner Content",
    "private Bot conversations",
    "binaries",
    "proprietary Core Service implementation",
  ]);
  assert.equal(rootEntries.some((name) => name === "bin" || name === "dist"), false);
});

test("public CI runs the exact release gate", async () => {
  const workflow = await read(".github/workflows/validate.yml");
  assert.match(workflow, /node-version: 24/);
  assert.match(workflow, /run: npm run check:release/);
});
