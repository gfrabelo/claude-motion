// Acelera a narração sem mudar o tom (atempo). Depois ajuste SPEED em src/sync/cues.ts.
// usage: node scripts/speed.mjs 1.15
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const speed = Number(process.argv[2] ?? 1.15);
const out = `public/narracao.${speed}x.mp3`;
execFileSync(ffmpeg, ["-y", "-loglevel", "error", "-i", "public/narracao.mp3", "-filter:a", `atempo=${speed}`, "-b:a", "192k", out]);
console.log(`${out}  →  agora coloque SPEED = ${speed} em src/sync/cues.ts`);
