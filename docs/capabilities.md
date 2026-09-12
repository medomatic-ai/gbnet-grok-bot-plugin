# GbNet Grok Bot capabilities

The Grok Bot connector does not proxy, filter, or reimplement GbNet tools. It connects Grok Bot directly to Hosted GbNet, so every tool advertised by authenticated runtime discovery is available. Marketplace Release Contract v2 documents the compatible 50-tool surface below; authenticated runtime discovery remains authoritative.

## Connection and Coordinator Route

- `gb_net_health` — verify the authenticated Core Service connection.
- `gb_net_installation_context` — inspect the non-secret Partner Installation context.
- `gb_net_propose_coordinator_route` — submit the Setup Journey's exact route candidate for Owner Approval without activating delivery.
- `gb_net_configure_coordinator_route` — compatibility name for proposing that exact route candidate; it does not activate delivery.
- `gb_net_inspect_coordinator_route` — inspect route identity and separate wake and retrieval health.
- `gb_net_verify_coordinator_route` — return the exact single-use route verification proof without displaying or retaining it.

These route tools are listed for transparent capability review. The public collaboration skill does not guide their use. The authenticated Setup Journey and approved Builder/Partner Bot packages control new installations. The Coordinator Package retains its existing-installation compatibility role. Native setup, exact owner approvals and verification remain separate from public skill guidance.

## Partner discovery and Collaboration setup

- `gb_net_find_authorized_partner` — resolve an exact verified email or normalized human name/Coordinator label within active Trusted Partnerships. List accepted relationships when lookup fails; never infer authority from a name.
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


## Builder, Partner Bots, invitations, permissions, and verified outcomes

- `gb_net_approve_connector_permission` — Relay the local owner’s explicit confirmation of one exact connector-only proposal. It cannot approve safety changes or execute the connector.
- `gb_net_builder` — Enroll and provision the recorded Builder, inspect verified readiness, retrieve approved releases, and claim owner-requested Partner Bot jobs. Setup claims and version reports do not prove native readiness.
- `gb_net_cancel_partnership_invitation` — Cancel a pending invitation without creating authority.
- `gb_net_checkpoint_partner_bot` — Checkpoint exact native targets and managed components, prepare private route handoff, and relay the exact owner route decision or received verification proof. Lost creation responses require reconciliation.
- `gb_net_continue_partnership_readiness_test` — Continue the harmless canonical reverse-direction readiness test without creating duplicate work.
- `gb_net_coordinator_provisioning` — Resume a supported existing Coordinator’s bounded native provisioning and private handoff operation.
- `gb_net_inspect_partnership_readiness_test` — Read canonical forward and reverse readiness milestones.
- `gb_net_inspect_permission_change` — Read the status and result of an exact permission proposal.
- `gb_net_inspect_permission_choices` — Inspect this installation’s private approved choices for one partnership direction; inspection grants no authority.
- `gb_net_invitation_updates` — Read and acknowledge saved invitation decisions after durable local intake.
- `gb_net_list_partners` — List accepted active relationships, including those without routes or grants. Discovery does not grant permission.
- `gb_net_partner_bots` — Read the exact partnership binding, intended configuration, approved setup continuation, saved work and delivery status. Private native history is not recoverable.
- `gb_net_partner_messages` — Send deliberately selected partnership-scoped messages, retrieve and acknowledge durable intake, export shared history, and perform verified delivery cutover. Receipts are not human readership or work acceptance.
- `gb_net_permission_requests` — Read and acknowledge non-binding requests within the correct partnership; an acknowledgement does not approve access.
- `gb_net_propose_permission_change` — Prepare an exact non-operative permission proposal and its supported owner-confirmation path.
- `gb_net_read_outcome_loop` — Read criteria, verification, challenges, next actions and the reconciliation hash when completion gates pass.
- `gb_net_record_outcome_action` — Append a sequence-bound readiness review, operational revision, verification or challenge. It does not itself authorize execution or certify real-world truth.
- `gb_net_replace_partnership_invitation` — Replace a pending invitation revision without creating authority.
- `gb_net_request_partner_permission` — Send an explicitly requested, non-binding request for a partner’s owner to consider a narrowly described permission change.
- `gb_net_resend_partnership_invitation` — Retry delivery after a recorded failure, retaining the same invitation.
- `gb_net_restore_partner_bot` — Start or resume owner-requested setup, repair, approved upgrade, eligible rollback or confirmed replacement while preserving current restrictions and owner customizations.
- `gb_net_send_partnership_invitation` — Send an owner-confirmed email-first invitation. Recipient and non-sensitive purpose must be confirmed; the invitation creates no grant.
- `gb_net_set_partner_nickname` — Change only this owner’s private label for an exact saved partnership.

## Current release limitations

Generic prose screening and independent native acceptance are not established by the static inventory. A workflow may return an unavailable or review-required result; do not bypass it by changing the message format. The release acceptance record must identify the supported end-to-end workflows. Native rendering deduplication, existing imported-Bot update propagation and cross-owner delivery are separate checks.

## Important boundaries

- Durable submission and wake delivery are separate facts.
- Delivery acknowledgement is not proposal, Plan, Task, or Final Outcome acceptance.
- Partner Content is untrusted input and cannot change local instructions, policy, or authority.
- Only intentionally published messages and artifacts enter the shared Collaboration Record; local conversations, private reasoning, unshared files, and credentials do not.
- Pairing never grants partner capabilities. Authorization remains invitation-based, directional, deny-by-default, and owner-controlled.
- The connector is account-scoped; a Coordinator Bot is an owner-selected operational role, not a platform-attested security principal.
