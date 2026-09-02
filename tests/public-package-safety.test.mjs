import assert from "node:assert/strict";
import test from "node:test";

import { inspectPublicText } from "../scripts/public-package-safety.mjs";

const sensitiveAssignment = (name) => `${name}="${"z".repeat(24)}"`;

test("secret scanning covers every protected setup-material class", () => {
  for (const name of [
    ["oauth", "token"].join("_"),
    ["access", "token"].join("_"),
    ["refresh", "token"].join("_"),
    ["client", "secret"].join("_"),
    ["connection", "code"].join("_"),
    ["route", "credential"].join("_"),
    ["webhook", "key"].join("_"),
    ["verification", "nonce"].join("_"),
    "password",
  ]) {
    assert.deepEqual(inspectPublicText("candidate.txt", sensitiveAssignment(name)), [
      "candidate.txt: credential assignment",
    ]);
  }
});

test("secret scanning accepts public documentation about protected material", () => {
  assert.deepEqual(
    inspectPublicText(
      "README.md",
      "Never publish OAuth tokens, connection codes, route credentials, or verification nonces.",
    ),
    [],
  );
});
