# Cursor Marketplace submission

This repository was created from Cursor's official `cursor/plugin-template` and adapts its validator for the supported single-plugin layout.

## Automated release gate

Run:

```sh
npm test
```

The gate checks the plugin manifest, frontmatter, relative paths, logo, MCP configuration, documented tool inventory, absence of credential-bearing MCP configuration, production OAuth discovery, and the protected MCP challenge.

When preparing a release alongside an authorized GbNet source checkout, also run:

```sh
npm run test:source -- /path/to/gb-net
```

This read-only check extracts every literal `server.registerTool(...)` name from the selected Core Plugin source and requires exact parity with the public connector inventory and capability documentation. It does not modify or publish the proprietary source.

## Evidence recorded 2026-09-01

- **Passed:** `npm test`; 26 tools are documented and the production metadata and unauthenticated MCP challenge are healthy.
- **Passed:** Cursor 3.18.9 loaded the copied local package and discovered one MCP server and the `gbnet-collaboration` skill.
- **Passed:** Cursor's bundled `@modelcontextprotocol/sdk` 1.25.1 completed production protected-resource discovery, authorization-server discovery, dynamic client registration, and PKCE authorization-redirect generation. No Partner Installation was paired.
- **Passed:** A clean isolated Cursor 3.18.9 local-plugin session surfaced the native **Connect with GbNet** authentication card after the agent requested the disconnected MCP server. This proves that Cursor recognizes the server's OAuth challenge and can route it into the interactive authorization flow.
- **Passed:** `npm run test:source -- /path/to/gb-net` matched all 26 tools in the current GbNet Core Plugin source to the public inventory and capability documentation.
- **Passed:** A freshly packed Core Plugin was queried through MCP `tools/list`; the 26 runtime-advertised tool names exactly matched `docs/tools.json`.
- **Passed:** The selected GbNet checkout's focused `tests/hosted-core-connector.test.ts` suite passed 7/7 cases covering full OAuth authorization, dynamic registration with an expiring connection code, authenticated Streamable HTTP tool discovery and calls, refresh, revocation, and fail-closed negative cases.
- **Passed:** GitHub private vulnerability reporting is enabled for the public repository, matching the reporting path documented in `SECURITY.md`.
- **Not yet accepted:** Selecting **Authenticate**, completing Partner Installation pairing, discovering the authenticated tool list, and making representative read/write calls remain unexercised. These steps create an OAuth client and require an authorized disposable test installation, so complete them explicitly before submission.

## Manual local check

1. Copy the plugin package into `~/.cursor/plugins/local/gbnet` using the command in the repository README.
2. Reload Cursor.
3. Open **Customize** and confirm the plugin, MCP server, and skill are discovered.
4. Start OAuth and connect a disposable test Partner Installation using a fresh short-lived code from GbNet setup.
5. Run `gb_net_health`, `gb_net_installation_context`, and `gb_net_inspect_coordinator_route`.
6. Remove the copied local package after the marketplace package is installed.

## Publisher gates

Before submitting, an authorized Medomatic AI publisher must:

1. Confirm the intended product/legal posture under sections 1.6 and 3.1 of the current [Cursor Marketplace Publisher Terms](https://cursor.com/marketplace-publisher-terms): the connector, installation, updates, and authentication flow are free, while any charge is for the separately described hosted GbNet service. Cursor's current authored and verified [Ahrefs](https://cursor.com/marketplace/cursor/ahrefs), [Semrush](https://cursor.com/marketplace/cursor/semrush), [Similarweb](https://cursor.com/marketplace/cursor/similarweb), and [Outreach](https://cursor.com/marketplace/cursor/outreach) plugins provide strong operating precedent for free connectors whose provider accounts require paid plans, subscriptions, seats, or credits, but the published Terms do not make that an express legal safe harbor.
2. Publish or confirm the applicable GbNet terms of service, privacy policy, user disclosures, and support path required by the Publisher Terms. This repository's [data-use disclosure](data-use.md) is technical documentation, not a substitute for binding legal policies.
3. Complete the authenticated manual check above with a disposable Partner Installation and sanitized evidence.
4. Review and accept the Publisher Terms in the authorized publisher account. Repository publication does not authorize this acceptance.

## Publish

Submit this public repository URL at <https://cursor.com/marketplace/publish>:

```text
https://github.com/medomatic-ai/gbnet-cursor-plugin
```

Do not submit until the automated gate, authenticated manual check, and publisher gates all pass. Cursor manually reviews marketplace plugins and reviews later updates as well.
