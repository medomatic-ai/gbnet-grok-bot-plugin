#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  inspectPublicText,
  isProhibitedBinaryPath,
} from "./public-package-safety.mjs";

const execFileAsync = promisify(execFile);
const repoRoot = process.cwd();
const { stdout } = await execFileAsync(
  "git",
  ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
  {
    cwd: repoRoot,
    encoding: "buffer",
  },
);
const files = stdout
  .toString("utf8")
  .split("\0")
  .filter(Boolean);

const findings = [];

for (const relativePath of files) {
  if (isProhibitedBinaryPath(relativePath)) {
    findings.push(`${relativePath}: prohibited binary extension`);
    continue;
  }

  const content = await readFile(path.join(repoRoot, relativePath));
  if (content.includes(0)) {
    findings.push(`${relativePath}: binary content`);
    continue;
  }

  const text = content.toString("utf8");
  findings.push(...inspectPublicText(relativePath, text));
}

assert.deepEqual(
  findings,
  [],
  `Public package secret scan found ${findings.length} unsafe file(s):\n${findings.join("\n")}`,
);
console.log(`Public package secret scan passed (${files.length} tracked files inspected; no values printed).`);
