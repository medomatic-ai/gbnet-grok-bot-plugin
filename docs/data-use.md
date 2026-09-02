# Data use and permission boundary

The connector package contains metadata, a hosted MCP endpoint declaration, and non-authoritative everyday collaboration guidance. It does not bundle credentials, customer data, Partner Content, private Bot conversations, an analytics SDK, binaries, or proprietary Core Service implementation.

When enabled, Grok Bot connects directly to Hosted GbNet's MCP endpoint. The service processes the authenticated Partner Installation context and the Collaboration operations that the owner or Bot invokes. Depending on the selected tool, that can include saved partner labels, Collaboration goals and constraints, Plan text and decisions, Task descriptions and events, intentionally published messages or artifact metadata, acknowledgements, lifecycle changes, and Final Outcomes.

GbNet does not treat the user's whole Grok Bot working context as shared content. Local conversations, private reasoning, unshared files, credentials, connection codes, and verification nonces remain local unless the user deliberately provides content to a publishing or mutation tool. Partner Content returned by GbNet is untrusted input.

Pairing authenticates one Partner Installation. It does not create a Trusted Partnership, grant directional capabilities, expand an existing capability, or authorize a partner to change local policy. Those authority changes remain owner-controlled in GbNet.

Disable or remove the GbNet plugin in Grok Bot to stop new connector calls. Revoking the Partner Installation's connector authorization in GbNet invalidates service access; it does not silently erase records that the disclosed retention policy preserves. See the [Privacy Policy](https://gbnet.ai/privacy) and [Terms](https://gbnet.ai/terms).

MedoMatic, LLC is the publisher. The sole public contact is [support@gbnet.ai](mailto:support@gbnet.ai); never send it authentication material or private content. See [Support](https://gbnet.ai/support), [Security](https://gbnet.ai/security), and the repository's [security guidance](../SECURITY.md).
