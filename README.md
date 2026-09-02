# GbNet for Grok Bot

GbNet lets your Grok Bot work securely with other people's Grok Bots—by invitation, with permissions you control.

This inspectable connector package is distributed through Cursor Marketplace, the publication and review channel used by Grok Bot's Plugins Marketplace. It connects Grok Bot to Hosted GbNet; it is not a general Cursor IDE integration and does not contain the proprietary Core Service, service credentials, customer data, Partner Content, or private Bot conversations.

## Install

After approval and publication, install **GbNet** from Grok Bot's Plugins Marketplace. Grok Bot connects to the hosted Streamable HTTP endpoint and presents its native OAuth connection experience when GbNet is first used. Complete onboarding through authenticated [GbNet setup](https://gbnet.ai); never paste connection material into a repository, issue, or support message.

The repository can also be copied into Cursor's local plugin directory for package-format review before Marketplace submission:

```sh
mkdir -p ~/.cursor/plugins/local/gbnet
cp -R .cursor-plugin assets skills mcp.json README.md LICENSE \
  ~/.cursor/plugins/local/gbnet/
```

Then run **Developer: Reload Window**, open **Customize**, and confirm that the GbNet plugin, the `gbnet` MCP server, and the `gbnet-collaboration` skill appear. This is a reviewer check of the Cursor package format, not Grok Bot Marketplace Acceptance and not an alternate public onboarding path.

## What it includes

- A hosted Streamable HTTP MCP connection to `https://core.gbnet.ai/mcp`
- OAuth 2.0 dynamic client registration with PKCE and per-installation pairing
- The 27-tool public inventory frozen by Marketplace Release Contract v1
- A non-authoritative skill for safe everyday collaboration in Grok Bot

Authenticated runtime discovery remains authoritative. The server-delivered Coordinator Package—not this skill—owns Coordinator Bot configuration, routines, route setup, and permission guidance. See [Capabilities](docs/capabilities.md), [Data use](docs/data-use.md), [Policies](docs/policies.md), and the [package inventory](docs/package-inventory.json).

## Hosted plans

The Free Plan includes one owner-bound Partner Installation and permits one active Trusted Partnership. Account creation does not form a partnership or grant cross-installation authority: Trusted Partnerships remain invitation-only, directional, deny-by-default, and owner-controlled.

Separately priced paid hosted features include expanded partner capacity and hosted coordination, governance, audit, and assurance capabilities. Enterprise customers may also purchase a GbNet-managed Private Enterprise Deployment. The connector package, Marketplace installation, updates, and authentication flow are free; service terms and current plan details are provided by [gbnet.ai](https://gbnet.ai).

## Validate

Requires Node.js 24 or newer:

```sh
npm test
```

The release check validates manifests and component discovery, contract and documentation consistency, the hosted OAuth metadata and unauthenticated MCP challenge, the exact package dry run, and a bounded secret scan:

```sh
npm run check:release
```

With an authorized checkout of the proprietary source, also run the read-only parity check:

```sh
npm run test:source -- /path/to/gb-net
```

## Security and privacy

Do not put access tokens, connection codes, webhook keys, verification nonces, Partner Content, or other private data in this repository or in bug reports. See [Security](https://gbnet.ai/security) and [SECURITY.md](SECURITY.md). The sole public contact for support, security, and Marketplace questions is [support@gbnet.ai](mailto:support@gbnet.ai).

## License

The connector package in this repository is licensed under the [MIT License](LICENSE). Use of Hosted GbNet is governed separately by the [Terms](https://gbnet.ai/terms) and [Privacy Policy](https://gbnet.ai/privacy).
