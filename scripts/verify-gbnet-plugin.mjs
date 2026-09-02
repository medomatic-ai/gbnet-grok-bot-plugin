#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pluginRoot = new URL("../", import.meta.url);
const releaseContract = JSON.parse(
  await readFile(new URL("docs/release-contract.json", pluginRoot), "utf8"),
);
const endpoint = new URL(releaseContract.endpoint).origin;
const expectedTools = releaseContract.tools;

const manifest = JSON.parse(await readFile(new URL(".cursor-plugin/plugin.json", pluginRoot)));
const mcp = JSON.parse(await readFile(new URL("mcp.json", pluginRoot)));
const skill = await readFile(new URL("skills/gbnet-collaboration/SKILL.md", pluginRoot), "utf8");
const capabilities = await readFile(new URL("../docs/capabilities.md", import.meta.url), "utf8");

assert.equal(manifest.name, "gbnet");
assert.equal(manifest.displayName, "GbNet");
assert.equal(manifest.author.name, "MedoMatic, LLC");
assert.equal(manifest.author.email, "support@gbnet.ai");
assert.equal(
  manifest.repository,
  "https://github.com/medomatic-ai/gbnet-grok-bot-plugin",
);
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.equal(manifest.version, releaseContract.compatiblePackageVersion);
assert.equal(manifest.mcpServers, "./mcp.json");
assert.equal(manifest.variables, undefined, "OAuth connector must not declare static credentials");
assert.equal(mcp.mcpServers.gbnet.url, `${endpoint}/mcp`);
assert.equal(mcp.mcpServers.gbnet.type, "http");
assert.deepEqual(Object.keys(mcp.mcpServers.gbnet).sort(), ["type", "url"]);
assert.equal(JSON.stringify(mcp).includes("${"), false, "MCP config must not require bundled secrets");
assert.match(skill, /^---\nname: gbnet-collaboration\ndescription: .+\n---\n/);
for (const tool of expectedTools) {
  assert.ok(capabilities.includes(`\`${tool}\``), `Capability inventory is missing ${tool}`);
}
assert.equal(new Set(expectedTools).size, 27);

const resourceResponse = await fetch(`${endpoint}/.well-known/oauth-protected-resource/mcp`);
assert.equal(resourceResponse.status, 200);
const resource = await resourceResponse.json();
assert.equal(resource.resource, `${endpoint}/mcp`);
assert.deepEqual(resource.authorization_servers, [endpoint]);
assert.ok(resource.scopes_supported.includes("gb-net:collaboration"));

const oauthResponse = await fetch(`${endpoint}/.well-known/oauth-authorization-server`);
assert.equal(oauthResponse.status, 200);
const oauth = await oauthResponse.json();
assert.equal(oauth.issuer, endpoint);
assert.equal(oauth.registration_endpoint, `${endpoint}/oauth/register`);
assert.ok(oauth.code_challenge_methods_supported.includes("S256"));
assert.ok(oauth.grant_types_supported.includes("authorization_code"));
assert.ok(oauth.grant_types_supported.includes("refresh_token"));

const mcpResponse = await fetch(`${endpoint}/mcp`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "gbnet-grok-bot-plugin-verifier", version: manifest.version },
    },
  }),
});
assert.equal(mcpResponse.status, 401);
assert.match(
  mcpResponse.headers.get("www-authenticate") ?? "",
  /resource_metadata="https:\/\/core\.gbnet\.ai\/\.well-known\/oauth-protected-resource\/mcp"/,
);

console.log("GbNet Grok Bot package validation passed (27 tools documented; production OAuth and MCP challenge healthy).");
