# Grok Bot Marketplace submission preparation

This repository is the inspectable Cursor-format package intended for distribution through Cursor Marketplace to Grok Bot's Plugins Marketplace. Cursor Marketplace is the distribution and review channel; Grok Bot is the product target.

## Automated package gate

Use Node.js 24 from a clean checkout of the exact candidate commit:

```sh
npm run check:release
npm run test:source -- /path/to/authorized/gb-net
git status --short --branch
```

`check:release` validates the manifest, component discovery, public release-contract projection, documentation and policy consistency, hosted OAuth metadata, unauthenticated MCP challenge, a bounded secret scan, and the exact `npm pack --dry-run` contents. `test:source` compares the package inventory with every literal Core Plugin registration and the committed Marketplace Release Contract in the authorized source checkout. It reads the source; it never copies proprietary implementation into this repository.

Public CI runs `npm run check:release` on Node.js 24 for every pull request and push to `main`. Preserve the successful workflow URL and commit SHA as sanitized evidence. A local pass does not substitute for CI on the pushed candidate.

## Human and downstream gates

Issue #63 prepares the package only. It does not establish Grok Bot compatibility, legal clearance, Marketplace submission, or public listing approval. Before an authorized MedoMatic, LLC representative submits the candidate, the wider release must also provide current evidence for:

1. unauthenticated [Terms](https://gbnet.ai/terms), [Privacy](https://gbnet.ai/privacy), [Support](https://gbnet.ai/support), and [Security](https://gbnet.ai/security) pages;
2. public Free onboarding and the one-active-Trusted-Partnership limit;
3. an authenticated, sanitized Grok Bot Marketplace Acceptance run through the intended public journey;
4. compatibility-path migration acceptance for an existing disposable installation;
5. Marketplace Legal Clearance by an authorized MedoMatic, LLC representative; and
6. that representative's review and acceptance of Cursor Publisher Terms and binding submission.

Agents must not accept legal terms or perform the binding submission. A successful package gate is necessary evidence, not a guarantee of approval or publication.

## Candidate application values

- Repository: `https://github.com/medomatic-ai/gbnet-grok-bot-plugin`
- Machine name: `gbnet`
- Display name: `GbNet`
- Publisher: `MedoMatic, LLC`
- Public contact: `support@gbnet.ai`
- Product: `https://gbnet.ai`
- MCP endpoint: `https://core.gbnet.ai/mcp`

Do not submit until the exact repository exists at the candidate URL, public CI passes on its current `main`, and all human and downstream gates above have current evidence.

## September 12 candidate and private marketplace gap

The refreshed candidate exposes 50 Core tools and the v2 release contract. Fresh onboarding uses the Installer, the owner's Builder, and a scoped Partner Bot for each Trusted Partnership; retained Coordinator installations remain a compatibility path. Do not use a historical Coordinator-only run as acceptance for the new journey.

Private marketplace testing is currently unavailable: the publisher account has no Teams/Enterprise marketplace, and the owner reported the Teams upgrade could not complete. The owner authorized available test paths with this gap documented. Package validation, source parity, protocol tests and custom-connector tests do not prove private marketplace distribution or installed-connector reuse. Record native acceptance as pending until actually observed; Cursor's reviewer may require additional evidence.

When a team marketplace becomes available, import the exact candidate, authenticate disposable accounts, and verify: tool discovery, reuse of the installed connector during Installer/Builder setup, one Free partnership, a deliberate Partner Message, permission denial before owner approval, revocation, and retained-installation reconnection without duplicate connectors. Preserve existing owner Bots and tests. Record only sanitized identifiers, versions, results and timestamps.

## Publisher form worksheet

The signed-in form at https://cursor.com/marketplace/publish was inspected on September 12, 2026. Proposed values for the authorized submitter to confirm:

| Field | Proposed value |
| --- | --- |
| Organization name | MedoMatic, LLC |
| Organization handle | medomatic (availability and final publisher namespace to confirm) |
| Contact email | support@gbnet.ai |
| Logotype URL | https://raw.githubusercontent.com/medomatic-ai/gbnet-grok-bot-plugin/main/assets/logo.svg |
| Description | GbNet lets your Grok Bot work with other people's Grok Bots by invitation, with permissions you control. |
| GitHub repository | https://github.com/medomatic-ai/gbnet-grok-bot-plugin |
| Website URL | https://gbnet.ai |
| Owner | Confirm the intended publisher owner; the inspected account displayed Individual · support@gbnet.ai. |

The Submit Application action accepts Publisher Terms. Preparation does not establish submission or approval. The form lists marketplace-publishing@cursor.com for publishing questions; contacting it is a separate authorized action.

## Updating after submission or publication

Keep the public source repository stable. Make the change, update the package version and changelog as appropriate, rerun validation and source parity, and preserve the exact successful CI commit. Follow the publisher's refresh/re-index process and retain the review result before claiming the updated version is live. A Git push alone is not evidence of public publication. Retest installed-client behavior when authentication, tools or onboarding change.

Cursor's [plugin reference](https://cursor.com/docs/reference/plugins) describes publication and re-indexing. The [Publisher Terms](https://cursor.com/marketplace-publisher-terms), section 2.1, reserve review of plugins and updates. [Team marketplace auto-refresh](https://cursor.com/docs/plugins) is a separate feature and should not be confused with public listing approval. Requirements were checked September 12, 2026 and should be rechecked at submission.
