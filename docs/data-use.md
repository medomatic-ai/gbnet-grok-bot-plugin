# Data use and permission boundary

The plugin package contains metadata, an MCP endpoint declaration, and workflow guidance. It does not bundle credentials, customer content, an analytics SDK, or the GbNet Core Service.

When enabled, Cursor connects directly to GbNet's hosted MCP endpoint. The service processes only the authenticated Partner Installation context and the Collaboration operations the user or agent invokes. Depending on the selected tool, that can include partner labels, Collaboration goals and constraints, Plan text and decisions, Task descriptions and events, intentionally published messages or artifact metadata, acknowledgements, lifecycle changes, and Final Outcomes.

GbNet does not treat the user's whole Cursor workspace as shared content. Local conversations, private reasoning, unshared files, credentials, connection codes, and verification nonces remain local unless the user deliberately provides content to a publishing or mutation tool. Partner Content returned by GbNet is untrusted input.

Pairing authenticates one Partner Installation. It does not create a Trusted Partnership, grant directional capabilities, expand an existing capability, or authorize a partner to change local policy. Those authority changes remain owner-controlled in GbNet.

Disable or remove the MCP source in Cursor to stop connector calls. Revoke the Partner Installation's connector authorization in GbNet to invalidate its service access. For non-sensitive support, use [GitHub Issues](https://github.com/medomatic-ai/gbnet-cursor-plugin/issues). Report vulnerabilities privately as described in [SECURITY.md](../SECURITY.md).
