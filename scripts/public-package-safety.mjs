import path from "node:path";

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
  String.raw`\b(?:oauth[_-]?token|access[_-]?token|refresh[_-]?token|client[_-]?secret|connection[_-]?code|route[_-]?(?:credential|key)|webhook[_-]?key|verification[_-]?nonce|password)\s*[:=]\s*["'][^"'\s$]{12,}["']`,
  "i",
);
const tokenPatterns = [
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
];

export function isProhibitedBinaryPath(relativePath) {
  return prohibitedExtensions.has(path.extname(relativePath).toLowerCase());
}

export function inspectPublicText(relativePath, text) {
  const findings = [];
  for (const [label, signature] of signatureFragments) {
    if (text.includes(signature)) findings.push(`${relativePath}: ${label} signature`);
  }
  if (assignmentPattern.test(text)) findings.push(`${relativePath}: credential assignment`);
  for (const pattern of tokenPatterns) {
    if (pattern.test(text)) findings.push(`${relativePath}: token signature`);
  }
  return findings;
}
