import { Wipe } from "../components/ColorStage";
import { HudChapter } from "../components/Hud";
import { C } from "../theme";
import { DEMO } from "./timeline";

/** Fundo inicial. */
export const BASE = C.ink;

/** Trocas de fundo, cada uma presa a uma palavra, com uma forma que motiva o corte. */
export const WIPES: Wipe[] = [
  { at: DEMO.motion, color: C.lime, kind: "circle", dur: 10 },
  { at: DEMO.escrito, color: C.coral, kind: "left", dur: 10 },
  { at: DEMO.fim, color: C.ink, kind: "circle", dur: 12 },
];

/** Capítulos do HUD (canto superior direito). */
export const CHAPTERS: HudChapter[] = [
  { at: 0, label: "HOOK" },
  { at: DEMO.escrito, label: "DEMO" },
];
