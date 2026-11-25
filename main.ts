// Snooze Button Roast — a one-line roast for make.fun
// The program writes the roast to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) with no trailing newline, and prints the
// same line to stdout. Node 22, stdlib only, no network, deterministic.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast: the alarm acts like a smug regular with brunch plans,
// and the sleeper is the staff it came to sack.
const ENTRY =
  "Saturday, 6 AM: my alarm went off like it had brunch reservations and I was the waiter it came to fire.";

// Gate: the scorer accepts 1 to 200 characters of non-whitespace text
// on a single line. Fail loudly here instead of writing an invalid entry.
const trimmed = ENTRY.trim();
if (ENTRY.length < 1 || ENTRY.length > 200 || trimmed.length === 0) {
  throw new Error(`entry length ${ENTRY.length} is outside the 1-200 gate`);
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

console.log(ENTRY);
