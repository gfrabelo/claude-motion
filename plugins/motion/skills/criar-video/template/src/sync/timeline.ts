import { AUDIO_END, WORDS } from "./cues";

/**
 * Mapa único de sincronia: início de cada cena + palavras-chave.
 * Com narração, troque os números por deixas da transcrição:
 *
 *   import { cue } from "./cues";
 *   export const S1 = { start: 0, escrito: cue("escrito") };
 *   export const S2 = { start: cue("nenhum programa"), tela: cue("tela") };
 *
 * Os valores abaixo são da cena demo (sem narração).
 */
export const DEMO = {
  start: 0,
  ola: 4,
  motion: 26,
  escrito: 52,
  fim: 96,
};

export const END = WORDS.length ? AUDIO_END + 45 : 150;
