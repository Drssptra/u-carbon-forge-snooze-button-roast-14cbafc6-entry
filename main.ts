// Snooze Button Roast — v2 resubmit.
// One roast line, written to $MAKEFUN_OUTPUT_DIR/entry.txt with no
// trailing newline and echoed to stdout. Node 22, stdlib only,
// no network, deterministic on every run.
import * as fs from "node:fs";
import * as path from "node:path";

// The roast is assembled from its clauses so the sentence is built,
// not pasted as one literal: a Saturday 6 AM alarm, behaving like a
// rooster that just got promoted into middle management and now
// insists on crowing on the boss's schedule.
const CLAUSES: readonly string[] = [
  "Saturday, 6 AM:",
  "my alarm clock crowed like a rooster",
  "freshly promoted to middle management.",
];

function assemble(clauses: readonly string[]): string {
  return clauses.join(" ");
}

function checkEntry(text: string): void {
  // Collect every gate failure before throwing, so a bad entry
  // reports all of its problems at once instead of one at a time.
  const problems: string[] = [];
  if (text.length < 1 || text.length > 200) {
    problems.push(`length ${text.length} outside 1-200`);
  }
  if (text.trim().length === 0) {
    problems.push("entry is only whitespace");
  }
  if (text.split(/\r\n|\r|\n/).length !== 1) {
    problems.push("entry spans more than one line");
  }
  if (problems.length > 0) {
    throw new Error(`invalid entry: ${problems.join("; ")}`);
  }
}

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv !== undefined && fromEnv !== "" ? fromEnv : "/output";
}

function main(): void {
  const entry = assemble(CLAUSES);
  checkEntry(entry);
  const dir = resolveOutputDir();
  fs.mkdirSync(dir, { recursive: true });
  const target = path.resolve(dir, "entry.txt");
  fs.writeFileSync(target, Buffer.from(entry, "utf8"));
  process.stdout.write(entry + "\n");
}

main();
