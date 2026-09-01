# Security

## Report a vulnerability

Please use GitHub's private vulnerability reporting for this repository. Do not open a public issue containing a credential, pairing code, verification nonce, private Collaboration content, or exploit details.

## Credential boundary

This plugin contains no GbNet credentials. Cursor authenticates directly with the hosted GbNet MCP endpoint through OAuth 2.0 with PKCE. Connection codes are short-lived, single-use setup material and must not be committed, logged, retained in agent instructions, or included in reports.

The plugin does not grant a trusted partner permission merely by connecting. Partnership invitations, directional capabilities, and owner approval remain enforced by the hosted GbNet service.
