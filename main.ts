// Monday Morning Punchlines — make.fun entry.
//
// Writes one joke about Monday mornings to /output/entry.txt:
// a single line of at most 200 characters. Pure Node standard
// library; deterministic; no network, no input.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The joke: not a complaint about Mondays and not an alarm-clock
// cliche — the bed itself sues for custody, so the punchline lands
// on Monday morning, with a surprise twist, in one sentence.
const LINE =
  "Monday morning, my bed filed for custody of me — and honestly, the judge would side with the bed.";

// The gate: /output/entry.txt must be UTF-8 text of 1-200 characters,
// not only whitespace, and the line must stand alone as one sentence.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim() !== LINE || /\s\s/.test(LINE)) {
  throw new Error("line must have no leading/trailing or double whitespace");
}
const sentences = LINE.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 1) {
  throw new Error(`expected exactly one sentence, got ${sentences.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written: fail loudly here instead of at the gate.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line");
}
