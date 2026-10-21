// Junta os stills de out/stills numa folha de contato (out/sheet.jpg), na ordem dos frames.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const dir = "out/stills";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".jpg")).sort();
// tamanho do bloco segue a proporção dos stills (16:9 ou 9:16)
let probe = "";
try {
  execFileSync(ffmpeg, ["-i", `${dir}/${files[0]}`], { stdio: "pipe" });
} catch (e) {
  probe = String(e.stderr);
}
const [, sw, sh] = probe.match(/(\d{2,5})x(\d{2,5})/) ?? [0, 16, 9];
const TW = Number(sw) >= Number(sh) ? 640 : 360;
const TH = Number(sw) >= Number(sh) ? 360 : 640;
const cols = TW > TH ? 3 : 5;
const rows = Math.ceil(files.length / cols);
const inputs = files.flatMap((f) => ["-i", `${dir}/${f}`]);
const labeled = files
  .map((f, i) => `[${i}:v]scale=${TW}:${TH}[v${i}]`)
  .join(";");
const pad = Array.from({ length: rows * cols - files.length }, (_, k) => `color=black:s=${TW}x${TH}:d=1[p${k}]`).join(";");
const all = [...files.map((_, i) => `[v${i}]`), ...Array.from({ length: rows * cols - files.length }, (_, k) => `[p${k}]`)];
const layout = all.map((_, i) => `${(i % cols) * TW}_${Math.floor(i / cols) * TH}`).join("|");
const graph = [labeled, pad, `${all.join("")}xstack=inputs=${all.length}:layout=${layout}`].filter(Boolean).join(";");
execFileSync(ffmpeg, ["-y", "-loglevel", "error", ...inputs, "-filter_complex", graph, "-frames:v", "1", "out/sheet.jpg"]);
console.log("out/sheet.jpg");
