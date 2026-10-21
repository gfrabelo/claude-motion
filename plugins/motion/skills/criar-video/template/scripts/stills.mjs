// Renderiza frames soltos (um bundle só) para revisão rápida em out/stills.
// usage: node scripts/stills.mjs 40 85 96 ...
import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition, openBrowser } from "@remotion/renderer";

const frames = process.argv.slice(2).map(Number);
fs.rmSync("out/stills", { recursive: true, force: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browser = await openBrowser("chrome", process.env.REMOTION_CHROME ? { browserExecutable: process.env.REMOTION_CHROME } : {});
const composition = await selectComposition({ serveUrl, id: "Video", puppeteerInstance: browser });
for (const frame of frames) {
  const output = path.resolve(`out/stills/f${String(frame).padStart(4, "0")}.jpg`);
  await renderStill({ serveUrl, composition, frame, output, imageFormat: "jpeg", jpegQuality: 80, puppeteerInstance: browser, scale: 0.5 });
  console.log(output);
}
await browser.close({ silent: true });
