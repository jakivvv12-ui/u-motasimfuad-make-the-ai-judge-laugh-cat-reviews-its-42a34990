// One-star review, written in the voice of a house cat about its human.
// Writes a single line (no trailing newline) to $MAKEFUN_OUTPUT_DIR/entry.txt.
const fs = require("fs");
const path = require("path");

const REVIEW =
  "One star. My human bought a $400 cat tree, then sulked when I chose the box. The box never judged me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outPath = path.join(outDir, "entry.txt");

const codePoints = [...REVIEW].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error("review must be 1-200 characters, got " + codePoints);
}
if (REVIEW.trim().length === 0) {
  throw new Error("review must not be whitespace-only");
}
if (/[\r\n]/.test(REVIEW)) {
  throw new Error("review must be a single line");
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, REVIEW, "utf8");

const roundTrip = fs.readFileSync(outPath, "utf8");
if (roundTrip !== REVIEW) {
  throw new Error("round-trip validation failed");
}
console.log("wrote " + outPath + " (" + codePoints + " chars, " + Buffer.byteLength(REVIEW, "utf8") + " bytes)");
