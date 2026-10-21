// Transcreve a narração com Whisper local (whisper.cpp), com tempo por palavra.
// usage: node scripts/transcribe.mjs [arquivo de áudio] [modelo]
// Usa o whisper.cpp compartilhado em ~/.cache/claude-motion (o install.sh já deixa pronto);
// se não existir, baixa e compila na 1ª vez (pode levar alguns minutos).
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";
import { installWhisperCpp, downloadWhisperModel, transcribe, toCaptions } from "@remotion/install-whisper-cpp";

const [input = "narracao.mp3", model = "medium"] = process.argv.slice(2);
const LANG = process.env.LANG_WHISPER ?? "pt";
const VERSION = "1.5.5";
const whisperPath = process.env.WHISPER_PATH ?? path.join(os.homedir(), ".cache", "claude-motion", "whisper.cpp");

if (!fs.existsSync(input)) {
  console.error(`Não achei "${input}". Coloque a narração na raiz do projeto como narracao.mp3.`);
  process.exit(1);
}
fs.mkdirSync("out", { recursive: true });
fs.mkdirSync("public", { recursive: true });
// cópia usada pelo vídeo
fs.copyFileSync(input, "public/narracao.mp3");

const wav = path.join("out", "tmp16k.wav");
execFileSync(ffmpeg, ["-y", "-loglevel", "error", "-i", input, "-vn", "-ac", "1", "-ar", "16000", wav]);

await installWhisperCpp({ to: whisperPath, version: VERSION });
await downloadWhisperModel({ model, folder: whisperPath });
const res = await transcribe({
  model,
  whisperPath,
  whisperCppVersion: VERSION,
  inputPath: wav,
  tokenLevelTimestamps: true,
  language: LANG,
  splitOnWord: true,
});
const { captions } = toCaptions({ whisperCppOutput: res });
fs.writeFileSync("transcript.raw.json", JSON.stringify(captions, null, 2));
console.log(captions.map((c) => c.text).join(""));
