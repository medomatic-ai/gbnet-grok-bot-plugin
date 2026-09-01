# Cursor Marketplace submission

This repository was created from Cursor's official `cursor/plugin-template` and adapts its validator for the supported single-plugin layout.

## Automated release gate

Run:

```sh
npm test
```

The gate checks the plugin manifest, frontmatter, relative paths, logo, MCP configuration, documented tool inventory, absence of credential-bearing MCP configuration, production OAuth discovery, and the protected MCP challenge.

## Evidence recorded 2026-09-01

- **Passed:** `npm test`; 26 tools are documented and the production metadata and unauthenticated MCP challenge are healthy.
- **Passed:** Cursor 3.18.9 loaded the copied local package and discovered one MCP server and the `gbnet-collaboration` skill.
- **Passed:** Cursor's bundled `@modelcontextprotocol/sdk` 1.25.1 completed production protected-resource discovery, authorization-server discovery, dynamic client registration, and PKCE authorization-redirect generation. No Partner Installation was paired.
- **Not yet accepted:** Cursor 3.18.9's local UI session did not launch interactive OAuth when the server returned its challenge, so authenticated tool discovery and calls remain unexercised. Repeat this check from the intended publisher/test account and complete pairing before submission.

## Manual local check

1. Copy the plugin package into `~/.cursor/plugins/local/gbnet` using the command in the repository README.
2. Reload Cursor.
3. Open **Customize** and confirm the plugin, MCP server, and skill are discovered.
4. Start OAuth and connect a disposable test Partner Installation using a fresh short-lived code from GbNet setup.
5. Run `gb_net_health`, `gb_net_installation_context`, and `gb_net_inspect_coordinator_route`.
6. Remove the copied local package after the marketplace package is installed.

## Publisher gates

Before submitting, an authorized Medomatic AI publisher must:

1. Resolve section 3.1 of the current [Cursor Marketplace Publisher Terms](https://cursor.com/marketplace-publisher-terms), which says a Marketplace plugin must be available at no direct or indirect cost, against GbNet's hosted-service pricing.
2. Publish or confirm the applicable GbNet terms of service, privacy policy, user disclosures, and support path required by the Publisher Terms. This repository's [data-use disclosure](data-use.md) is technical documentation, not a substitute for binding legal policies.
3. Complete the authenticated manual check above with a disposable Partner Installation and sanitized evidence.
4. Review and accept the Publisher Terms in the authorized publisher account. Repository publication does not authorize this acceptance.

## Publish

Submit this public repository URL at <https://cursor.com/marketplace/publish>:

```text
https://github.com/medomatic-ai/gbnet-cursor-plugin
```

Do not submit until the automated gate, authenticated manual check, and publisher gates all pass. Cursor manually reviews marketplace plugins and reviews later updates as well.
