// Corrige palavras que o Whisper erra (nomes, marcas, @), mantendo os tempos.
// Edite fixes.json: [{ "de": "Cloud", "para": "Claude" }, { "de": "vídeo", "para": "VIDEO", "depoisDe": "comenta" }]
import fs from "node:fs";

const words = JSON.parse(fs.readFileSync("transcript.raw.json", "utf8"));
const fixes = fs.existsSync("fixes.json") ? JSON.parse(fs.readFileSync("fixes.json", "utf8")) : [];
const norm = (s) => s.trim().toLowerCase().replace(/[^\p{L}\p{N}@]/gu, "");
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const fixed = words.map((w, i) => {
  let text = w.text;
  for (const { de, para, depoisDe } of fixes) {
    if (depoisDe && norm(words[i - 1]?.text ?? "") !== norm(depoisDe)) continue;
    text = text.replace(new RegExp(`^(\\s*)${esc(de)}`), `$1${para}`);
  }
  return { ...w, text };
});
fs.writeFileSync("transcript.json", JSON.stringify(fixed, null, 2));
console.log(fixed.map((w) => w.text).join(""));
