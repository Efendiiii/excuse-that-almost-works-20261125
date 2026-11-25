// The Excuse That Almost Works — one-line entry (program/v1).
// Writes the single line a gamer texts the boss to skip work during
// GTA 6 launch week: at most 20 words, one line of plain text, 1-140 chars.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Sorry boss, my boiler's leaking into the flat downstairs and I have to wait in for the engineer.";

// Guard: the gate counts words (max 20) and characters (1-140).
const words = LINE.trim().split(/\s+/).filter(Boolean);
if (words.length > 20) {
  throw new Error(`word count ${words.length} exceeds the 20-word limit`);
}
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`character count ${LINE.length} outside the 1-140 gate`);
}
if (LINE !== LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back guard: the file on disk must itself hold at most 20 words.
const written = readFileSync("/output/entry.txt", "utf8");
const writtenWords = written.trim().split(/\s+/).filter(Boolean);
if (writtenWords.length > 20) {
  throw new Error(`written entry has ${writtenWords.length} words, exceeds 20`);
}
if (written !== LINE) {
  throw new Error("written entry does not match the guarded line");
}
