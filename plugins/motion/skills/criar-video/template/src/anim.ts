import { Easing, interpolate, spring } from "remotion";
import { FPS } from "./theme";

// Curvas da casa: saída rápida e pouso suave (estilo "expo out").
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);

// Entradas/saídas padrão (8-12 frames).
export const IN = 11;
export const OUT = 9;

/** 0→1 entre `start` e `start+dur`, com easing e clamp. */
export const ease = (
  frame: number,
  start: number,
  dur = IN,
  easing = EASE_OUT,
) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** Mapeia 0..1 para [a, b]. */
export const mix = (t: number, a: number, b: number) => a + (b - a) * t;

/** Spring padrão a partir de `start` (sem overshoot exagerado). */
export const sp = (
  frame: number,
  start: number,
  opts: { damping?: number; stiffness?: number; mass?: number } = {},
) =>
  spring({
    frame: frame - start,
    fps: FPS,
    config: { damping: 18, stiffness: 140, mass: 0.9, ...opts },
  });

/** Presença de um elemento: entra em `inAt`, sai em `outAt` (0 → 1 → 0). */
export const presence = (
  frame: number,
  inAt: number,
  outAt = Infinity,
  inDur = IN,
  outDur = OUT,
) => ease(frame, inAt, inDur) * (1 - ease(frame, outAt, outDur, EASE_IN));

/** Pseudo-aleatório determinístico (mesmo valor em todo render). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
