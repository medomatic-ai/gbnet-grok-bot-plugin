#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

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

const prohibitedExtensions = new Set([
  ".a",
  ".bin",
  ".class",
  ".dll",
  ".dylib",
  ".exe",
  ".jar",
  ".o",
  ".pyc",
  ".so",
  ".wasm",
  ".zip",
]);
const signatureFragments = [
  ["private key", ["-----BEGIN ", "PRIVATE KEY-----"].join("")],
  ["GitHub token", ["github", "_pat_"].join("")],
  ["Slack token", ["xox", "b-"].join("")],
];
const assignmentPattern = new RegExp(
  String.raw`\b(?:access[_-]?token|refresh[_-]?token|client[_-]?secret|password|webhook[_-]?key)\s*[:=]\s*["'][^"'\s$]{12,}["']`,
  "i",
);
const tokenPatterns = [
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
];
const findings = [];

for (const relativePath of files) {
  if (prohibitedExtensions.has(path.extname(relativePath).toLowerCase())) {
    findings.push(`${relativePath}: prohibited binary extension`);
    continue;
  }

  const content = await readFile(path.join(repoRoot, relativePath));
  if (content.includes(0)) {
    findings.push(`${relativePath}: binary content`);
    continue;
  }

  const text = content.toString("utf8");
  for (const [label, signature] of signatureFragments) {
    if (text.includes(signature)) findings.push(`${relativePath}: ${label} signature`);
  }
  if (assignmentPattern.test(text)) findings.push(`${relativePath}: credential assignment`);
  for (const pattern of tokenPatterns) {
    if (pattern.test(text)) findings.push(`${relativePath}: token signature`);
  }
}

assert.deepEqual(
  findings,
  [],
  `Public package secret scan found ${findings.length} unsafe file(s):\n${findings.join("\n")}`,
);
console.log(`Public package secret scan passed (${files.length} tracked files inspected; no values printed).`);
