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
