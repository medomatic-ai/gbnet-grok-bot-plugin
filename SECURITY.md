# Security

## Report a vulnerability

Use GitHub's private vulnerability reporting for repository vulnerabilities, or contact the sole public support and security address, [support@gbnet.ai](mailto:support@gbnet.ai). Do not open a public issue containing a credential, connection code, route credential, verification nonce, Partner Content, private Bot conversation, or exploit detail. The public service security page is [https://gbnet.ai/security](https://gbnet.ai/security).

## Credential boundary

This plugin contains no GbNet credentials. Grok Bot authenticates directly with the hosted GbNet MCP endpoint through OAuth 2.0 with PKCE. Connection codes are short-lived, single-use setup material and must not be committed, logged, retained in agent instructions, or included in reports.

The connector does not grant a trusted partner permission merely by connecting. Partnership invitations, directional capabilities, and Owner Approval remain enforced by Hosted GbNet. Security terms and data handling are described at [https://gbnet.ai/terms](https://gbnet.ai/terms) and [https://gbnet.ai/privacy](https://gbnet.ai/privacy).
