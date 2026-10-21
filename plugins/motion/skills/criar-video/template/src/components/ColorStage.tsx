import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EASE_IN_OUT, ease } from "../anim";
import { H, W } from "../theme";

export type Wipe = {
  /** Frame em que a nova cor começa a entrar. */
  at: number;
  color: string;
  /** Forma da entrada. */
  kind: "circle" | "up" | "down" | "left" | "right" | "diag" | "cut";
  /** Origem do círculo (px). */
  x?: number;
  y?: number;
  dur?: number;
};

/** Raio que cobre a tela inteira a partir de (x, y). */
const coverR = (x: number, y: number) =>
  Math.hypot(Math.max(x, W - x), Math.max(y, H - y)) + 20;

const clipFor = (w: Wipe, t: number) => {
  switch (w.kind) {
    case "circle": {
      const x = w.x ?? W / 2;
      const y = w.y ?? H / 2;
      return `circle(${coverR(x, y) * t}px at ${x}px ${y}px)`;
    }
    case "up":
      return `inset(${(1 - t) * 100}% 0 0 0)`;
    case "down":
      return `inset(0 0 ${(1 - t) * 100}% 0)`;
    case "left":
      return `inset(0 0 0 ${(1 - t) * 100}%)`;
    case "right":
      return `inset(0 ${(1 - t) * 100}% 0 0)`;
    case "diag": {
      const p = t * 260 - 30; // % ao longo da diagonal
      return `polygon(0 0, ${p}% 0, ${p - 60}% 100%, 0 100%)`;
    }
    case "cut":
      return t > 0 ? "none" : "inset(100%)";
  }
};

/** Cor de fundo "vigente" num frame (útil para escolher a cor do texto). */
export const bgAt = (wipes: Wipe[], frame: number, base: string) => {
  let c = base;
  for (const w of wipes) if (frame >= w.at + (w.dur ?? 12) * 0.5) c = w.color;
  return c;
};

/**
 * Palco de cores chapadas: cada troca de fundo entra com uma forma
 * (círculo, barra, diagonal). As cenas só desenham conteúdo por cima.
 */
export const ColorStage: React.FC<{ base: string; wipes: Wipe[] }> = ({ base, wipes }) => {
  const f = useCurrentFrame();
  // só as últimas camadas importam: a mais recente já cobriu as anteriores
  let firstVisible = 0;
  wipes.forEach((w, i) => {
    if (f >= w.at + (w.dur ?? 12)) firstVisible = i;
  });
  return (
    <AbsoluteFill style={{ backgroundColor: base }}>
      {wipes.map((w, i) => {
        if (i < firstVisible || f < w.at) return null;
        const t = ease(f, w.at, w.dur ?? 12, EASE_IN_OUT);
        return (
          <AbsoluteFill
            key={i}
            style={{ backgroundColor: w.color, clipPath: t >= 1 ? undefined : clipFor(w, t) }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
