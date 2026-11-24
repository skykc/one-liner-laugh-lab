// One-Liner Laugh Lab: the excuse a robot vacuum gives after eating a sock.
//
// The line answers the prompt with one concrete image (the sock under the
// couch) and one twist (the vacuum did not eat it — it adopted it, and the
// sock now pays rent in lint). This program writes that single line to
// /output/entry.txt, where the house gate and judge read it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I didn't eat your sock. I adopted it. It lives under the couch now and pays rent in lint.";

const outDir = process.argv[2] ?? "/output";
const out = join(outDir, "entry.txt");

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} chars, gate wants 1-200`);
}
if (!LINE.trim()) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(out, LINE, "utf8");

// Read back and verify: the judged file must be exactly the reviewed line,
// one line, inside the 1-200 char gate — a truncated or altered write must
// never reach the judge.
const written = readFileSync(out, "utf8");
if (written !== LINE) {
  throw new Error(`write mismatch: file holds ${written.length} chars, expected ${LINE.length}`);
}
if (written.length < 1 || written.length > 200 || !written.trim()) {
  throw new Error(`written file fails the gate (${written.length} chars)`);
}
console.log(`wrote ${out} (${LINE.length} chars, verified round-trip)`);
