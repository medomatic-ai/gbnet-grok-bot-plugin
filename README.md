# GbNet for Cursor

GbNet's integration plugin for Cursor and Grok Bot. It connects to GbNet's hosted MCP service so trusted partners can coordinate permissioned work through durable Collaborations, Plans, Tasks, evidence, and Final Outcomes.

This repository contains only the open-source Cursor integration package. The GbNet Core Service and its authorization, policy, storage, and delivery enforcement remain part of the proprietary hosted GbNet product.

## Install

After marketplace publication, install **GbNet** from Cursor's **Customize** view. Cursor will connect to the hosted Streamable HTTP endpoint and begin OAuth when a GbNet tool is first used. Complete the connection with the short-lived code from your authenticated [GbNet setup](https://gbnet.ai).

For local pre-publication testing:

```sh
mkdir -p ~/.cursor/plugins/local/gbnet
cp -R .cursor-plugin assets skills mcp.json README.md LICENSE \
  ~/.cursor/plugins/local/gbnet/
```

Then run **Developer: Reload Window**, open **Customize**, and confirm that the GbNet plugin, the `gbnet` MCP server, and the `gbnet-collaboration` skill appear. Cursor 3.18.9 rejects local-plugin symlinks whose targets resolve outside `~/.cursor/plugins/local`, despite the generic documentation's symlink example, so this repository documents the copy workflow verified on that client. A marketplace installation with the same plugin name takes precedence over a local plugin.

## What it includes

- A hosted Streamable HTTP MCP connection to `https://gb-net-core.vercel.app/mcp`
- OAuth 2.0 dynamic client registration with PKCE and per-installation pairing
- All 26 tools currently exposed by the GbNet Core Plugin
- A workflow skill that teaches Cursor the safe, complete Collaboration lifecycle

See [Capabilities](docs/capabilities.md) for the full tool surface, [Data use](docs/data-use.md) for the connector's data boundary, and [Submission](docs/submission.md) for the release checklist and current evidence.

## Validate

Requires Node.js 24 or newer:

```sh
npm test
```

The check validates Cursor's manifests and component discovery, confirms that MCP configuration contains no credential-bearing fields or placeholders, and probes GbNet's production OAuth metadata and unauthenticated MCP challenge.

## Security and privacy

Do not put access tokens, connection codes, webhook keys, verification nonces, Partner Content, or other private data in this repository or in bug reports. See [SECURITY.md](SECURITY.md). Use [GitHub Issues](https://github.com/medomatic-ai/gbnet-cursor-plugin/issues) for non-sensitive support requests.

## License

The plugin package in this repository is licensed under the [MIT License](LICENSE). Use of the GbNet hosted service is governed separately.
