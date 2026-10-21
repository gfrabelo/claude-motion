import raw from "../../transcript.json";
import { FPS } from "../theme";

export type Word = { text: string; startMs: number; endMs: number };

/**
 * Velocidade da narração. O áudio é acelerado por `scripts/speed.mjs`
 * (atempo, sem mudar o tom); aqui só escalamos os timestamps.
 */
export const SPEED: number = 1;
export const AUDIO_FILE = SPEED === 1 ? "narracao.mp3" : `narracao.${SPEED}x.mp3`;

export const WORDS: Word[] = (raw as Word[]).filter((w) => w.text.trim().length > 0);

export const msToFrame = (ms: number) => Math.round((ms / SPEED / 1000) * FPS);

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9@]/g, "");

const TOKENS = WORDS.map((w) => norm(w.text));

/**
 * Frame em que uma frase começa a ser falada.
 * `after` (frame) restringe a busca a ocorrências depois desse ponto,
 * útil para palavras repetidas ("skill", "Claude").
 * `at: "last"` devolve o início da ÚLTIMA palavra da frase.
 *
 * Falha alto se a frase não existir: assim uma narração nova nunca
 * renderiza com deixas silenciosamente erradas.
 */
export const cue = (phrase: string, opts: { after?: number; at?: "first" | "last" } = {}) => {
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  for (let i = 0; i <= TOKENS.length - target.length; i++) {
    if (opts.after !== undefined && msToFrame(WORDS[i].startMs) < opts.after) continue;
    if (target.every((t, k) => TOKENS[i + k] === t)) {
      const w = opts.at === "last" ? WORDS[i + target.length - 1] : WORDS[i];
      return msToFrame(w.startMs);
    }
  }
  throw new Error(`cue não encontrada na transcrição: "${phrase}"`);
};

/** Frame em que a frase termina de ser falada. */
export const cueEnd = (phrase: string, opts: { after?: number } = {}) => {
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  const startF = cue(phrase, opts);
  const i = WORDS.findIndex((w) => msToFrame(w.startMs) === startF && norm(w.text) === target[0]);
  return msToFrame(WORDS[i + target.length - 1].endMs);
};

export const AUDIO_END = WORDS.length ? msToFrame(WORDS[WORDS.length - 1].endMs) : 0;
