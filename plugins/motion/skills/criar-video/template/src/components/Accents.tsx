import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EASE_OUT, ease, mix } from "../anim";
import { monoFamily, serifFamily } from "../theme";

/** Asterisco de raios arredondados que gira (marca gráfica, não é logo). */
export const Burst: React.FC<{ size: number; color: string; rays?: number; spin?: number; grow?: number }> = ({
  size,
  color,
  rays = 12,
  spin = 2,
  grow = 1,
}) => {
  const f = useCurrentFrame();
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`${-r} ${-r} ${size} ${size}`} style={{ transform: `rotate(${f * spin}deg)` }}>
      {Array.from({ length: rays }, (_, i) => {
        const a = (i / rays) * 360;
        const len = r * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7 + f / 9))) * grow;
        return (
          <line
            key={i}
            x1={0}
            y1={0}
            x2={0}
            y2={-len}
            stroke={color}
            strokeWidth={size * 0.085}
            strokeLinecap="round"
            transform={`rotate(${a})`}
          />
        );
      })}
    </svg>
  );
};

/**
 * Deslocamento de câmera ("kick") nos impactos: um tranco curto que amortece.
 * Passe os frames de impacto; aplique o retorno como transform no container.
 */
export const kick = (frame: number, hits: number[], strength = 14) => {
  let x = 0;
  let y = 0;
  let s = 1;
  for (const h of hits) {
    const d = frame - h;
    if (d < 0 || d > 14) continue;
    const decay = Math.exp(-d / 3.2);
    x += Math.sin(d * 2.7 + h) * strength * decay;
    y += Math.cos(d * 3.1 + h) * strength * 0.6 * decay;
    s += 0.025 * decay;
  }
  return `translate(${x}px, ${y}px) scale(${s})`;
};

export const Kick: React.FC<{ hits: number[]; strength?: number; children: React.ReactNode }> = ({ hits, strength, children }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ transform: kick(f, hits, strength) }}>{children}</AbsoluteFill>;
};

/** Linha em serifa itálica (acento editorial). */
export const SerifLine: React.FC<{ text: string; at: number; out?: number; size: number; color: string; style?: React.CSSProperties }> = ({
  text,
  at,
  out,
  size,
  color,
  style,
}) => {
  const f = useCurrentFrame();
  const t = ease(f, at, 10, EASE_OUT);
  const o = out === undefined ? 0 : ease(f, out, 7);
  return (
    <div
      style={{
        fontFamily: serifFamily,
        fontStyle: "italic",
        fontSize: size,
        color,
        lineHeight: 1,
        opacity: t * (1 - o),
        transform: `translateY(${mix(t, 30, 0) - o * 20}px)`,
        filter: t < 0.98 ? `blur(${(1 - t) * 8}px)` : undefined,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/** Rótulo técnico em mono (estilo HUD), com contador opcional. */
export const Tag: React.FC<{ text: string; at: number; color: string; style?: React.CSSProperties; out?: number }> = ({
  text,
  at,
  color,
  style,
  out,
}) => {
  const f = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor((f - at) * 2.2)));
  const o = out === undefined ? 0 : ease(f, out, 6);
  return (
    <div
      style={{
        fontFamily: monoFamily,
        fontSize: 20,
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color,
        whiteSpace: "pre",
        opacity: (f >= at ? 1 : 0) * (1 - o),
        ...style,
      }}
    >
      {text.slice(0, n)}
    </div>
  );
};
