import type React from "react";
import { loadVariableFont } from "@remotion/google-fonts/Archivo";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";

/** Formato do vídeo: "16:9" (YouTube/feed) ou "9:16" (Reels/TikTok/Shorts). */
export const FORMAT: "16:9" | "9:16" = "16:9";
export const W = FORMAT === "16:9" ? 1920 : 1080;
export const H = FORMAT === "16:9" ? 1080 : 1920;
export const FPS = 30;

// Display + UI: Archivo variável (largura 62-125%, peso 100-900).
export const { fontFamily } = loadVariableFont("normal", { subsets: ["latin", "latin-ext"] });
// Acento editorial em itálico.
export const { fontFamily: serifFamily } = loadSerif("italic", { weights: ["400"], subsets: ["latin", "latin-ext"] });
// HUD e código.
export const { fontFamily: monoFamily } = loadMono("normal", { weights: ["400", "500", "700"], subsets: ["latin"] });

/**
 * Paleta. Troque pelas cores da marca: 1 escura de base, 1 clara neutra
 * e 3-4 cores chapadas fortes para os fundos de cena.
 */
export const C = {
  ink: "#0B0F14",
  line: "#1C2633",
  cream: "#F1ECE2",
  white: "#F4F7FA",
  gray: "#8A94A6",
  grayDim: "#3A4556",
  cyan: "#3EE6F0",
  coral: "#FF5A36",
  blue: "#2B3BFF",
  lime: "#D4FF3F",
  /** Laranja do Claude: use quando a cena fala do Claude. */
  claude: "#DA7757",
};

/** Fundos claros pedem texto/HUD escuro. Inclua aqui as cores claras da paleta. */
export const isLight = (color: string) => [C.cyan, C.lime, C.cream, C.white, C.claude].includes(color);

/** Cor de texto que contrasta com o fundo. */
export const on = (bg: string) => (isLight(bg) ? C.ink : C.white);

/** Display largo e pesado. `wdth` 62-125, `wght` 100-900. */
export const display = (wdth = 125, wght = 900): React.CSSProperties => ({
  fontFamily,
  fontWeight: wght,
  fontStretch: `${wdth}%`,
  fontVariationSettings: `"wdth" ${wdth}, "wght" ${wght}`,
  letterSpacing: "-0.03em",
  lineHeight: 0.86,
  textTransform: "uppercase",
});
