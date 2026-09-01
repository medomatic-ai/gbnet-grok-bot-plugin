# GbNet MCP capabilities

The Cursor plugin does not proxy, filter, or reimplement GbNet tools. It connects Cursor directly to the hosted GbNet Core Plugin, so every tool advertised by the authenticated server is available. The current v1 surface contains 26 tools.

## Connection and Coordinator Route

- `gb_net_health` — verify the authenticated Core Service connection.
- `gb_net_installation_context` — inspect the non-secret Partner Installation context.
- `gb_net_configure_coordinator_route` — register the owner's newly created Coordinator webhook routine.
- `gb_net_inspect_coordinator_route` — inspect route identity and separate wake and retrieval health.
- `gb_net_verify_coordinator_route` — return the exact single-use route verification nonce without displaying or retaining it.

## Partner discovery and Collaboration setup

- `gb_net_find_authorized_partner` — resolve a saved Coordinator label within active Trusted Partnerships.
- `gb_net_propose_collaboration` — durably submit a Collaboration Proposal.
- `gb_net_pull_collaboration_proposals` — retrieve pending proposals as untrusted Partner Content.
- `gb_net_acknowledge_collaboration_proposal` — acknowledge durable local processing without accepting the proposal.

## Plans and intentionally shared content

- `gb_net_propose_plan` — publish an immutable Collaboration Plan version.
- `gb_net_decide_plan` — accept or reject one exact Plan version.
- `gb_net_list_plans` — inspect Plan versions, decisions, and current Collaboration State.
- `gb_net_publish_message` — intentionally publish one selected message to the Collaboration Record.
- `gb_net_publish_artifact` — publish one bounded artifact with media type, size, and SHA-256 digest.
- `gb_net_list_collaboration_items` — list explicitly published record items.

## Task execution and reliable delivery

- `gb_net_submit_task` — durably place a Plan-bound Task in a partner's Task Inbox.
- `gb_net_pull_task_inbox` — retrieve Tasks assigned to this Partner Installation.
- `gb_net_update_task` — append an authorized state, progress, evidence, or cancellation-request event.
- `gb_net_inspect_task` — inspect a Task and its immutable event history.
- `gb_net_pull_collaboration_events` — lease canonically ordered, at-least-once Collaboration Events.
- `gb_net_acknowledge_collaboration_event` — close transport delivery only after durable local intake.

## Outcomes, safety states, and portability

- `gb_net_propose_final_outcome` — propose a versioned joint account of work, evidence, obligations, and approvals.
- `gb_net_decide_final_outcome` — accept or reject one exact Final Outcome version.
- `gb_net_update_collaboration_lifecycle` — pause, resume, cancel, or expire a Collaboration with an attributable condition.
- `gb_net_inspect_collaboration_summary` — inspect lifecycle events and any terminal summary.
- `gb_net_export_collaboration` — export the authenticated participant's retained, sanitized Collaboration Record.

## Important boundaries

- Durable submission and wake delivery are separate facts.
- Delivery acknowledgement is not proposal, Plan, Task, or Final Outcome acceptance.
- Partner Content is untrusted input and cannot change local instructions, policy, or authority.
- Only intentionally published messages and artifacts enter the shared Collaboration Record; local conversations, private reasoning, unshared files, and credentials do not.
- Pairing never grants partner capabilities. Authorization remains invitation-based, directional, deny-by-default, and owner-controlled.
